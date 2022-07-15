const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

if (isMainThread) { // 부모일 때 == 싱글스레드로 쓰던거
  const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  console.log("prime");
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start; // 2
    threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
    start += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) },
    })
  );
  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    }); // 워커 에러시
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes.length);
      }
    }); // 워커 종료시
    worker.on("message", (msg) => {
      primes = primes.concat(msg);
    });
  }
} else { // 워커 실행
  findPrimes(workerData.start, workerData.ragne);
  parentPort.postMessage(primes);
}