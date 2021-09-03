let Forum = require("./forum");
const mongoose = require("mongoose");
const validator = require('validator');

class Thread extends Forum {
    constructor(user) {
        super();
        this.user = user;
    }

    get(id){
        let self = this;
        return new Promise(function (resolve, reject) {
            let mongoose = require('mongoose').connection;
            mongoose.models.forum_thread.find({_id: id}, "",
                function (err, thread) {
                    if (err) {
                        reject(err);
                    }

                    resolve(thread);
                }
            )
        });
    }

    getAll(){
        let self = this;
        return new Promise(function (resolve, reject) {
            let mongoose = require('mongoose').connection;
            mongoose.models.forum_thread.find({}, "",
                function (err, thread) {
                    if (err) {
                        reject(err);
                    }

                    resolve(thread);
                }
            )
        });
    }

    create(topicId, threadData) {

        let thread = {
            title: validator.escape(threadData.title),
            description: validator.escape(threadData.description),
            replies: [],
            createdBy: this.user.inGameName,
            created: Date.now()
        }

        return new Promise(function (resolve, reject) {
            if (validator.isMongoId(topicId)) {
                let query = mongoose.models.forum.findById(topicId);
                query.update({
                    $push: {
                        threads: thread
                    }
                });

                query.exec(function(err, status){
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(status);
                })

            } else {
                reject(new Error("Topic id is not a valid id."));
            }
        });
    }

    update() {
        let self = this;
        return new Promise(function(resolve, reject){
            let mongoose = require('mongoose').connection;
        });
    }

    delete() {
        let self = this;
        return new Promise(function(resolve, reject){
            let mongoose = require('mongoose').connection;
        });
    }
}

module.exports = Thread;