const fs = require("fs");

// readFile을 실행할 때는 경로를 정확하게 하고 node 파일명.확장자 로 해야함
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});
