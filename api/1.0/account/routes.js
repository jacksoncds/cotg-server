const Account = require('./account');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.get('/account/token', function(req, res) {
                let account = new Account();

                account.getExtToken(req.user)
                .then((token) => {
                    res.send(token);
                })
                .catch((err) => {
                    res.send('Something went wrong.');
                });
            });

            app.post('/account/token', function(req, res) {
                let account = new Account();

                let tokenData = {
                    ip: req.headers['x-real-ip'],
                };

                let newToken = account.generateExtToken(tokenData);

                account.updateExtToken(newToken, req.user)
                .then((token) => {
                    res.send({token: token});
                })
                .catch((err) => {
                    res.send('Something went wrong.');
                });
            });
        },
    },
};
