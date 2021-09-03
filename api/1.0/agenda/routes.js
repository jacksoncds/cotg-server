const validator = require('validator');
const Agenda = require('./agenda');

module.exports = {
    routes: {
        bind: (app, passport) => {
            app.get('/agenda', function(req, res) { 
                let agenda = new Agenda();
                agenda.get(req.user)
                .then((a) => {
                    res.send(a[0].agenda);
                })
                .catch((err) => {
                    res.status(501).send(err);
                });
            });

            app.post('/agenda', function(req, res) {
                let agenda = new Agenda();
                agenda.add(req.body, req.user)
                .then((id) => {
                    res.send(response);
                })
                .catch((err) => {
                    res.send(err);
                });
            });

            app.patch('/agenda/:id', function(req, res) {

            });

            app.delete('/agenda/:id', function(req, res) {

            });
        },
    },
};
