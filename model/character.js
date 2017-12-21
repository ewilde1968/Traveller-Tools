
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

    ch.save( (err) => {if(cb) cb(err, ch);});   // save changes
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
    var a = this.skills;
    
    if( Array.isArray(skillz)) {
        skillz.forEach((val) => this.addSkill(val));
        return;
    } else if( typeof skillz === 'string' && skillz.length > 0) {
        var found = a.find((e) => e.isMatch(skillz));
        if( found) {
            found.increaseRank(skillz);
            this.markModified('skills');
        } else {
            var stat = this.stats.find((e) => e.name.match(skillz));
            if( stat) {
                stat.value++;
                this.markModified('stats');
            } else {
                Skill.newSkill( {name:skillz, rank:0 }, (s) => a.push(s));
                this.markModified('skills');
            }
        }
        return;
    } else if( typeof skillz === 'object' && skillz != null) {
        // is it a valid object?
        Skill.newSkill( {name: skillz.name,
                         rank: skillz.rank ? Math.floor(skillz.rank) : 0,
                         stat: skillz.stat
                        },
                       function (s) {
            a.push(s);this.markModified('skills');
        });
return;
    }
    
    throw 'CharacterSchema.methods.addSkill';
};

CharacterSchema.methods.attemptPromotion = function( attemptCommission) {
    var term = this.enrolled[0];

    if(attemptCommission)
        term.attemptCommission(this.stats);

    term.attemptPromotion(this.stats);
    if( !term.promoted)
        term.completed = true;
    
    this.markModified('enrolled');
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
        term.completed = true;
    
    // make sure changes are saved
    this.markModified('enrolled');
};

CharacterSchema.methods.addServiceTerm = function(sr) {
    // already accepted into service
    // add to character history
    var c = this;
    c.enrolled.unshift(sr);  // can add null record if entering term unenlisted
    
    // basic training or skill
    if(sr && sr.rank == undefined) {
        // basic training, add all service skills at zero if not already owned
        var bServ = Service.findService(sr.name,true);  // get base service
        bServ.service.forEach( function(skName) {
            if( !c.skills.find( (csk) => csk.name == skName)) {
                // add skill to character and service record
                c.addSkill(skName);
                sr.addSkill(skName);
            }
        });
        
        this.carryOutTerm();
    }

    // choose skill from UI then carry out term
    this.markModified('enrolled');
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
            musteredOut:    false,
            completed:      false
        }, function(sr) {
            // see if qualified
            var q = service.qualification;
            
            // TODO special qualifications like age for marines or soc status for nobles
            if(sameService) {   // re-enlisted
                if(term.rank || 0 === term.rank)
                    sr.rank = term.rank;
                if(term.commissioned)
                    sr.commissioned = term.commissioned;
                c.addServiceTerm( sr);
            } else if(!q ||   // no qualifications required
               (Dice.rollDice(2,6) + c.stats.find((e) => q.stat.match(e.name)).modifier) >= q.difficulty) {
                c.addServiceTerm( sr);
            } else {
                // not qualified, fall back to unenlisted state
                // check to see if same service but different assignment
//                if( term == undefined && (c.enrolled.length > 0))
  //                  ;//c.addServiceTerm(null);    // TODO provide feedback to user
        }
    });
};

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
