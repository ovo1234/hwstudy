console.log("require가 가장 위에 오지 않아도 됩니다.");

module.exports = "저를 찾아보세요.";

require("./var");

console.log("require.cache입니다.");
console.log(require.cache);
// 한 번 require한 파일은 require.cache에 저장 됨
console.log("require.main입니다.");
console.log(require.main === module);
// require.main은 노드 실행 시 첫 모듈을 가리킨다.
// 지금은 require.js를 실행했으니까 require.js가 require.main이 된다.
console.log(require.main.filename);
