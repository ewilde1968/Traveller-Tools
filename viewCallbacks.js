/**
 * model/controller/view dependencies.
 */

const routes = require('./routes'),
      user = require('./routes/user'),
      character = require('./routes/character'),
      pug = require('pug');

const loadOptions = {
    /* debug only
    */
    debug:false,
    /* debug only
    */
    doctype:'html'
};

exports.InitializeViewCallbacks = function (app) {
    app.get('/', routes.index);
    app.post('/', routes.signin);
    app.get('/users', user.list);
    app.get('/user/new', user.newUser);
    app.post('/user/new', user.createUser);
    app.get('/user/:userid', user.ensureSignedIn, user.home);
    app.post('/user/:userid', user.ensureSignedIn, user.update);
    app.get('/character/', user.ensureSignedIn, character.list);
    app.get('/character/new/:userid', user.ensureSignedIn, character.newCharacter);
    app.get('/character/:characterid', user.ensureSignedIn, character.list);
    app.post('/character/:characterid', user.ensureSignedIn, character.updateCharacter);

    result = new Object({
        index:pug.compileFile('./views/index.pug', loadOptions),
        createAccount:pug.compileFile('./views/createaccount.pug', loadOptions),
        user:pug.compileFile('./views/user.pug', loadOptions),
        character:pug.compileFile('./views/character.pug', loadOptions)
    });

    return result;
};
