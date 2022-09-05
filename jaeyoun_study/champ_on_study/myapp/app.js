// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session); // 세션을 파일에 저장
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
// const router = require("router");
// 추가
const fs = require("fs");
const multer = require("multer");

// express 설정 1
const app = express();

// db 연결 2
const client = mysql.createConnection({
  host: "funtestdb.c48enj5ykq9v.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  password: "rlawodbs223",
  database: "funTestDb",
});

//파일 업로드 모듈

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "myapp/public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cd(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// ejs 설정 4 html은 데이터베이스의 정보 가져올 수 없기에 ejs 확장자 사용
app.set("view engine", "ejs");
app.set("views", __dirname + "\\views");

// 정제 (미들웨어) 5 파일을 가져오면 깨질 수 있는데 그걸 방지
app.use(bodyParser.urlencoded({ extended: false }));

// 세션 (미들웨어) 6 테스트
app.use(
  session({
    secret: "blackzat", // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store: new FileStore(), // 세션이 데이터를 저장하는 곳
  })
);

app.use(express.static(path.join(__dirname, "")));

// 파일 관련

// 상품등록수정

app.get("/RegistrationAndmodification", (req, res) => {
  console.log("상품등록수정 페이지 로드");
  res.sendFile(path.join(__dirname + "/RegistrationAndmodification.html"));
});

app.post("/RegistrationAndmodification", upload.single("image"), (req, res) => {
  console.log("post진입");
  const body = req.body;
  const image = `/images/${req.file.filename}`; // 이미지 0901여까지
  const title = body.title;
  const content = body.detail_content;
  const start = body.period_date;
  const end = body.to;
  const money = body.goal_money;
  const name = body.product_name;
  const count = body.product_count;
  const price = body.product_price;
  const ealry = body.ealry;
  const sale = body.general;
  const detailImage = body.detail_image;

  client.query("select * from product where name=?", [name], (err, data) => {
    console.log("select진입");
    client.query(
      "insert into product(image, title, content, start, end, money, name, count, price, ealry, sale, detailImage) values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        image,
        title,
        content,
        start,
        end,
        money,
        name,
        count,
        price,
        ealry,
        sale,
        detailImage,
      ]
    );

    req.session.image = data.image;
    req.session.title = data.title;
    req.session.content = data.content;
    req.session.start = data.start;
    req.session.end = data.end;
    req.session.money = data.money;
    req.session.name = data.name;
    req.session.count = data.count;
    req.session.price = data.price;
    req.session.ealry = data.ealry;
    req.session.sale = data.sale;
    req.session.detailImage = data.detailImage;

    req.session.save(function () {
      console.log("상품데이터 전달중");
      res.render("product", {
        // 정보전달
        image: image,
        title: title,
        content: content,
        start: start,
        end: end,
        money: money,
        name: name,
        count: count,
        price: price,
        ealry: ealry,
        sale: sale,
        detailImage: detailImage,
      });
    });
  });
});

app.listen(3002, () => {
  console.log("3002 port running...");
  console.log(path.join(__dirname));
});
