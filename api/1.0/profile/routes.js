const auth = require("./auth");
const sanitize = require('mongo-sanitize');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.get('/profile/:inGameName', function(req, res){
                //Check if this is logged in user.
                db.models.member.findOne({})
            });
        }
    }
}