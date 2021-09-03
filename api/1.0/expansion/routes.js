const auth = require("./auth");
const sanitize = require('mongo-sanitize');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            auth.init(db);

            app.get("/auth/google",
                passport.authenticate('google', { scope: ['email'] })
            );

            app.get("/auth/google/callback",
                passport.authenticate('google', { failureRedirect: '/fail' }),
                function (req, res) {
                    var query = auth.isRegistered("google", req.user.id);
                    query.exec(function (err, member) {
                        if (err) {
                            console.log("Error:::", err);
                        }

                        if (member == null) {
                            //Needs to be registed
                            console.log("Needs to be registered.");
                            res.redirect('http://localhost/invite/redirect');
                        } else {
                            res.redirect('http://localhost/dashboard/');
                        }
                    });
                }
            );

            app.get("/auth/fail", (req, res) => {
                res.send("Login auth failed.");
            });

            app.get("/auth/status", (req, res) => {
                if (typeof req.session.passport !== 'undefined') {
                    if (req.session.passport.user !== 'undefined') {
                        db.models.member.findOne(
                            {
                                'provider': req.session.passport.user.provider,
                                'providerId': req.session.passport.user.id
                            },
                            '_id inGameName',
                            function (err, member) {
                                if (err) {
                                    res.send("Something went wrong please try again later.");
                                }

                                res.send(member);
                            }
                        );
                    } else {
                        res.status(401).send("Not logged in.");
                    }

                } else {
                    res.status(401).send("Not logged in.");
                }
            });

            app.post("/auth/register", (req, res) => {
                let inviteInput = sanitize(req.body);
                if (req.user) {
                    db.models.invite.findOne({ '_id': inviteInput._id }, function (err, invite) {
                        if (err) {
                            res.status(500);
                        }

                        if (inviteInput.inGameName.toLowerCase() === invite.inGameName.toLowerCase()) {

                            db.models.member.find({ provider: req.user.provider, providerId: req.user.id }, {}, function (err, member) {
                                if (member.length === 0) {
                                    db.models.member.create({
                                        provider: req.user.provider,
                                        providerId: req.user.id,
                                        inGameName: inviteInput.inGameName,
                                        email: req.user.emails[0].value,
                                        inviteId: invite._id,
                                        joinOnDate: new Date()
                                    });

                                    db.models.invite.update({ _id: invite._id }, { isClaimed: true }, function (err, inv) {
                                        if (err) {
                                            console.log("Could not set invite to claimed.");
                                            res.status(500).send("Something went wrong, try again later.");
                                        }

                                        res.send("OK");
                                    });
                                } else {
                                    res.status(500).send("It looks like this account is already registered.");
                                }
                            });
                        }
                    })
                } else {
                    res.status(401).send("Not logged in.");
                }
            });

            app.get("/auth/logout", (req, res) => {
                req.session.destroy(function (err) {
                    res.send("OK");
                });
            });
        }
    }
}