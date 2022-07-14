const crypto = require("crypto");

console.log(
  "base64:",
  crypto.createHash("sha512").update("비밀번호").digest("base64")
);
console.log(
  "hex:",
  crypto.createHash("sha512").update("비밀번호").digest("hex")
);
console.log(
  "base64:",
  crypto.createHash("sha512").update("다른 비밀번호").digest("base64")
);
// digest는 인코딩할 알고리즘을 넣음 base64, hex, latin1 base64가 젤 짧음
// createHash는 사용할 해쉬 알고리즘을 넣음 sha1, sha256, sha512, md5 등
