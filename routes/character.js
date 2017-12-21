
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
    console.log("Render Character");
    console.log(ch);
    var term = ch.enrolled ? ch.enrolled[0] : null,
        service = term ? Service.findService(term.name) : null,
        baseService = term ? Service.findService(term.name,true) : null,
        titles = !baseService ? null : (service.title ? service.title
            : term.commissioned ? baseService.title.officer : baseService.title.enlisted);

    // ready for rendering. often a lean copy will be passed in
    if (ch)
        res.send( req.app.locals.viewCallbacks.character({
            character:          ch,
            adolescentSkills:   Skill.adolescentSkills,
            serviceOptions:     Service.initialServices,
            term:               term,
            service:            service,
            baseService:        baseService,
            titles:             titles
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

        if( req.body.adskill && 0 == ch.skills.length) {
            // adding adolescent skills to character
            ch.addSkill( req.body.adskill);
            ch.save();
        } else if( req.body.enroll) {
            if( 'Muster Out' == req.body.enroll) {
                ch.musterOut();
            } else {
                // enrolling in a service
                ch.attemptServiceTerm( req.body.enroll);
            }
            ch.save();
        } else if( req.body.termskill) {
            ch.carryOutTerm(req.body.termskill);
            ch.save();
        } else if( req.body.commission) {
            ch.attemptPromotion(req.body.commission);
            console.log('saving' + ch);
            ch.save();
        }
        
        // render the character display with prompts for next update, or finished
        renderCharacter(res, req, ch);
    });
};
