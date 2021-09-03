const Forum = require('./forum');

/**
 * On success, send data.
 * @param {*} res response object.
 * @param {*} data data to send.
 */
function onSuccess(res, data) {
    res.send(data);
}

/**
 * On error, send 501 status and error.
 * @param {object} res response object.
 */
function onError(res) {
    res.status(501).send('Something went wrong.');
}

module.exports = {
    routes: {
        bind: (app, passport, db) => {
            app.get('/forum/categories', function(req, res) {
                let forum = new Forum();
                forum.getCategories()
                .then(function(categories) {
                    res.send(categories);
                })
                .catch((err) => {
                    res.status(501).send(err);
                });
            });

            app.get('/forum/category/:categoryId', function(req, res) {
                let forum = new Forum();
                topic.get().then(function(forums) {
                    res.send(forums);
                }).catch((err) => {
                    res.status(501).send(err);
                });
            });

            app.get('/forum/topics/:categoryId', function(req, res) {
                let forum = new Forum();
                forum.getTopics(req.params.categoryId)
                .then((data) => {
                    onSuccess(res, data.topics);
                })
                .catch((err) => {
                    onError(err);
                });
            });

            app.get('/forum/topic/:topicId', function(req, res) {
                let forum = new Forum();
                topic.getThreads(req.params.topicId)
                .then((data) => {
                    onSuccess(res, data);
                })
                .catch((err) => {
                    onError(res);
                });
            });

            app.get('/forum/replies/:catId/:topicId', function(req, res) {
                let forum = new Forum();
                forum.getReplies(req.params.catId, req.params.topicId)
                .then((data) => {
                    onSuccess(res, data.topics[0].replies);
                })
                .catch((err) => {
                    onError(res);
                });
            });

            // Create
            app.post('/forum/category', function(req, res) {
                let forum = new Forum();
                forum.newCategory(req.body).then((topic) => {
                    res.send(topic);
                }, (err) => {
                    res.send('Something went wrong.');
                });
            });

            app.post('/forum/topic', function(req, res) {
                let forum = new Forum();
                forum.newTopic(req.body, req.user, req.body.catId)
                .then((topic) => {
                    res.send(topic);
                }, (err) => {
                    res.send('Something went wrong.');
                });
            });

            app.post('/forum/reply', function(req, res) {
                let forum = new Forum();
                forum.newReply(req.body, req.user, null).then((topic) => {
                    res.send(topic);
                }, (err) => {
                    res.send('Something went wrong.');
                });
            });

            //Update
            app.patch("/forum/topic/:topicId", 
                passport.authenticate('google', {scope: ['email']})
            );

            app.patch("/forum/thread/:threadId", 
                passport.authenticate('google', {scope: ['email']})
            );

            app.patch("/forum/reply/:replyId", 
                passport.authenticate('google', {scope: ['email']})
            );

            //Delete
            app.delete("/forum/topic/:topicId", 
                passport.authenticate('google', {scope: ['email']})
            );

            app.delete("/forum/thread/:threadId", 
                passport.authenticate('google', {scope: ['email']})
            );

            app.delete("/forum/reply/:replyId", 
                passport.authenticate('google', {scope: ['email']})
            );
        }
    }
}