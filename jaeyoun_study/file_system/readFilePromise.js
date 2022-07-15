const fs = require("fs").promises;

// readFile을 실행할 때는 경로를 정확하게 하고 node 파일명.확장자 로 해야함
fs.readFile("./readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });
