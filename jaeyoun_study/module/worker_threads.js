const { Worker, isMainTread, parentPort } = require("worker_threads");

if (isMainTread) {
  // 부모일 때 -> 싱글스레드일 때 작동하던 스레드가 부모
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log("from worker", message));
  // 이벤트 리스너로 부모가 메세지 받음
  worker.on("exit", () => console.log("worker exit")); // 종료시 실행
  worker.postMessage("ping");
} else {
  // 워커일 때 -> 우리가 생성한 스레드
  parentPort.on("message", (value) => {
    console.log("from parent", value);
    parentPort.postMessage("pong"); // 워커가 부모에게 메세지 보냄
    parentPort.close(); // 종료
  });
}
