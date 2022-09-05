const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
// .env에 있는 키와값의 쌍을관리하는 모듈
const path = require("path");

const nunjucks = require("nunjucks");

dotenv.config();
// dotenv.config() : .env파일 안에 있는 정보를 불러옵니다
// 보안상의 이유인 데이터들을 따로 보관하는 파일
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 3000); // 서버 실행 포트 설정
// app.set(키, 값) 으로 저장 가능 -> app.get(키)로 불러올 수 있다.
app.set("view engine", "html");
// views는 템플릿 파일들이 위치한 폴더를 지정하는것, res.render이 이 폴더를 기준으로 템플릿엔진을 찾아서 렌더링함
// view engine은 어떠한 종류의 템플릿 엔진을 사용할지 나타냄
nunjucks.configure("views", {
  express: app,
  watch: true,
});
app.use(morgan("dev"));
// GET / 500 22.827 ms - 50 와같이 morgan은 요청과 응답에 대한 정보를 콘솔에 기록한다.
// http메서드 주소 http상태 코드 응답속도 - 응답바이트
app.use("/", express.static(path.join(__dirname, "public")));
// static 정적인 파일들을 제공하는 라우터 역할임
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body-parser : 요청 본문의 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
// false면 node의 querystring모듈사용하여 쿼리스트링해석 true면 qs모듈 사용
app.use(cookieParser(process.env.COOKIE_SECRET));
// .env의 키인 COOKIE_SECRET으로 값을 불러옴
// cookie-parser는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듭니다.
app.use(
  session({
    resave: false,
    // resave: 세션에 수정사항이 생기지 않더라도 저장할지 말지
    saveUninitialized: false,
    // saveUninitialized: 세션에 저장할 내역이 없더라ㅗ 다시 저장할지 말지
    secret: process.env.COOKIE_SECRET,
    // 세션관리시 클라이언트에게 쿠키를 보내는데 쿠키에 서명을 추가해야함
    // 서명추가시 secret의 값이 필요한데 cookie-parser의 secret값과 같게 설정하는게 좋음
    cookie: {
      httpOnly: true,
      // httpOnly: 클라이언트에서 쿠키를 확인하지 못하게 할지 말지
      secure: false,
      // secure: https가 아닌 환경에서도 사용하게 할지 말지
    },
    name: "session-cookie",
  })
);
// 세션 관리용 미들웨어 -> 로그인 등의 이유로 세션을 구현, 특정 사용자를 위한
// 데이터를 임시적으로 저장할때 유용함 req.session 객체 안에 유지

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
// next(error)이 넘겨준 error이 다음 에러처리 미들웨어의 err인수가 된다.

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// multer 실습
const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.extname(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
  }
);

// app.use((req, res, next) => {
//   console.log("모든 요청에 다 실행됩니다.");
//   next();
// });

app.get(
  "/",
  (req, res, next) => {
    console.log("GET / 요청에서만 실행됩니다.");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// app.get("/", (req, res) => {
//   //   res.send("Hello Express");
//   res.sendFile(path.join(__dirname, "index.html"));
//   // __dirname은 현재 실행하는 파일의 절대경로이다.
// });

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
