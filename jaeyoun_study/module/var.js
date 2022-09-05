// const odd = "홀수입니다";
// const even = "짝수입니다";

exports.odd = "홀수입니다";
exports.even = "짝수입니다";

// module.exports에는 어떤값이든 대입 가능, exports에는 반드시
// 객체처럼 속성명과 속성값을 대입해야 한다. 다른값 대입시
// 객체와의 참조관계가 끊겨 모듈로 사용 불가 -> exports는 객체만 사용 가능

// module.exports = { // 변수들을 담은 객체 -> 모둘로 사용 가능
//   odd,
//   even,
// };

// module.exports와 exports가 같은 객체를 참조한다.
// exports가 module.exports를 참조한다. 포함? 152p 보자