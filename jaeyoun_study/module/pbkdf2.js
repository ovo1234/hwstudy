const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64"); // 인코딩 알고리즘 base64
  console.log("salt:", salt);
  crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => { // pbkdf2 알고리즘 salt를 100000번 sha512작동시키는 알고리즘
    console.log("password:", key.toString("base64"));
  });
});
