let Forum = require("./forum");
let mongoose = require('mongoose');

class Topic extends Forum {
    constructor() {
        super();
    }

    get(){
        let self = this;
        return new Promise(function(resolve, reject){
            mongoose.models.forum.find({}, "", function(err, forums){
                if (err) {
                    reject(err);
                } else {
                    resolve(forums);
                }
            });
        });
    }

    getThreads(topicId){
        return new Promise(function(resolve, reject){
            mongoose.models.forum.findById(topicId, "threads", function(err, topic){
                if (err) {
                    reject(err);
                } else {
                    if(topic != null){
                        resolve(topic.threads);
                    } else {
                        resolve([]);
                    }
                }
            })
        });
    }

    create(topic) {
        topic.createdDate = Date.now();
        return new Promise(function (resolve, reject) {
            mongoose.models.forum.create(
                {
                    created: topic.createdDate,
                    title: topic.title,
                    permissions: [],
                    roles: [],
                    replies: [],
                    description: topic.description,
                    createdBy: topic.createdBy
                },
                function (err, t) {
                    if (err) {
                        reject(err);
                    }

                    resolve(t);
                }
            )
        });
    }

    update() {
        return new Promise(function(resolve, reject){
            let mongoose = require('mongoose').connection;
        });
    }

    delete() {

    }
}

module.exports = Topic;