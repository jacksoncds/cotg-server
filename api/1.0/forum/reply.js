let Forum = require("./forum");

class Reply extends Forum {
    constructor(user) {
        super(user);
    }

    create(topicId, threadId, content) {
        let self = this;
        let reply = {
            content: content,
            created: Date.now(),
            edited:null,
            isEdited: false,
            createdBy: this.user.inGameName
        }

        return new Promise(function (resolve, reject) {
            if (self.validator.isMongoId(topicId) && self.validator.isMongoId(threadId)) {
                let query = self.models.forum.update({"_id": topicId, "threads._id": threadId}, {
                    "$push": {
                        "threads.$.replies": reply
                    }
                },function(err, result){
                    if (err) {
                        reject(err);
                    }

                    resolve(reply);
                } );
            }
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

module.exports = Reply;