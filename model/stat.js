
/*
 * Stats model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Dice = require('./dice');

const statNames = ['Strength','Dexterity','Endurance','Intelligence','Education','Social Status', 'Psionics'];
const STRENGTH = 0;
const DEXTERITY = 1;
const ENDURANCE = 2;
const INTELLIGENCE = 3;
const EDUCATION = 4;
const SOCIAL = 5;
const PSIONICS = 6;
const SENTINEL = PSIONICS+1;

var nameValidator = function (val) {return -1 != statNames.indexOf(val);};
var StatisticSchema = new Schema( {
    name:       { type:String, index:false, required:true, validate: nameValidator},
    value:      { type:Number, index:false },
    maxValue:   { type:Number, index:false }
});


StatisticSchema.statics.newStatistic = function (initVal, cb) {
    var s = new Statistic(initVal);
    
    if( initVal.value) {s.value = Math.floor(s.value);}
    else {s.value = Dice.rollDice(2,6);}

    if( initVal.maxValue) {s.maxValue = Math.floor(s.maxValue);}
    else {s.maxValue = s.value;}
    
    var err = s.validateSync();   // double check values
    if (err) throw 'validation of new statistic failed';
    
    if( cb) cb(s);
};

StatisticSchema.virtual('modifier').get( function() {
    return (this.value >= 15 ? 3 :
            (this.value >= 12 ? 2 :
            (this.value >= 9 ? 1 :
            (this.value >= 6 ? 0 :
            (this.value >= 3 ? -1 :
            (this.value >= 1 ? -2 :
             -3)))))
           );
});

StatisticSchema.statics.STRENGTH = STRENGTH;
StatisticSchema.statics.DEXTERITY = DEXTERITY;
StatisticSchema.statics.ENDURANCE = ENDURANCE;
StatisticSchema.statics.INTELLIGENCE = INTELLIGENCE;
StatisticSchema.statics.EDUCATION = EDUCATION;
StatisticSchema.statics.SOCIAL = SOCIAL;
StatisticSchema.statics.PSIONICS = PSIONICS;
StatisticSchema.statics.SENTINEL = SENTINEL;

StatisticSchema.statics.statNames = ['Strength','Dexterity','Endurance','Intelligence','Education','Social Status', 'Psionics'];

var Statistic = mongoose.model('Statistic', StatisticSchema);
module.exports = Statistic;
