// const express = require('express');
// const http = require('http');
// const path = require('path');

// //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
// const serverStatic = require('serve-static');
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
// const expressErrorHandler = require('express-error-handler');

// const mySql = require('mysql');

// const pool = mySql.createPool({
//     connectionLimit: 10, // 접속을 10개 만들고 10개를 재사용
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'user',
//     debug: false,
// });

// const app = express();

// app.set('port', 3001);
// app.use(serverStatic(path.join(__dirname)));

// const bodyParser_post = require('body-parser'); // post 방식 파서
// const { resourceLimits } = require('worker_threads');
// //post 방식 일경우 begin
// //post 의 방식은 url 에 추가하는 방식이 아니고 body 라는 곳에 추가하여 전송하는 방식

// app.use(bodyParser_post.urlencoded({ extended: false })); // post 방식 세팅
// app.use(bodyParser_post.json()); // json 사용 하는 경우의 세팅
// //post 방식 일경우 end

// app.use(serverStatic(path.join(__dirname)));

// // 쿠키와 세션을 미들웨어로 등록
// app.use(cookieParser());

// // 세션 환경 세팅
// // 세션은 서버쪽에 저장하는 것을 말하는데, 파일로 저장할 수 있고 레디스라고 하는 메모리DB등 다양한 저장소에 저장 할 수가 있는데

// app.use(expressSession({ 
//     secret: 'my key', //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐 , 아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임    
//     resave: true,
//     saveUninitialized: true
// }));

// //라우트를 미들웨어에 등록하기 전에 라우터에 설정할 경로와 함수를 등록한다
// //
// //라우터를 사용 (특정 경로로 들어오는 요청에 대하여 함수를 수행 시킬 수가 있는 기능을 express 가 제공해 주는것)

// const router = express.Router();

// router.route('/process/addUser').post(
//     function(req, res){
//         console.log('process/addUser 호츨됨 ');
//         const paramID = req.body.id || req.query.id;
//         const paramName = req.body.name || req.query.name;
//         const paramAge = Number(req.body.age || req.query.age);        
//         const paramPW = req.body.password || req.query.password;

//         console.log('id: ' +paramID +', name: ' +paramName +', age: ' +paramAge +', password: ' +paramPW);

//         addUser(paramID, paramName, paramAge, paramPW, function(err, result){
//             if(err){
//                 console.log('Error!');
//                 res.writeHead(200, { "Content-Type:" : "text/html;charset = utf-8"});
//                 res.write('<h1> 에러발생 - 이미 존재하는 아이디 일 수 있음 </h1>');
//                 res.write('<br><a href = "/main.html"> re login </a>');
//                 res.end();
//                 return;
//             }
//             if(result){
//                 console.dir(result);
//                 res.writeHead(200, { "Content-Type ": "text/html; charset=utf-8" });
//                 res.write('<h1>Add Success</h1>');
//                 res.write('<br><a href = "/main.html"> re login </a>');
//                 res.end();
//             }
//             else{
//                 console.log('데이터베이스에 추가 에러');
//                 res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8"});
//                 res.write('<h1> Failed : add user </h1>');
//                 res.write('<a href = "/main.html"> re login </a>');
//                 res.end();
//             }
//         });
//     }
// );

// router.route('/process/Login').post(
//     function(req, res) {
//         console.log('process/login 호출됨');
//         const paramID = req.body.id || req.query.id;
//         const paramPW = req.body.password || req.query.password;

//         console.log('paramID : '+ paramID + ', paramPW : '+ paramPW);

//         authUser(paramID, paramPW,
//             function (err, rows){
//                 if(err){
//                     console.log('Error!');
//                     res.writeHead(200, { "Content-Type:" : "text/html; charset = utf-8"});
//                     res.write('<h1> 에러발생 </h1>');
//                     res.end();
//                     return;
//                 }
//                 if(rows){
//                     console.dir(rows);
//                     res.writeHead(200, { "Content-Type ": "text/html; charset=utf-8" });
//                     res.write('<h1>Login Success</h1>');
//                     res.write('<h1> user </h1>' + rows[0].name);
//                     res.write('<br><a href = "/main.html"> re login </a>');
//                     res.end();
//                 }
//                 else{
//                     console.log('empty Error!!');
//                     res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8"});
//                     res.write('<h1> user data not exist </h1>');
//                     res.write('<a href = "/main.html"> re login </a>');
//                     res.end();
//                 }
//             }
//         );
//     }
// );

// //라우터 미들웨어 등록하는 구간에서는 라우터를 모두  등록한 이후에 다른 것을 세팅한다
// //그렇지 않으면 순서상 라우터 이외에 다른것이 먼저 실행될 수 있다

