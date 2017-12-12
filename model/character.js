
/*
 * Character model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Dice = require('./dice');

var CharacterSchema = new Schema( {
    name:           { type:String, index:true },
    age:            { type:Number, index:false },
    owner:          { type:String, index:true, required:true },
    stats:          { type:Array, index:false }
});

const STRENGTH = 0,
      DEXTERITY = 1,
      ENDURANCE = 2,
      INTELLIGENCE = 3,
      EDUCATION = 4,
      SOCIAL = 5,
      PSIONICS = 6,
      SENTINEL = PSIONICS + 1;
const statNames = ['Strength','Dexterity','Endurance','Intelligence','Education','Social Status', 'Psionics'];

CharacterSchema.statics.newCharacter = function( initVal, cb) {
    var ch = new Character( initVal);
    var oldStatsObj = null;
    
    if(ch) {
        // start by creating the stat array
        var old = initVal.stats;
        ch.stats = new Array(SENTINEL);
        if( old) {
            if( old.isArray == false) {
                // convert object to array as much as possible
                for( var counter = 0; counter < SENTINEL; counter++) {
                    var oldStat = old[statNames[counter]];
                    if(statNames[counter] in old && oldStat.isInteger()) {
                        // convert stat to new array element
                        ch.stats[counter] = {name:statNames[counter],value:oldStat};
                    } else {
                        // create new stat
                        ch.stats[counter] = {name:statNames[counter],value:Dice.rollDice(2,6)};
                    }
                }
            } else {
                // analyze array and use applicable stats
                // assume array is same stats in same order
                for( var counter = 0; counter < SENTINEL; counter++) {
                    if( counter in old && 'name' in old[counter] && 'value' in old[counter] && old[counter].name == statNames[counter]) {
                        // same stat name in same place
                        ch.stats[counter] = {name:statNames[counter],value:old[counter.value]};
                    } else {
                        // stat not valid, roll a new one
                        ch.stats[counter] = {name:statNames[counter],value:Dice.rollDice(2,6)};
                    }
                }
            }
        } else {
            ch.stats = new Array(SENTINEL);
            for( var counter = 0; counter < SENTINEL; counter++) {
                ch.stats[counter] = {name:statNames[counter],value:Dice.rollDice(2,6)};
            }
        }
        
        // save changes
        ch.save( (err) => {if(cb) cb(err, ch);});
    } else
        throw "Character.newCharacter new Character failed";
};

CharacterSchema.statics.updateCharacter = function(chId, chObj, callback) {
    // TODO validate character data
    Character.findById(chId, function(err, ch) {
        if (err) return next(err);

        if(ch) {
            $.extend(true,ch,chObj); // deep copy
            ch.save();
            if(callback) callback(err,ch);
        }
    });
};

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
