/*
 * Service model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

var ServiceSchema = new Schema( {
    name:           { type:String, required:true, validate: nameValidator },
    description:    { type:String, index:false },
    comm:           { stat:String, difficulty:Number },
    survival:       { stat:String, difficulty:Number },
    qualification:  { stat:String, difficulty:Number },
    promotion:      { stat:String, difficulty:Number },
    title:          { type:[String], index:false },
    // TODO special qualifications like age for marines
    personal:       { type:[String], required:true },
    service:        { type:[String], required:true },
    higherEd:       { type:[String], required:true },
    officer:        { type:[String], required:true },
    specialist:     { type:[String], required:true },
    // advancement
    // musterOut
    // mishaps TODO
    events:         { type:Array, index:false}
});

ServiceSchema.statics.newService = function (initVal, cb) {
    var s = new Service(initVal);

    if( s.rank) s.rank = Math.floor(s.rank);
    
    if(cb) cb(s);
}

// TODO create table of services
ServiceSchema.statics.initialServices = [
    {
        name:           'Marine (Support)',
        description:    'You are a quartermaster, engineer or battlefield medic in the marines. (Endurance, Education, Social Status)',
        comm:           {stat:'Social Status', difficulty:8},
        survival:       {stat:'Endurance', difficulty:5},
        qualification:  {stat:'Endurance', difficulty:6},
        promotion:      {stat:'Education', difficulty:7},
        personal:       ['Strength','Dexterity','Endurance','Gambler','Melee (Unarmed)','Melee (Blade)'],
        service:        ['Athletics','Vacc Suit','Tactics','Heavy Weapons','Gun Combat','Stealth'],
        higherEd:       ['Medic','Survival','Explosives','Engineer','Pilot','Navigation'],
        officer:        ['Electronics','Tactics','Admin','Advocate','Vacc Suit','Leadership'],
        specialist:     ['Electronics','Mechanic','Drive','Medic','Heavy Weapons','Gun Combat']
    },
    {
        name:           'Drifter (Wanderer)',
        description:    'You are a space bum, living hand-to-mouth in slums and spaceports across the galaxy. (Endurance, Intelligence)',
        survival:       {stat:'Endurance', difficulty:7},
        promotion:      {stat:'Intelligence', difficulty:7},
        personal:       ['Strength','Dexterity','Endurance','Language','Profession','Jack-of-all-Trades'],
        service:        ['Athletics','Melee (Unarmed)','Recon','Streetwise','Stealth','Survival'],
        specialist:     ['Drive','Deception','Recon','Stealth','Streetwise','Survival']
    }
];

var Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
