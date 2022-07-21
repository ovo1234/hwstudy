const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('C:/Users/dbwjd/Documents/hwstudy/ovo_study/test.html');

        res.writeHead(200, {
            'Content-Type' : 'text/html; charset=utf-8'
        });
        res.end(data);
    }
    catch (err) {
        console.error(err);
        res.writeHead(500, {
            'Content-Type' : 'text/html; charset=utf-8'
        });
        res.end(err.message);
    }
})
.listen(8081, () => {
    console.log('8081번 포트 서버 대기');
});