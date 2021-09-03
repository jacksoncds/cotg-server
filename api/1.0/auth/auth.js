let db = null;

let auth = {
    init: function(database){
        db = database;
    },

    register: function(){
        return new Promise((resolve, reject) => {
            db.models.members.create();
        });
    },

    isRegistered: function(provider, userId){
       return db.models.members.findOne({'provider':provider, 'providerId': userId});
    }
}

module.exports = auth;