/*
 * Dice utility
 */
const pug = require('pug');

exports.rollDice = function( numDice, sizeDice) {
    var result = 0;
    
    while( numDice--) {
        var roll = Math.random() * sizeDice + 1;
        console.log(roll);
        result += Math.floor(roll);
    }
    
    return result;
}
