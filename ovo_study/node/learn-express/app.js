// express 에서는 res.write나 res.end 대신 res.send를 사용가능

// 미들웨어
// app.use((req,res,next) => {
//     console.log('모든 요청에 다 실행됩니다.');
//     next(); // 세 번째 매개변수 사용하여 다음 미들웨어로 넘어가는 함수 사용 next를 실행하지 않으면 다음 미들웨어가 실행되지 않음.
// });

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const indexRouter = require('./routes'); // routes/index.js와 같음
const userRouter = require('./routes/user');
const router = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

// const multer = require('multer');
// const fs = require('fs');

// try {
//     fs.readdirSync('uploads');
// } catch (error) {
//     console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
//     fs.mkdirSync('uploads');
// }
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, done) {
//             done(null, 'uploads/');
//         },
//         filename(req, file, done) {
//             const ext = path.extname(file.originalname);
//             done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });
// app.get('/upload', (req, res) => {
//     res.sendFile(path.join(__dirname, 'multipart.html'));
// });
// app.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file);
//     res.send('ok');
// });
// app.get('/', (req, res, next) => {
//     console.log('GET / 요청에서만 실행됩니다.');
//     next();
// }, (req, res) => {
//     throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
// });

app.use('/', indexRouter);
app.use('/user', userRouter);

// 같은 주소의 라우터를 여러개 만들어도 됨 next를 호출하면 다음 미들웨어가 실행됨
// 첫 번째 라우터의 next('route') 호출되어 두번째, 세번째 미들웨어가 실행되지 않음.
router.get('/', function(req, res, next){
    next('route');
}, function(req, res, next){
    console.log('실행되지 않습니다.');
    next();
}, function(req, res, next){
    console.log('실행되지 않습니다');
    next();
});

router.get('/', function(req, res){
    console.log('실행됩니다.');
    res.send('Hello, Express');
});

router.get('/user/:id', function(req, res){
    console.log('얘만 실행됩니다.');
});
router.get('/user/like', function(req, res){
    console.log('전혀 실행되지 않습니다.');
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});