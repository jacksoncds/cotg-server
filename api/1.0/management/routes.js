const Management = require('./management');
const sanitize = require('mongo-sanitize');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.get('/management/members', function (req, res) {
                let m = new Management();
                let members = [];

                m.getMembers()
                    .then((result) => {
                        res.send(result);
                    }).catch((err) => {
                        console.log(err);
                    });
            });

            app.patch('/management/member', (req, res) => {
                let m = new Management();

                m.updateMember(req.body)
                    .then((member) => {
                        res.send(member);
                    })
                    .catch((err) => {
                        res.status(500);
                    });
            });
        }
    }
}