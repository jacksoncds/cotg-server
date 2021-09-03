const sanitize = require('mongo-sanitize');
const Intel = require('./intel');

/**
 * Send error.
 * @param {*} res response object.
 */
function onError(res) {
    res.status(500).send('Something went wrong, looking into it.');
}

/**
 * Send data.
 * @param {*} res response object.
 * @param {*} data data to send.
 */
function onSuccess(res, data) {
    res.send(data);
}

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            // Player
            app.get('/intel/player/:page/:sortOrder/:sortColumn/:limit', function (req, res) {
                let intel = new Intel(req.user);

                intel.getPlayers()
                    .then((data) => {
                        res.send(data);
                    }, (err) => {
                        sendError(res);
                    });
            });

            app.get('/intel/player', function (req, res) {
                let intel = new Intel(req.user);

                intel.getPlayers()
                    .then((data) => {
                        res.send(data);
                    }, (err) => {
                        res.send('Something went wring, looking into it.');
                    });
            });

            app.post('/intel/player', function (req, res) {
                let intel = new Intel(req.user);
                let player = sanitize(req.body);
                intel.createPlayer(player).then(data => {
                    res.send(data);
                }, err => {
                    sendError(res);
                });
            });

            app.patch('/intel/player', function (req, res) {
                let intel = new Intel(req.user);
                let player = sanitize(req.body);
                intel.updatePlayer(player).then(data => {
                    res.send(data);
                }, err => {
                    sendError(res);
                });
            });

            // City
            app.get('/intel/city', function (req, res) {
                let intel = new Intel(req.user);

                intel.getCities()
                    .then((data) => {
                        res.send(data);
                    }, (err) => {
                        res.send('Something went wring, looking into it.');
                    });
            });

            app.get('/intel/city/:search/:page/:sortOrder/:sortColumn/:limit', (req, res) => {
                let intel = new Intel(req.user);
                let util = require(global.$root_path + '/util');
                let options = util.createTableOptions(req.params);

                intel.getPlayers(options).then((data) => {
                    res.send(data);
                }, (err) => {
                    res.send("Something went wrong, looking into it.");
                });
            });

            app.post('/intel/city', function (req, res) {
                let intel = new Intel(req.user);
                let city = sanitize(req.body);
                intel.createCity(city)
                    .then((data) => {
                        onSuccess(res, data);
                    }, (err) => {
                        onError(res);
                    });
            });

            app.patch('/intel/city', function (req, res) {
                let intel = new Intel(req.user);
                let city = sanitize(req.body);
                intel.updatePlayer(city)
                    .then((data) => {
                        res.send(data);
                    }, (err) => {
                        sendError(res);
                    });
            });
        }
    }
}