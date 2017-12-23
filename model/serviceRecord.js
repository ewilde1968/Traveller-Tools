/*
 * ServiceRecord model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Stat = require('./stat'),
    Service = require('./service'),
    Dice = require('./dice');

var nameValidator = function (val) {
    var result = Service.findService(val);
    return (result != null) ? val : false;
};

var ServiceRecordSchema = new Schema( {
    name:           { type:String, required:true, validate:nameValidator},
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

    if(cb) cb(s);
};

ServiceRecordSchema.virtual('title').get( function() {
    base = Service.findService(this.name,true);

    if(base) {
        var assignment = Service.findService(this.name),
            titles = assignment.title ? assignment.title :
                (this.commissioned ? base.title.officer : base.title.enlisted);

        if(titles)
            return this.rank ? (titles[this.rank - (this.commissioned?1:0)].name) : 'Enlistee';
    }

    // no titles or no service
    return '';
});

ServiceRecordSchema.virtual('title').get( function() {
});


ServiceRecordSchema.methods.addSkill = function(newSkill) {
    this.skills.push(newSkill);
};

ServiceRecordSchema.methods.attemptSurvival = function(stats, rollLimit) {
    var roll = Dice.rollDice(2,6),
        term = this,
        service = Service.findService(term.name),
        stat = stats.find((e) => service.survival.stat.match(e.name));

    if( roll + stat.modifier < service.survival.difficulty) {
        // failed to survive, TODO roll mishap
        console.log("MISHAP" + service.survival.difficulty);
        term.musterOut();
    } else if( roll < rollLimit) {
        console.log('forced retirement' + service.survival.difficulty);
        term.musterOut();   // forced retirement
    }
    
    console.log('survived');
};

ServiceRecordSchema.methods.attemptCommission = function(stats) {
    var roll = Dice.rollDice(2,6),
        term = this,
        baseService = Service.findService(term.name,true);
    
    if( this.commissioned || !baseService.commission)
        return; // already commissioned or no commission possible
    
    var stat = stats.find((e) => baseService.commission.stat.match(e.name));
    if( roll + stat.modifier >= baseService.commission.difficulty) {
        console.log('received commission') + baseService.commission.difficulty;
        term.commissioned = true;
        term.promoted = true;
        term.rank = 1;
    } else {
        console.log('failed commission' + baseService.commission.difficulty)
        term.commissioned = false;
    }
};

ServiceRecordSchema.methods.attemptPromotion = function(stats) {
    var roll = Dice.rollDice(2,6),
        term = this,
        service = Service.findService(term.name);
    
    if( this.promoted || !service.advancement)
        return; // already promoted or no promotion possible
    
    if( term.rank == undefined)
        term.rank = 0;  // make sure it is defined, semaphore for completing term

    var stat = stats.find((e) => service.advancement.stat.match(e.name));
    if( roll + stat.modifier >= service.advancement.difficulty) {
        console.log('received promotion' + service.advancement.difficulty);
        term.promoted = true;
        term.rank++;
    } else {
        console.log('failed promotion' + service.advancement.difficulty);
        term.promoted = false;
    }
};

ServiceRecordSchema.methods.complete = function(ch) {
    this.completed = true;
    if(ch && ch.age)
        ch.age += 4;
};

ServiceRecordSchema.methods.musterOut = function() {
    console.log('MUSTERED OUT');
    this.completed = true;
    this.musteredOut = true;
};

ServiceRecordSchema.methods.chooseSkill = function(table) {
    var service = Service.findService(this.name),
        baseService = Service.findService(this.name,true),
        t = table.match('Personal Development') ? baseService.personal :
            table.match('Higher Education') ? baseService.higherEd :
            table.match('Officer') ? baseService.officer :
            table.match('Service Skills') ? baseService.service :
            service.skills;
    
    var result = t ? t[Dice.rollDice(1,t.length) - 1] : null;
    console.log( 'skill choice: ' + result);
    return result;
}

ServiceRecordSchema.methods.isMatch = function(str) {
    return (str.match(this.name) != null);
};

var ServiceRecord = mongoose.model('ServiceRecord', ServiceRecordSchema);
module.exports = ServiceRecord;
