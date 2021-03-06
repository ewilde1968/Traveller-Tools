/*
 * GET home page.
 */
const Account = require('./../model/account'),
      viewCallbacks = require('./../viewCallbacks'),
      pug = require('pug');

//app.get('/', routes.index);
exports.index = function(req, res){
    // show title screen and require sign in to do anything else
    res.send( req.app.locals.viewCallbacks.index(
        { err:false, defaultUsername:'' }
    ));
};

//app.post('/', routes.signin);
exports.signin = function( req, res, next) {
    Account.login( req.body.username, req.body.password, function(err, acct) {
        if(err) return next(err);

        if( acct) {
            req.session.userId = acct._id.toHexString();    // TODO: use something more secure
            res.redirect( '/user/' + req.session.userId);
        } else {
            // incorrect username or password
            res.send( req.app.locals.viewCallbacks.index(
                { err:true, defaultUsername:req.body.username }
            ));
        }
    });
};