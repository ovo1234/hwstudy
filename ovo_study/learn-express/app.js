const express = require('express');
const path = require('path'); // html 로 응답하려면 sendFile 메서드를 사용하는데 파일의 경로는 path 모듈을 사용해서 지정해야함

const app = express();
// express 에서는 res.write나 res.end 대신 res.send를 사용가능
app.set('port', process.env.PORT || 3000);

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload',
    upload.fields([{name : 'image1'}, { name : 'image2 '}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);

// 미들웨어
// app.use((req,res,next) => {
//     console.log('모든 요청에 다 실행됩니다.');
//     next(); // 세 번째 매개변수 사용하여 다음 미들웨어로 넘어가는 함수 사용 next를 실행하지 않으면 다음 미들웨어가 실행되지 않음.
// });

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러처리 미들웨어로 갑니다.')
}); 

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

// app.get('/', (req,res) => {
//     //res.send('Hello, Express');
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

