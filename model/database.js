
/*
 * Database Utility Routes
 */
module.exports = Database;

var mongoose = require('mongoose'),
    defaultObjects = require('./defaultObjects'),
    DBParams = require('./dbparams');

var db = false;
function Database () {
    // connect using promises
    if( !db)
        mongoose.connect('mongodb://127.0.0.1:27017/travellerTools',
                        {useMongoClient:true});

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('connected to db'));
    
    return this;
};

Database.prototype.initialize = function() {
    // see if the database is setup properly and, if not, initialize
    DBParams.findOne({}, (err,doc) => {
        if(err) return err;
        
        if( !!doc === false || !!doc.initialized === false) {
            // database not initialized, (re)initialize
            doc = new DBParams({initialized:false});
            
            doc.initialized = true;
            doc.save();
        }
    });
};
