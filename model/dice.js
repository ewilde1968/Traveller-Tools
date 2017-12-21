/*
 * Dice utility
 */
const pug = require('pug');

exports.rollDice = function( numDice, sizeDice) {
    var result = 0;
    
    while( numDice--) {
        var roll = Math.floor(Math.random() * sizeDice + 1);
        console.log('die roll: ' + roll);
        result += roll;
    }
    
    return result;
}
