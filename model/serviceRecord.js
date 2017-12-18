/*
 * ServiceRecord model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Stat = require('./stat'),
    Service = require('./service'),
    Dice = require('./dice');

var serviceValidator = function (val) {
    return Service.initialServices.find((e) => e.name == val);
};

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

var ServiceRecordSchema = new Schema( {
    service:        { type:Schema.Types.Mixed, required:true, validate: serviceValidator },
    rank:           { type:Number, index:false },   // undefined means not yet gone to boot camp
    commissioned:   { type:Boolean, index:false },  // undefined means hasn't yet tried for commission
    benefit:        { type:Boolean, index:false },  // undefined means not yet done event
    skills:         { type:[String], index:false }, // undefined means starting term
    promoted:       { type:Boolean, index:false },  // undefined means hasn't yet tried for promotion
    musteredOut:    { type:Boolean, index:false, required: true },
    completed:      { type:Boolean, index:false, required: true }
});

ServiceRecordSchema.statics.newServiceRecord = function (initVal, cb) {
    var s = new ServiceRecord(initVal);

    if( !s.service) {
        s.service = Service.initialServices.find(function(e) {var temp = initVal.name.localeCompare( e.name);return temp == 0;});
        if( !s.service)
            throw 'bad service enlistment'
    }

    if(cb) cb(s);
};

ServiceRecordSchema.methods.addSkill = function(newSkill) {
    this.skills.push(newSkill);
};

ServiceRecordSchema.methods.attemptSurvival = function(stats, rollLimit) {
    var roll = Dice.rollDice(2,6),
        term = this,
        stat = stats.find((e) => term.service.survival.stat.localeCompare(e.name) == 0);

    if( roll + stat.modifier < term.service.survival.difficulty) {
        // failed to survive, TODO roll mishap
        console.log("MISHAP");
        term.musterOut();
    } else if( roll < rollLimit) {
        console.log('forced retirement');
        term.musterOut();   // forced retirement
    }
};

ServiceRecordSchema.methods.attemptCommission = function(stats) {
    var roll = Dice.rollDice(2,6),
        term = this,
        stat = stats.find((e) => term.service.comm.stat.localeCompare(e.name) == 0);
    
    if( this.commissioned)
        return; // already commissioned
    
    if( roll + stat.modifier >= term.service.comm.difficulty) {
        console.log('received commission');
        term.commissioned = true;
        term.promoted = true;
        term.rank = 0;
    } else
        term.commissioned = false;
};

ServiceRecordSchema.methods.attemptPromotion = function(stats) {
    var roll = Dice.rollDice(2,6),
        term = this,
        stat = stats.find((e) => term.service.promotion.stat.localeCompare(e.name) == 0);
    
    if( this.promoted)
        return; // already promoted
    
    if( roll + stat.modifier >= term.service.promotion.difficulty) {
        console.log('received promotion');
        term.promoted = true;
        if( term.rank == undefined)
            term.rank = 0;
        else
            term.rank++;
    } else
        term.promoted = false;
};

ServiceRecordSchema.methods.musterOut = function() {
    console.log('MUSTERED OUT');
    this.completed = true;
    this.musteredOut = true;
};

ServiceRecordSchema.methods.chooseSkill = function(table) {
    var t = (table.localeCompare('Personal Development') == 0) ? this.service.personal :
    'Higher Education' == table ? this.service.higherEd :
    'Officer' == table ? this.service.officer :
    'Service Skills' == table ? this.service.service :
    this.service.specialist;
    
    return t[Dice.rollDice(1,t.length) - 1];
}

var ServiceRecord = mongoose.model('ServiceRecord', ServiceRecordSchema);
module.exports = ServiceRecord;