// app.use('/', router); //라우트 미들웨어를 등록한다

// const addUser = function(id, name, age, password,callback){
//     console.log('addUse 호출');

//     // pool로 DB 접근 함수 호출(mysql 접근)
//     // conn 연결된 객체
//     pool.getConnection( function (err, poolConn){
//         if(err){
//             if(poolConn){
//                 poolConn.release(); // 사용한 후 해체(반납)한다.
//             }
//             callback(err, null);
//             return;
//         }
//         console.log('데이터베이스 연결 스레드 아이디' + poolConn.threadId);
//         const data = {
//             id: id,
//             name : name,
//             age : age,
//             password : password,
//         };

//         // user 테이블에 데이터 추가
//         const exec = poolConn.query('insert into users set ?' , data,
//             function(err, result){
//                 poolConn.release();
//                 console.log('실행된 SQL : ' + exec.sql);
                
//                 if(err){
//                     console.log('sql 실행 시 에러 발생');
//                     callback(err, null);
//                     return;
//                 }
//                 callback(null, result);
//             }
//         );
//     });
// }

// const authUser = function(id, password, callback){
//     console.log('input id : ' + id + ' : pw : '+ password);

//     pool.getConnection(function(err, poolConn){
//         if(err){
//             if(poolConn){
//                 poolConn.release(); // pool 반환처리
//             }
//             callback(err,null);
//             return;
//         }

//         console.log('데이터베이스 연결 스레드 아이디 ' + poolConn.threadId);

//         const tablename = 'user';
//         const columns = ['id', 'name', 'age'];

//         // 아이디와 비밀번호가 같은 것을 조회한다.

//         const exec = poolConn.query("select ?? from ?? where id = ? and password =? ", [columns, tablename, id, password],
//             function(err, rows){
//                 poolConn.release(); // pool 반환처리
//                 console.log('실행된 sql : '+ exec.sql);

//                 if(err){
//                     callback(err,null);
//                     return;
//                 }
//                 if(rows.length > 0){
//                     console.log('사용자 찾음');
//                     callback(null, rows);
//                 }
//                 else {
//                     console.log('사용자 찾지 못함');
//                     callback(null,null);
//                 }
//             }
//         );
//     });
// };


// const errorHandler = expressErrorHandler({
//     static : {'404' : 'public/404.html'}
// });

// app.use(expressErrorHandler.httpError(404));
// app.use(expressErrorHandler);

// // 웹서버를 app 기반으로 생성
// const appServer = http.createServer(app);
// appServer.listen(app.get('port'), function(){
//     console.log(app.get('port') + ' 번에서 대기 중');
// });

// db 연결
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'loginTest', //db 이름 not 테이블 이름
// });

// connection.connect();

// connection.query('SELECT * from user', (error, rows, fields) => {
//     if(error) throw error;
//     console.log('User info is ', rows);
// });

// connection.end();

// 클라이언트 요청에 대응하는 route 설정

// const express = require('express');

// const app = express();

// app.set('port', process.env.PORT || 3001);

// app.get('/', (req, res) => {
//     res.send('Root');
// });

// js 파일에서 데이터 추가하기

// const sql_input = "INSERT INTO user(id, name, age, password) VALUES('동해물과 백두산' , '송영선', '12', '영원한고등학생')"

// connection.query(sql_input,function(err,result,fields){
//     if(err) throw err;
//     console.log(result);
// })

// app.get('/users', (req, res) => {
//     connection.query('SELECT * from user', (error, rows) => {
//         if(error) throw error;
//         console.log('User info is ', rows);
//         res.send(rows);
//     });
// });

// const path = require('path');
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended : true }));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/addUser.html'));
// });

// app.post('/', (req, res) => {
//     const sql = "INSERT INTO user SET ?"

//     connection.query(sql, req.body, function(err, result, fields){
//         if(err) throw err;
//         console.log(result);
//         //res.send('등록이 완료 되었습니다.'); 
//         res.redirect('/');
//     });
// });

// // ejs 를 이용하여 테이블에서 가져온 사용자 정보를 나열

// const ejs = require('ejs');

// app.set('view engine', 'ejs');

// // user 로 들어가면 테이블에 추가한 사용자 정보 목록 표시됨
// app.get('/user', (req, res) => {
//     connection.query('SELECT * from user', (error, result, fields) => {
//         if(error) throw error;
//         res.render('index', {user : result});
//     });
// });

// // delete 문으로 데이터 삭제
// // const sql = "DELETE FROM user WHERE id = ?";

// app.get('/delete/:id', (req, res)=>{
//     const sql = "DELETE FROM user WHERE id = ?";
//     connection.query(sql, [req.params.id], function(err, result, fields){
//         if(err) throw err;
//         console.log(result)
//         res.redirect('/');
//     });
// });

