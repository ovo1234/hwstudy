const path = require("path");

const string = __filename;

console.log("path.sep:", path.sep);
console.log("path.delimiter:", path.delimiter);
console.log("--------------------------------");
console.log("path.dirname():", path.dirname(string));
console.log("path.extname():", path.extname(string));
console.log("path.basename():", path.basename(string));
console.log(
  "path.basename - extname:",
  path.basename(string, path.extname(string))
);
console.log("--------------------------------");
console.log("path.parse():", path.parse(string));
console.log(
  "path.format():",
  path.format({
    dir: "c:\\Users\\Kimjaeyoun\\Documents\\hwstudy\\jaeyoun_study\\module",
    name: "path",
    ext: "js",
  })
);
console.log(
  "path.normalize():",
  path.normalize(
    "c:\\\Users\\Kimjaeyoun\\Documents\\\hwstudy\\jaeyoun_study\\module"
  )
);
console.log("--------------------------------");
console.log("path.isAbsolute(C:\\):", path.isAbsolute("C:\\"));
console.log("path.isAbsolute(./home):", path.isAbsolute("./home"));
console.log("--------------------------------");
// console.log(
//   "path.relative():",
//   path.relative(
//     "c:\\Users\\Kimjaeyoun\\Documents\\hwstudy\\jaeyoun_study\\module\\path.js"
//   ),
//   "c:\\"
// ); // 경로를 두개 넣으면 첫번째 경로에서 두번째 경로로 가는 방법을 알려줌
console.log(
  "path.join():",
  path.join(__dirname, "..", "..", "users", ".", "Kimjaeyoun")
);
console.log(
  "path.resolve():",
  path.resolve(__dirname, "..", "..", "users", ".", "Kimjaeyoun")
);
// join과 resolve는 비슷하지만 /를 만나면 resolve는 절대경로로 인식하여 앞의 경로를 무시, join은 상대경로로 처리함
// 절대경로와 상대경로의 차이점 -> 절대경로는 루트폴더나 노드 프로세스가 실행되는 위치가 기준이 됨
// 상대경로는 현재파일이 기준이 된다.

console.log(require.main); // 노드는 require.main을 기준으로 상대경로를 인식한다.
