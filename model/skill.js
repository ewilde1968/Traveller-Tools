/*
 * Skills model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Dice = require('./dice');

const initialSkills = [
    {
        name:      'Admin'
    },{
        name:      'Advocate'
    },{
        name:      'Animals',
        specialty: [{
            name: 'Handling'
        },{
            name: 'Veterinary'
        },{
            name: 'Training'
        }]
    },{
        name:      'Art',
        specialty: [{
            name: 'Performer'
        },{
            name: 'Holography'
        },{
            name: 'Instrument'
        },{
            name: 'Visual Media'
        },{
            name: 'Write'
        }]
    },{
        name:      'Astrogation'
    },{
        name:      'Athletics',
        specialty: [{
            name: 'Dexterity'
        },{
            name: 'Endurance'
        },{
            name: 'Strength'
        }]
    },{
        name:       'Broker'
    },{
        name:       'Carouse'
    },{
        name:       'Deception'
    },{
        name:       'Diplomat'
    },{
        name:       'Drive/Fly',
        specialty:  [{
            name:   'Hovercraft'
        },{
            name:   'Mole'
        },{
            name:   'Track'
        },{
            name:   'Walker'
        },{
            name:   'Wheel'
        },{
            name:   'Airship'
        },{
            name:   'Grav'
        },{
            name:   'Ornithopter'
        },{
            name:   'Rotor'
        },{
            name:   'Wing'
        }]
    },{
        name:       'Electronics',
        specialty:  [{
            name:   'Comms'
        },{
            name:   'Computers'
        },{
            name:   'Remote Ops'
        },{
            name:   'Sensors'
        }]
    },{
        name:       'Engineer',
        specialty:  [{
            name:   'M-drive'
        },{
            name:   'J-drive'
        },{
            name:   'Life Support'
        },{
            name:   'Power'
        }]
    },{
        name:       'Explosives',
    },{
        name:       'Gambler'
    },{
        name:       'Gunner',
        specialty:  [{
            name:   'Turret'
        },{
            name:   'Orbital Artillery'
        },{
            name:   'Screen'
        },{
            name:   'Capital'
        }]
    },{
        name:       'Gun Combat',
        specialty:  [{
            name:   'Archaic'
        },{
            name:   'Energy'
        },{
            name:   'Slug'
        }]
    },{
        name:       'Heavy Weapons',
        specialty:  [{
            name:   'Artillery'
        },{
            name:   'Man Portable'
        },{
            name:   'Vehicle'
        }]
    },{
        name:       'Investigate'
    },{
        name:       'Jack-fo-All-Trades'
    },{
        name:       'Language',
        specialty:  [{
            name:   'Galanglic'
        },{
            name:   'Vilani'
        },{
            name:   'Zdeti'
        },{
            name:   'Oynprith'
        }]
    },{
        name:       'Leadership'
    },{
        name:       'Mechanic'
    },{
        name:       'Medic'
    },{
        name:       'Melee',
        specialty:  [{
            name:   'Unarmed'
        },{
            name:   'Blade',
        },{
            name:   'Bludgeon'
        },{
            name:   'Natural'
        }]
    },{
        name:       'Navigation',
    },{
        name:       'Persuade'
    },{
        name:       'Pilot',
        specialty:  [{
            name:   'Small Craft'
        },{
            name:   'Spacecraft'
        },{
            name:   'Capital Ships'
        }]
    },{
        name:       'Profession',
        specialty:  [{
            name:   'Belter'
        },{
            name:   'Biologicals'
        },{
            name:   'Civil Engineering'
        },{
            name:   'Construction'
        },{
            name:   'Hydroponics'
        },{
            name:   'Polymers'
        }]
    },{
        name:       'Recon'
    },{
        name:       'Science',
        specialty:  [{
            name:   'Archaeology'
        },{
            name:   'Astronomy'
        },{
            name:   'Chemistry'
        },{
            name:   'Cosmology'
        },{
            name:   'Cybernetics'
        },{
            name:   'Economics'
        },{
            name:   'Genetics'
        },{
            name:   'History'
        },{
            name:   'Linguistics'
        },{
            name:   'Philosophy'
        },{
            name:   'Physics'
        },{
            name:   'Planetology'
        },{
            name:   'Psionicology'
        },{
            name:   'Psychology'
        },{
            name:   'Robotics'
        },{
            name:   'Sophontology'
        },{
            name:   'Xenology'
        }]
    },{
        name:       'Seafarer',
        specialty:  [{
            name:   'Ocean Ships'
        },{
            name:   'Personal'
        },{
            name:   'Sail'
        },{
            name:   'Submarine'
        }]
    },{
        name:       'Stealth'
    },{
        name:       'Steward'
    },{
        name:       'Streetwise'
    },{
        name:       'Survival'
    },{
        name:       'Tactics',
        specialty:  [{
            name:   'Military'
        },{
            name:   'Naval'
        }]
    },{
        name:       'Vacc Suit'
    }
];

var splitSkillName = function(str) {
    var result = new Array,
        specialtyStart = str.indexOf('(');

    if(-1 == specialtyStart) {
        // this is just a base string
        result[0] = str.trim();
        result[1] = null;
    } else {
        result[0] = str.substring(0,specialtyStart).trim();
        result[1] = str.substring(specialtyStart+1, str.indexOf(')',specialtyStart));
    }
    
    return result;
};

var nameValidator = function (val) {
    var skillNames = splitSkillName(val);
    return initialSkills.find((e) => e.name.includes(val));
};

var rankValidator = function(r) {
    if(r) return Number.isInteger(r);
    return true;
};

var SkillSchema = new Schema( {
    name:       { type:String, index:false, required:true, validate: nameValidator },
    rank:       { type:Number, index:false, validate:rankValidator },
    specialty:  { type:[{name:String, rank:Number}], index:false }
});

SkillSchema.statics.newSkill = function (initVal, cb) {
    // possible pass in values include
    //      string with just base skillname, (rank)
    //      string with detailed skillname, (rank)
    //      object with name:base skillname, (rank)
    //      object with name: detailed skillname, (rank)
    //      well formed db object
    if(initVal.name && initVal.specialty) {
        // assume a well formed db object
        if(cb) cb(new Skill(initVal));
    } else {
        var skillNames = splitSkillName(initVal.name ? initVal.name : initVal),
            base = initialSkills.find((e) => e.name.includes(skillNames[0]));
    
        if( base) {
            // specialty from a detailed string constructor.
            var newBase = Object.assign({},{specialty:[]},base,{rank:initVal.rank}),
                specialtyIndex = !skillNames[1] ? -1 :
                    base.specialty.findIndex((e) => e.name.find(skillNames[1])),
                newSpecialty = (specialtyIndex == -1) ? null :
                    Object.assign({},base.specialty[specialtyIndex],{rank:initVal.rank});
        
            if( -1 != specialtyIndex)
                newBase.specialty[specialtyIndex] = newSpecialty;
        
            var s = new Skill(newBase);
            if(cb) cb(s);
        } else {
            // could possible be a stat increase don't throw
            return null;
        }
    }
};

SkillSchema.virtual('modifier').get( function() {
    var result = this.rank ? -3 : this.rank;

    return result;
});

SkillSchema.methods.isMatch = function(skillStr) {
    return this.name.includes(splitSkillName(skillStr)[0]);
};

SkillSchema.methods.merge = function(obj) {
    // check to see if the skill specialty already exists at equal or higher level
    var mergeSpecialty = function (oSp,r) {
        var f = r.specialty.find((g) => oSp.name.includes(g.name));
        if(f) {
            // found the matching specialty, merge
            if(oSp.rank > f.rank)
                f.rank = oSp.rank;
        } else {
            // didn't find the matching speciatly, copy
            r.specialty.push({name:oSp.name,rank:oSp.rank?oSp.rank:0});
        }
    };
    
    if(Array.isArray(obj.specialty) && obj.specialty.length > 0) {
        // merge specialty array
        obj.specialty.forEach((e) => mergeSpecialty(e,this));
    } else {
        // no specialty array in the new skill
        // does the skill name indicate a specialty?
        if( this.name.includes(obj.name)) {
            // "root", no specialty
            // merge the root skill
            if(obj.rank > this.rank)
                this.rank = obj.rank;
        } else {
            // "root (specialty)"
            mergeSpecialty(obj,this)
        }
    }
}

SkillSchema.methods.increaseRank = function(skillStr) {
    // input values can be:
    //      a detailed skill string
    //      a simple skills string for the root skill
    //      a simple skill string for the specialty
    //      null, undefined, or empty string
    console.log('increaseRank');
    console.log(skillStr);
    
    var incrementRootRank = function(sk) {
        // the html state machine will show the need to choose a specialty if necessary
        sk.rank = (sk.rank || 0 == sk.rank) ? (sk.rank+1) : 0;
    };

    var incrementSpecialtyRank = function(sk,specialty) {
        var s = sk.specialty.find((e) => e.name.includes(specialty));
        if(s) {
            s.rank = s.rank ? (s.rank + 1) : 1;
        } else {
            // this specialty is not yet a part of the skill
            // make one at rank 0
            if(!sk.specialty)
                sk.specialty = new Array();
            s = Object.assign(new Object(), {name:specialty,rank:1});
            sk.specialty.push(s);
        }

        // root skill with specialty is decremented
        // zero means specialties chosen
        sk.rank = (sk.rank > 0) ? (sk.rank - 1) : 0;
    };

    if( !skillStr || skillStr.length == 0) {
        // empty input, increment root rank
        incrementRootRank(this);
    } else {
        // its a string of some kind
        var skillNames = splitSkillName(skillStr),
            base = skillNames[0],
            specialty = skillNames[1];
        if(base && !this.isMatch(skillStr))
            throw 'mismatched skill ' + base + ':' + this.name;
        
        if(specialty) {
            incrementSpecialtyRank(this,specialty);
        } else if( base) {
            incrementRootRank(this);
        } else
            throw 'bad skill' + skillStr;
    }
};

SkillSchema.statics.needsSpecialty = function (sr) {
    if(sr) {
        var original = initialSkills.find((e) => e.name.includes(sr.name));
        if (sr.rank > 0 && original.specialty && original.specialty.length > 0)
            return true;
    }
    
    return false;
};

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
SkillSchema.statics.initialSkills = initialSkills;

var Skill = mongoose.model('Skill', SkillSchema);
module.exports = Skill;
