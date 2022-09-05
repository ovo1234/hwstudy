const express = require("express");
const path = require("path");
const morgan = require("morgan");
// morgan은 요청과 응답에 대한 정보를 콘솔에 기록
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
// ./model/index.js와 같음

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html"); // 어떠한 종류의 탬플릿 엔진을 사용할지 - 넌적스는 html
nunjucks.configure("views", {
  express: app, // app 객체 연결
  watch: true, // true - HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링함
});
sequelize
  .sync({ force: false })
  // true면 db 강제 업데이트->기존의 db날아감, 서버실행시마다 테이블 재생성, default값은 false
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  (res.locals.message = err), message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
