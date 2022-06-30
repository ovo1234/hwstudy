// 8080 치면 서버 염.
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {  // 응답에 대한 정보 기록
        'Content-Type' : 'text/html; charset = uft-8'
    });
    res.write('<h1> Hello Node! </h1>'); // 클라이언트로 보낼 데이터
    res.end('<p> Hello Server! </p>'); // 응답을 종효
});

server.listen(8080);

server.on('listening', () =>{
    console.log('8080번 포트에서 서버 대기 중!');
});
server.on('error', (error) => {
    console.log(error);
});

// 한번 node 실행할 때 여러 서버를 실행 가능 단, 포트 번호는 달라야함.