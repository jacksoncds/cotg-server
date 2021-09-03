const sanitize = require('mongo-sanitize');
const auth = require('./../auth/auth');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.get("/invite/status/:inviteId", (req, res) => {
                id = sanitize(req.params.inviteId);

                db.models.invites.findById(id, function(err, invite){
                    if(err){
                        res.status(500);
                    }
                    res.send(invite);
                });
            });

            app.post("/invite", (req, res) => {
                let invite = req.body;

                let query = auth.isRegistered(req.user.provider, req.user.id);
                query.exec(function(err, member){
                    if(err){
                        throw err;
                    }

                    db.models.invites.create({
                        created: new Date(),
                        expiration: new Date(new Date().getTime() + 172800000),
                        inGameName: invite.inGameName,
                        createdBy: member.inGameName,
                        isClaimed: false
                    }, function(err, invite){
                        if(err){
                            if(err.code === 11000){
                                res.status(500).send("An invite with that in game name is already available.");
                            } else {
                                res.status(500).send("Could not create invite, please try again later.");
                            }
                        } else {
                            res.send(invite);
                        }
                    });
                })
            });

            app.get('/invite/all', (req, res) => {
                db.models.invites.find({}, '_id created inGameName createdBy isClaimed expiration', function(err, all){
                    if(err){
                        res.status(500).send("Something went wrong, try again later.");
                    }
                    res.send(all);
                })
            });
        }
    }
}