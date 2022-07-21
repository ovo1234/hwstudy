function helloWorld(){
    console.log("hello");
    helloNode();
}
function helloNode(){
    console.log("HELLO");
}
helloWorld();


// var.js , func.js 모듈 불러오기
const {odd, even} = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str){
    if(str.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));