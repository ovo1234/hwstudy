const {
  Worker,
  isMainTread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainTread) {
  // 메인쓰레드 == 부모 일떄
  const threads = new Set();
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    }) // 워커생성자의 두번째 인자 workerData로 제이터 넘겨주면
    // 워커는 부모로부터 데이터를 받음
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );
  for (let worker of threads) {
    worker.on("message", (message) => console.log("from worker", message));
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("job done");
      }
    });
  }
} else {
  // 워커일 때 == 자식 다른 쓰레드일 때
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}
