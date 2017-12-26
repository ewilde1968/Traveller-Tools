
/*
 * Character model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Stat = require('./stat'),
    Skill = require('./skill'),
    Service = require('./service'),
    ServiceRecord = require('./serviceRecord'),
    Dice = require('./dice');

var CharacterSchema = new Schema( {
    name:           { type:String, index:true },
    age:            { type:Number, index:false },
    owner:          { type:String, index:true, required:true },
    stats:          { type:[Stat.StatisticSchema], index:false },
    skills:         { type:[Skill.SkillSchema], index:false },
    enrolled:       { type:[ServiceRecord.ServiceRecordSchema] }
    }, {usePushEach:true});


CharacterSchema.statics.newCharacter = function( initVal, cb) {
    var ch = new Character( initVal);
    var oldStatsObj = null;
    
    if( !ch.stats || ch.stats.length < 1)
        for( var counter = 0; counter < Stat.SENTINEL; counter++) {
            Stat.newStatistic({name: Stat.statNames[counter]},(v)=>ch.stats[counter]=v);
        }
        
    if( !ch.skills)
        ch.skills = new Array(0);   // now create an zero length skills array
    
    if( !ch.age)
        ch.age = 18;

    ch.save( (err) => {if(cb) cb(err, ch);});   // save changes
};

CharacterSchema.statics.updateCharacter = function(chId, chObj, callback) {
    Character.findById(chId, function(err, ch) {
        if (err) return next(err);

        if(ch) {
            $.extend(true,ch,chObj); // deep copy
            ch.save();
            if(callback) callback(err,ch);
        }
    });
};

CharacterSchema.statics.loadDeepCharacter = function(id, next, cb) {
    Character.findById(id, function(err, ch) {
        if (err) return next(err);

        // load the stats deeply
        ch.stats.forEach( function(val, ind, arr) {
            if( val)
                Stat.newStatistic(val, (s) => arr[ind] = s);
        });
        

        // load the skills deeply
        ch.skills.forEach( function(val, ind, arr) {
            if( val)
                Skill.newSkill(val, (s) => arr[ind] = s);
        });

        // load most recent term deeply
        if(ch.enrolled && ch.enrolled[0])
            ServiceRecord.newServiceRecord(ch.enrolled[0], (s) => ch.enrolled[0] = s);
        
        console.log('load character:' + ch);
        
        if(cb)
            cb(err,ch);
    });
}

CharacterSchema.methods.addSkill = function( skillz) {
    var c = this,
        a = c.skills;
    
    if( Array.isArray(skillz)) {
        skillz.forEach((val) => c.addSkill(val));
        return;
    } else if( typeof skillz === 'string' && skillz.length > 0) {
        var found = a.find((e) => e.isMatch(skillz));
        if( found) {
            found.increaseRank(skillz);
            c.markModified('skills');
        } else {
            var stat = c.stats.find((e) => e.name.match(skillz));
            if( stat) {
                stat.value++;
                c.markModified('stats');
            } else {
                Skill.newSkill( {name:skillz, rank:0 }, (s) => a.push(s));
                c.markModified('skills');
            }
        }
    } else if( typeof skillz === 'object' && skillz != null) {
        // may be another skill object, merge it
        // may have a rank and name string
        //      name may be "root" or "root (specialty)"
        var found = a.find((e) => e.isMatch(skillz.name));
        if(found) {
            found.merge(skillz);
            c.markModified('skills');
        } else {
            // new skill
            if(!skillz.rank)
                skillz.rank = 0;

            Skill.newSkill( skillz, function (s) {
                a.push(s);
                c.markModified('skills');
            });
        }
    }
};

CharacterSchema.methods.attemptPromotion = function( attemptCommission) {
    var c = this,
        term = c.enrolled[0];
    
    var cb = function(b) {
        // received promotion, add any bonuses
        if(b)
            c.addSkill(b);
    }

    if(attemptCommission)
        term.attemptCommission(c.stats, cb);

    term.attemptPromotion(c.stats, cb);

    if( !term.promoted)
        term.complete(c);
    
    c.markModified('enrolled');
};

CharacterSchema.methods.carryOutTerm = function( skillTable) {
    var c = this;
    var term = c.enrolled[0];
    
    // carry out a service term in which the character is already enrolled
    if( skillTable) {
        var skill = term.chooseSkill(skillTable);
              
        // add skill to character and service record
        c.addSkill(skill);
        term.addSkill(skill);
    }

    // survival only if haven't survived this term already (and been promoted)
    if( !term.promoted) {
        term.attemptSurvival(c.stats, c.enrolled.length); 

        // commission or promotion from UI
        if( !term.completed && (term.commissioned || !Service.findService(term.name,true).commission))
            c.attemptPromotion(false);

        // event TODO
    } else  // already promoted this term
        term.complete(this);
    
    // make sure changes are saved
    this.markModified('enrolled');
};

CharacterSchema.virtual('title').get( function() {
    if( this.enrolled && this.enrolled.length > 0)
        return this.enrolled[0].title;
    
    // never been in any service
    return 'Youth';
});

CharacterSchema.methods.addServiceTerm = function(sr) {
    // may be a failed service enlistment
    if(sr) {
        var c = this;
        // add to character history
        c.enrolled.unshift(sr);
    
        if(!sr.musteredOut) {
            if(sr.rank == undefined && c.enrolled.length == 1) {
                // basic training, add all service skills at zero if not already owned
                var bServ = Service.findService(sr.name,true);  // get base service
                bServ.service.forEach( function(skName) {
                    if( !c.skills.find((csk)=>skName.match(csk.name))) {
                        // add skill to character and service record
                        c.addSkill(skName);
                        sr.addSkill(skName);
                    }
                });
        
                this.carryOutTerm();
            }
            // choose skill from UI then carry out term
        }

        this.markModified('enrolled');
    }
};

CharacterSchema.methods.reEnlist = function() {
    var c = this,
        term = c.enrolled ? c.enrolled[0] : null;
    
    if(term && !term.musteredOut) {
        ServiceRecord.newServiceRecord(Object.assign({},{
            name:           term.name,
            completed:      false
        }), function(sr) {
            if(term.rank || 0 === term.rank)
                sr.rank = term.rank;
            if(term.commissioned)
                sr.commissioned = term.commissioned;
            c.addServiceTerm(sr);
        });
    }
};

CharacterSchema.methods.attemptServiceTerm = function( serviceName) {
    if( !this.enrolled)
        this.enrolled = new Array();
    
    var c = this,
        term = this.enrolled[0],    // may be undefined or null
        service = Service.findService(serviceName),
        sameService = term && !term.musteredOut && service == Service.findService(term.name),
        initVal = {name:serviceName,musteredOut:false,completed:false};

    ServiceRecord.newServiceRecord(
        {
            name:           serviceName,
            completed:      false
        }, function(sr) {
            if(sameService)
                c.reEnlist();
            else if( sr.attemptEnlist(c.stats, c.age, c.enrolled, function(e) {
                    if(e)
                        c.addSkill(e);
            }))
                c.addServiceTerm(sr);
            else if(term && Service.findService(serviceName,true).match(term.name))
                // refused new assignment in same service, re-enlist in same assignment
                c.reEnlist();   // do this after attempting to qualify
            else {
                // failed to enlist in service
                // draft or drifter
                sr.musterOut('Failed enlistment');
                c.addServiceTerm(sr);
            }
        }
    );
};

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
