/*
 * Skills model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Dice = require('./dice'),
    Stat = require('./stat');

var nameValidator = function (val) {return /*TODO -1 != statNames.indexOf(val)*/true;};
var statValidator = function (val) {
    if( val) {
        if( Stat.statNames.indexOf(val) == -1) {
            return (val instanceof Stat.Statistic.prototype.schema);
        } else {
            // if a string, this skill must have a parent
            // note that this will not be true for the default skill/stat tables
            return this.parent;
        }
    
        return true;
    }
    
    return true;
};

var SkillSchema = new Schema( {
    name:   { type:String, index:false, required:true, validate: nameValidator },
    rank:   { type:Number, index:false },
    stat:   { type:Schema.Types.Mixed, index:false, validate:statValidator }
});

SkillSchema.statics.newSkill = function (initVal, cb) {
    var s = new Skill(initVal);

    if( s.rank) s.rank = Math.floor(s.rank);
    
    if(cb) cb(s);
}

SkillSchema.virtual('modifier').get( function() {
    var result = this.rank ? -3 : this.rank;

    if( this.stat) {
        var searchResult = Stat.statNames.indexOf(this.stat);
        if( searchResult == -1)
            result += this.stat.modifier;   // a real stat object
        else
            result += this.parent.stats[searchResult].modifier; // parent's stat, in same order
    }
    
    return result;
});

// TODO create table of skills
SkillSchema.statics.adolescentSkills = [
    {name:"Admin"},
    {name:"Animals"},
    {name:"Art"},
    {name:"Athletics"},
    {name:"Carouse"},
    {name:"Drive"},
    {name:"Electronics"},
    {name:"Flyer"},
    {name:"Language"},
    {name:"Mechanic"},
    {name:"Medic"},
    {name:"Profession"},
    {name:"Science"},
    {name:"Seafarer"},
    {name:"Streetwise"},
    {name:"Survival"},
    {name:"Vacc Suit"}
];

var Skill = mongoose.model('Skill', SkillSchema);
module.exports = Skill;
