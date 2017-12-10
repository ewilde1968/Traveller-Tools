
/*
 * DBParams model
*/

var mongoose = require('mongoose');

var DBParamsSchema = new mongoose.Schema( {
    initialized:    { type:Boolean, required:true, index:false }
});

DBParamsSchema.statics.fromTemplate = function( templateName, cb) {
    DBParamsSchema.findOne({initialized:true}, function(err,doc) {
        if(err) return err;
        var result = null;
        
        if( !!doc === false) {
            // database not yet initialized
            result = new DBParams( {initialized:false});
            result.save(err => handleError(err));
        } else {
            // database may be initialized
            result = doc.toObject();
        }

        if (cb) cb( err, result);
    });
};

var DBParams = mongoose.model('DBParams', DBParamsSchema);
module.exports = DBParams;