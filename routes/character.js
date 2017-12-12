
/*
 * character controller
 */
var Character = require('./../model/character');

//app.get('/character', character.list);
exports.list = function(req, res){
    throw "GET /characters - invalid call, not implemented."; // TODO
};

var renderCharacter = function(res, req, ch) {
    console.log(ch);
    if (ch)
        res.send( req.app.locals.viewCallbacks.character({character:ch}));
}

//app.get('/character/:characterid', character.get);
exports.get = function(req, res, next) {
    Character.findById(req.body.characterId, function(err, ch) {
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
    Character.updateCharacter(req.body.characterId, req.body.character, function(err,ch) {
        if( err) return next(err);

        // render the character display with prompts for next update, or finished
        renderCharacter(res, req, ch);
    });
};
