const mongoose = require('mongoose');

module.exports = {
    connect: function(connectionString){
        mongoose.connect(connectionString);
        let db = mongoose.connection;
        db.on('connected', function(){
            console.log("Connected to database.");
        });

        return db;
    }
}
