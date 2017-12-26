
/*
 * character controller
 */
var Character = require('./../model/character'),
    Stat = require('./../model/stat'),
    Skill = require('./../model/skill'),
    Service = require('./../model/service');

//app.get('/character', character.list);
exports.list = function(req, res){
    throw "GET /characters - invalid call, not implemented."; // TODO
};

var renderCharacter = function(res, req, ch) {
    /********
    **  We determine the necessary action here. The intent is to put the bulk of logic here
    **  and pass only the  nessecary data onward. Also, we should be able to load the
    **  character at any time from the database and make the next step.
    **
    **  Possible actions here include:
    **      choose adolescent skills (1)
    **      choose a service (2)
    **      choose a term skill table (3)
    **          this does not occur on boot camp
    **      choose skill specialty (4)
    **          this does not occur on boot camp
    **      choose to commission or not (5)
    **          attempt survival/mishap, then commission/promotion, then event
    **      choose promotion skill table (6)
    **          can result in another choose skill specialty(7)
    **      choose to enter draft or be a drifter (8)
    **
    **/
    var term = ch.enrolled ? ch.enrolled[0] : null,
        service = term ? Service.findService(term.name) : null,
        baseService = term ? Service.findService(term.name,true) : null,
        action = '', obj = null;

    if( !ch.skills || ch.skills.length == 0) {
        // choose adolescent skills (1)
        action = 'adolescent';
        obj = Skill.adolescentSkills;
    } else {
        if(service && !term.completed) {
            if( !term.skills || term.skills.length == 0 || term.promoted) {
                // choose a skill table (3), (6)
                action = 'skill';
            } else if (baseService.commission && !term.commissioned) {
                // choose commission or promotion as enlisted (5)
                action = 'commission';
            } else {
                // random other event responses go through here as well
                throw 'unhandled';
            }
        } else {
            // see if we need to choose a specialty (4), (7)
            obj = ch.skills.find((e) => Skill.needsSpecialty(e));
            if(obj) {
                action = 'specialty';
                obj = Skill.initialSkills.find((e) => e.name.includes(obj.name));  // original skill
            } else if(term && term.musteredOut) {
                if(term.musteredOut.includes('Failed enlistment')) {
                    // draft or drifter (8)
                    action = 'draft';
                    obj = [
                        Service.initialServices.find((e)=>e.name.includes('Barbarian')),
                        Service.initialServices.find((e)=>e.name.includes('Wanderer')),
                        Service.initialServices.find((e)=>e.name.includes('Scavenger'))
                    ];
                } else {
                // choose a service (2)
                    action = 'enlist';
                    obj = new Array();
                    Service.initialServices.forEach(function(e) {
                        // if not a part of the last term, add it
                        if(!baseService.name.includes(e.name))
                            obj.push(e);
                    });
                }
            } else {
                // choose a service (2)
                action = 'enlist';
                obj = Service.initialServices;
            }
        }
    }

    console.log("Render Character " + action);
    console.log(ch);

    // ready for rendering. often a lean copy will be passed in
    if (ch)
        res.send( req.app.locals.viewCallbacks.character({
            action:             action,
            character:          ch,
            data:               obj,
            term:               term,
            service:            service,
            baseService:        baseService,
            title:              ch.title
        }));
}

//app.get('/character/:characterid', character.get);
exports.get = function(req, res, next) {
    Character.loadDeepCharacter( req.params.characterid, next, function(err,ch) {
       if (err) return next(err);
        
        renderCharacter(res, req, ch);
    });
};

//app.post('/character/new', user.newCharacter);
exports.newCharacter = function(req, res, next) {
    Character.newCharacter({ musteredOut:false, age:18, owner:req.session.userId}, function( err, ch) {
        if( err) return next(err);

        // render the character display with prompts for muster out vs. service term
        renderCharacter(res, req, ch);
    });
};

//app.post('/user/:userid', user.update);
exports.updateCharacter = function(req, res, next) {
    Character.loadDeepCharacter( req.params.characterid, next, function(err, ch) {
        console.log(req.body);
        
        if (err) return next(err);

        if( req.body.adskill && 0 == ch.skills.length)
            ch.addSkill( req.body.adskill); // adding adolescent skills to character
        else if( req.body.enroll)
            if( 'Muster Out' == req.body.enroll) {
                ch.musterOut();
            } else {
                // enrolling in a service
                ch.attemptServiceTerm( req.body.enroll);
            }
        else if( req.body.termskill)
            ch.carryOutTerm(req.body.termskill);
        else if( req.body.commission)
            ch.attemptPromotion(req.body.commission);
        else if( req.body.specialty)
            ch.addSkill(req.body.specialty);
        ch.save();
        
        // render the character display with prompts for next update, or finished
        renderCharacter(res, req, ch);
    });
};
