let i = 1;
setInterval(() => {
  if (i == 5) {
    console.log("종료");
    process.exit(); // 실행중인 node process를 멈춤
  }
  console.log(i);
  i += 1;
}, 1000);
