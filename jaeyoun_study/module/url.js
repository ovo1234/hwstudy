const url = require("url");

const { URL } = url;
const myURL = new URL(
  "http:/www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
console.log("new URL():", myURL);
console.log("url.format():", url.format(myURL));
console.log("---------------------------------");
const parsedUrl = url.parse(
  "http:/www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
// host부분 없이 pathname만 오는 주소
// search는 물음표(?)로 시작하고,  그 뒤에 키=값 형식으로 데이터 전달
console.log("url.parse():", parsedUrl);
console.log("url.format():", url.format(parsedUrl));
