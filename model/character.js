
/*
 * Character model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CharacterSchema = new Schema( {
    name:           { type:String, index:true },
    age:            { type:Number, index:false },
    owner:          { type:String, index:true, required:true}
});

CharacterSchema.statics.newCharacter = function( initVal, cb) {
    console.log('Character:newCharacter');
    var ch = new Character( initVal);
    if(ch) {
        ch.save( (err) => {if(cb) cb(err, ch);});
    } else
        throw "Character.newCharacter new Character failed";
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

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
