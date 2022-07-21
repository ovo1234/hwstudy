const { odd, even } = require("./var"); // 비구조화?문법이랑 비슷한듯

function checkOddEven(num) {
  if (num % 2) {
    return odd; // 홀
  }
  return even; // 짝
}

module.exports = checkOddEven;
// module.exports에는 객체, 변수, 함수 모두 대입 가능
