const string = "abd";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};
console.time("전체 시간");
console.log("평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.");
console.log(string, number, boolean);
console.error("에러 메세지는 console.error에 담아주세요.");

console.table([ // 배열의 요소를 넣으면 객체의 속성들이 테이블 형식으로 표현
  { name: "제로", birth: 1994 },
  { name: "hero", birth: 1998 },
]);

console.dir(obj, { colors: false, depth: 2 }); // 객체를 보여주는데 color은 true로 하면 색을 나타내줌 depth는 기본 2 객체 안의 객체를 몇 단계 보여주는지
console.dir(obj, { colors: true, depth: 1 });

console.time('시간 측정')
for(let i = 0; i < 100000; i++) {}
console.timeEnd('시간 측정');

function b() {
    console.trace('에러 위치 추적');
}
function a() {
    b();
}
a();
console.timeEnd('전체 시간')