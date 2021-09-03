let db = null;

let auth = {
    init: function(database){
        db = database;
    },

    register: function(){

    },

    isRegistered: function(provider, userId){
       return db.models.member.findOne({'provider':provider, 'providerId': userId});
    }
}

module.exports = auth;