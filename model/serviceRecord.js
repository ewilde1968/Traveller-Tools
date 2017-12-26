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

var getTitleObject = function (sr) {
    if(sr) {
        var base = Service.findService(sr.name,true);
        
        if(base) {
            var assignment = Service.findService(sr.name),
                titles = assignment.title ? assignment.title :
                    (sr.commissioned ? base.title.officer : base.title.enlisted);

            if( titles)
                return titles[(sr.rank ? (sr.rank - (sr.commissioned?1:0)) : 0)];
        }
    }

    return null;
};

var addBonusToParent = function (sr, cb) {
    if(sr && cb) {
        var title = getTitleObject(sr);
        if(title && title.bonus) {
            cb(title.bonus);
        }
    }
};

var ServiceRecordSchema = new Schema( {
    name:           { type:String, required:true, validate:nameValidator},
    rank:           { type:Number, index:false },   // undefined means not yet gone to boot camp
    commissioned:   { type:Boolean, index:false },  // undefined means hasn't yet tried for commission
    benefit:        { type:Boolean, index:false },  // undefined means not yet done event
    skills:         { type:[String], index:false }, // undefined means starting this term
    promoted:       { type:Boolean, index:false },  // undefined means hasn't yet tried for promotion
    musteredOut:    { type:String, index:false },
    completed:      { type:Boolean, index:false, required: true }
});

ServiceRecordSchema.statics.newServiceRecord = function (initVal, cb) {
    var s = new ServiceRecord(initVal);

    if(cb) cb(s);
};

ServiceRecordSchema.virtual('title').get( function() {
    if(this.rank == undefined)
        return 'Enlistee';
    
    var title = getTitleObject(this);
    if(title)
        return title.name;

    // no titles or no service
    return '';
});

ServiceRecordSchema.methods.addSkill = function(newSkill) {
    this.skills.push(newSkill);
};

ServiceRecordSchema.methods.attemptEnlist = function(stat, age, history, cb) {
    var result = false,
        base = Service.findService(this.name,true),
        q = base.qualification;
    
    console.log('enlistment attempt: ' + this.name);
    
    if(!q)
        result = true;    // no qualifications
    else {
        if(q.autostat && stat.find((e)=>q.autostat.name.match(e.name).value>q.autostat.value))
            result = true;    // has the right stuff
        else {
            var dm = 0, ppStr = '';
            dm += (q.age && age >= q.age.limit) ? q.age.mod : 0;
            dm += stat.find((e)=>q.stat.match(e.name)).modifier;
    
            if(history)
                history.forEach((e)=>dm-=(Service.findService(e.name,true).name.match(ppStr))?1:0);

            if((Dice.rollDice(2,6) + dm) >= q.difficulty)
                result = true;
        }
    }
    
    if(result) {
        console.log('enlisted successfully');
        addBonusToParent(this,cb);
        return true;
    }
    
    console.log('failed to enlist')
    return false;
};

ServiceRecordSchema.methods.attemptSurvival = function(stats, rollLimit) {
    var roll = Dice.rollDice(2,6),
        term = this,
        service = Service.findService(term.name),
        stat = stats.find((e) => service.survival.stat.match(e.name));

    if( roll + stat.modifier < service.survival.difficulty) {
        // failed to survive, TODO roll mishap
        term.musterOut('Mishap');
    } else if( roll < rollLimit) {
        term.musterOut('Forced retirement');
    } else
        console.log('survived');
};

ServiceRecordSchema.methods.promote = function(cb) {
    this.promoted = true;
    
    if(this.rank != undefined)
        this.rank++;
    else
        this.rank = 1;

    addBonusToParent(this,cb);
};

ServiceRecordSchema.methods.attemptCommission = function(stats,cb) {
    var roll = Dice.rollDice(2,6),
        term = this,
        baseService = Service.findService(term.name,true);
    
    if( this.commissioned || !baseService.commission)
        return; // already commissioned or no commission possible
    
    var stat = stats.find((e) => baseService.commission.stat.match(e.name));
    if( roll + stat.modifier >= baseService.commission.difficulty) {
        console.log('received commission') + baseService.commission.difficulty;
        term.commissioned = true;
        term.rank = 0;
        term.promote(cb);
    } else {
        console.log('failed commission' + baseService.commission.difficulty)
        term.commissioned = false;
    }
};

ServiceRecordSchema.methods.attemptPromotion = function(stats,cb) {
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
        term.promote(cb);
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

ServiceRecordSchema.methods.musterOut = function(str) {
    console.log('MUSTERED OUT: ' + str);
    this.completed = true;
    this.musteredOut = str ? str : 'Volountary retirement';
};

ServiceRecordSchema.methods.chooseSkill = function(table) {
    var service = Service.findService(this.name),
        base = Service.findService(this.name,true),
        t = table.match('Personal Development') ? base.personal :
            table.match('Higher Education') ? base.education.list :
            table.match('Officer') ? base.officer :
            table.match('Service Skills') ? base.service :
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
