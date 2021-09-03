const sanitize = require('mongo-sanitize');
const auth = require('./../auth/auth');
const Permission = require('./permission');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.get('/permissions', (req, res) => {
                let p = new Permission();

                p.getPermissions()
                    .then((permissions) => {
                        res.send(permissions);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            });

            app.get('/roles', (req, res) => {
                let p = new Permission();

                p.getRoles()
                    .then((roles) => {
                        res.send(roles);
                    })
                    .catch((err) => {

                    });
            });

            app.post('/role', (req, res) => {
                let role = req.body;

                let p = new Permission();
                p.newRole(role, req.user.dbId)
                    .then((role) => {
                        res.send(role);
                    })
                    .catch((err) => {
                        res.status(err);
                    });
            });

            app.get("/permission/permissions/all", (req, res) => {
                let p = new Permission();

                p.getPermissions()
                    .then((permissions) => {
                        res.send(permissions);
                    })
                    .catch((err) => {
                        res.status(501).send(err);
                    });
            });

            app.get("/permission/roles/all", (req, res) => {
                db.models.permission_role.find({}, function (err, roles) {
                    if (err) {
                        res.status(500);
                    }
                    res.send(roles);
                });
            });

            app.post("/permission/permission", (req, res) => {
                let permission = req.body;

                let query = auth.isRegistered(req.user.provider, req.user.id);
                query.exec(function (err, member) {
                    if (err) {
                        throw err;
                    }

                    db.models.invite.create({
                        created: new Date(),
                        expiration: new Date(new Date().getTime() + 172800000),
                        inGameName: invite.inGameName,
                        createdBy: member.inGameName,
                        isClaimed: false
                    }, function (err, invite) {
                        if (err) {
                            if (err.code === 11000) {
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

            app.get('/permission/member/all', function (req, res) {
                db.models.member.find({}, "inGameName permissions",).populate('permissions').exec(function (err, all) {
                    if (err) {
                        throw err;
                    }

                    res.send(all);
                })
            });

            app.get('/invite/all', (req, res) => {
                db.models.invite.find({}, '_id created inGameName createdBy isClaimed expiration', function (err, all) {
                    if (err) {
                        res.status(500).send("Something went wrong, try again later.");
                    }
                    res.send(all);
                })
            });
        }
    }
}