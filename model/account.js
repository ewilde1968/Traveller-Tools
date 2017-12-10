
/*
 * User model
*/

var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema( {
    first:      String,
    last:       String,
    email:      { type:String, unique:true, required:true },
    password:   { type:String, index:true, required:true },
    admin:      { type:Boolean, default:false }
});


AccountSchema.statics.newAccount = function( username, password, cb) {
    // assume logged in appropriately by this point
    var acct = new Account( {email:username, password:password});
    if( acct) {
        acct.save( (err) => {if(cb) cb(err, acct);});
    } else
        throw "Account.updateAccount - new Account failed";
};

AccountSchema.statics.updateAccount = function( userId, username, password) {
    // assume logged in appropriately by this point
    var acct = Account.findByIdAndUpdate( userId,
                                         {email:username, password:password}
                                        ).exec();
};

AccountSchema.statics.login = function( username, password, cb) {
    var acct = Account.findOne( {email:username, password:password}, cb);
};

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
