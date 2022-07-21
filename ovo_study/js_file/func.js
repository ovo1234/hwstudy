const{odd,even} = require('./var');

function chckOddOrEven(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = chckOddOrEven;