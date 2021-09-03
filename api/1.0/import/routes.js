const sanitize = require('mongo-sanitize');
const Import = require('./import');

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.post('/import/military', function(req, res){
                let importer = new Import();
                importer.importPlayerMilitary(req.user.id, req.body).then(function(){
                    res.send("OK");
                }, function(err){
                    res.status(401).send(err);
                });
            });

            /*
             * Intel routes
             */

            /*
             * Attacks routes
             */

            /*
             * World routes
             */
            app.post('/import/world/info', function(req, res){
                
            });

            /*
             * Player routes
             */
            app.post('/import/player/cities', function(req, res){
                
            });

            app.post('/import/player/military', function(req, res){
                
            });

            /*
             * Alliance routes
             */

            app.post('/import/alliance/ranking', function (req, res) {
                
            });

            app.post('import/alliance/temple', function(req, res){

            });

            app.post('import/alliance/combat', function(req, res){

            });

            app.post('import/alliance/raiding', function(req, res){

            });

            app.post('import/alliance/imcoming', function(req, res){

            });

            app.post('import/alliance/outgoing', function(req, res){

            });
        }
    }
}