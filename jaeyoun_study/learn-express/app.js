const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
// .env에 있는 키와값의 쌍을관리하는 모듈
const path = require("path");

dotenv.config();
// dotenv.config() : .env파일 안에 있는 정보를 불러옵니다
// 보안상의 이유인 데이터들을 따로 보관하는 파일
const app = express();
app.set("port", process.env.PORT || 3000); // 서버 실행 포트 설정
// app.set(키, 값) 으로 저장 가능 -> app.get(키)로 불러올 수 있다.
app.use(morgan("dev"));
// GET / 500 22.827 ms - 50 와같이 morgan은 요청과 응답에 대한 정보를 콘솔에 기록한다.
// http메서드 주소 http상태 코드 응답속도 - 응답바이트
app.use("/", express.static(path.join(__dirname, "public")));
// static 정적인 파일들을 제공하는 라우터 역할임
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// .env의 키인 COOKIE_SECRET으로 값을 불러옴
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log("모든 요청에 다 실행됩니다.");
  next();
});

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
