import {odd, even} from './var'

function checkOddOrEven(num) {
  if (num % 2) {
    return odd; // 홀
  }
  return even; // 짝
}

exports.default = checkOddOrEven