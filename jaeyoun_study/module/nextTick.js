setImmediate(() => {
  console.log("immediate");
});
process.nextTick(() => {
  console.log("nextTick");
});
// 이벤트 루프가 다른 콜백 보다 nextTick의 콜백을 우선하여 처리한다.
setTimeout(() => {
  console.log("timeout");
}, 0);
Promise.resolve().then(() => {
  console.log("promise");
});
// Promise도 nextTick처럼 다른 콜백들보다 우선시된다.
// Promise와 nextTick은 마이크로태스크(microtask)라고 부름
