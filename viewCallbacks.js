/**
 * model/controller/view dependencies.
 */

const routes = require('./routes'),
      user = require('./routes/user'),
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

    result = new Object({
        indexCF:pug.compileFile('./views/index.pug', loadOptions)
    });

    return result;
};
