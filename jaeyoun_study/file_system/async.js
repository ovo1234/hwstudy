const fs = require('fs')

console.log('시작')
fs.readFile('./readme2.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('1번', data.toString())
})
fs.readFile('./readme2.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('2번', data.toString())
})
fs.readFile('./readme2.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('3번', data.toString())
})
console.log('끝')
// 동기와 비동기 : 백그라운드 작업 완료 확인 여부
// 블로킹과 논블로킹 : 함수가 바로 return되는지 여부