// // update 문으로 동작 확인
// // const sql = "UPDATE user SET ? WHERE id = " + req.params.id;

// // 업데이트 폼 작성

// app.get('/edit/:id', (req, res) => {
//     const sql = "SELECT * FROM user WHERE id = ?";
//     connection.query(sql, [req.params.id], function(err, result, fields){
//         if(err) throw err;
//         res.render('edit', {user : result});
//     });
// });

// // '' 이거 잘 감싸줘야함 안그럼 계속 오류남 update 할 때 주의해야함
// app.post('/update/:id', (req, res) => {
//     const sql = "UPDATE user SET ? WHERE id = '" + req.params.id + "'";
//     connection.query(sql, req.body, function(err, result, fields){
//         if(err) throw err;
//         console.log(result);
//         res.redirect('/');
//     });
// });

// app.listen(app.get('port'), () => {
//     console.log('Express server listening on port '+ app.get('port'));
// });


// const fs = require('fs');
// const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const session = require('express-session');
// const crypto = require('crypto');
// const FileStore = require('session-file-store')(session); // 세션을 파일에 저장
// const cookieParser = require('cookie-parser');
// const ejs = require('ejs');

// // express 설정 1
// const app = express();

// // db 연결 2
// const client = mysql.createConnection({
//     user : 'root',
//     password : '1234',
//     database : 'loginTest',
// });

// // 정적 파일 설정 (미들웨어) 3
// app.use(express.static(path.join(__dirname,'/public')));

// // ejs 설정 4 html은 데이터베이스의 정보 가져올 수 없기에 ejs 확장자 사용
// app.set('views', __dirname + '\\views');
// app.set('view engine','ejs');

// // 정제 (미들웨어) 5 파일을 가져오면 깨질 수 있는데 그걸 방지
// app.use(bodyParser.urlencoded({extended:false}));

// // 세션 (미들웨어) 6
// app.use(session({
//     secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
//     resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
//     saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
//     store : new FileStore() // 세션이 데이터를 저장하는 곳
// }));


// 메인페이지
app.get('/',(req,res)=>{
    console.log('메인페이지 작동');
    console.log(req.session);
    if(req.session.is_logined == true){
        res.render('main',{
            is_logined : req.session.is_logined,
            name : req.session.name
        });
    }else{
        res.render('main',{
            is_logined : false
        });
    }
});

// 회원가입
app.get('/register',(req,res)=>{
    console.log('회원가입 페이지');
    res.render('register');
});

app.post('/register',(req,res)=>{
    console.log('회원가입 하는중')
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;
    const age = body.age;

//     client.query('select * from userdata where id=?',[id],(err,data)=>{
//         if(data.length == 0){
//             console.log('회원가입 성공');
//             client.query('insert into userdata(id, name, age, pw) values(?,?,?,?)',[
//                 id, name, age, pw
//             ]);
//             res.redirect('/');
//         }else{
//             console.log('회원가입 실패');
//             res.send('<script>alert("회원가입 실패");</script>');
//             console.log(err);
//             res.redirect('/login');
//         }
//     });
// });

// // 로그인
// app.get('/login',(req,res)=>{
//     console.log('로그인 작동');
//     res.render('login');
// });

// app.post('/login',(req,res)=>{
//     const body = req.body;
//     const id = body.id;
//     const pw = body.pw;

//     client.query('select * from userdata where id=?',[id],(err,data)=>{
//         // 로그인 확인
//         console.log(data[0]);
//         console.log(id);
//         console.log(data[0].id);
//         console.log(data[0].pw);
//         console.log(id == data[0].id);
//         console.log(pw == data[0].pw);
//         if(id == data[0].id && pw == data[0].pw){ // or 말고 and 로 해야함
//             console.log('로그인 성공');
//             // 세션에 추가
//             req.session.is_logined = true;
//             req.session.name = data.name;
//             req.session.id = data.id;
//             req.session.pw = data.pw;
//             req.session.save(function(){ // 세션 스토어에 적용하는 작업
//                 res.render('main',{ // 정보전달
//                     name : data[0].name,
//                     id : data[0].id,
//                     age : data[0].age,
//                     is_logined : true
//                 });
//             });
//         }else{
//             console.log('로그인 실패');
//             res.render('/login');
//         }
//     });
    
// });

// // 로그아웃
// app.get('/logout',(req,res)=>{
//     console.log('로그아웃 성공');
//     req.session.destroy(function(err){
//         // 세션 파괴후 할 것들
//         res.redirect('/');
//     });

// });

// app.listen(3001,()=>{
//     console.log('3001 port running...');
// });