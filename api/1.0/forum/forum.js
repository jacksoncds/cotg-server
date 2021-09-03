const validator = require('validator');
const mongoose = require('mongoose');
/**
 * Forum class.
 */
class Forum {
    /**
     * Constructor.
     * @param {*} user user.
     */
    constructor(user) {
        this.validator = validator;
        this.models = mongoose.models;
        this.user = user;
    }
    
    sanitizeContent() {

    }

    /**
     * Get user id by user name.
     * @param {*} user user data.
     * @return {object} user.
     */
    getUserIdByUserName(user) {
        return new Promise((resolve, reject) => {
            
        });
    }

    /**
     * Escape category object.
     * @param {object} category category data.
     * @return {object} escaped category.
     */
    escapeCategory(category) {
        return {
            title: validator.escape(category.title),
            description: validator.escape(category.description),
            createdBy: validator.escape(category.createdBy),
            created: validator.escape(category.created),
            roles: validator.escape(category.roles),
            permissions: validator.escape(category.permissions),
        };
    }
    /**
     * Escape topic object.
     * @param {object} topic topic data.
     * @return {object} escaped topic.
     */
    escapeTopic(topic) {
        return {
            title: validator.escape(topic.title),
            description: validator.escape(topic.description),
            createdBy: validator.escape(topic.createdBy),
            created: Date.now(),
        };
    }
    /**
     * Escape reply object.
     * @param {object} reply reply data.
     * @return {object} escaped reply.
     */
    escapeReply(reply) {
        return {
            content: validator.escape(reply.content),
            createdBy: '',
            created: Date.now(),
        };
    }

    /**
     * Create new category.
     * @param {object} category category data.
     * @param {object} user user that created category.
     * @return {Promise}
     */
    newCategory(category, user) {
        return new Promise((resolve, reject) => {
            let cat = this.escapeCategory(category);

            // Create new category
            this.models.forum.insert(cat, (err, status) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(status);
                }
            });
        });
    }

    /**
     * @param {object} categoryId category id.
     * @return {Promise} promise.
     */
    getCategory(categoryId) {
        return new Promise((resolve, reject) => {
            this.models.forum.findOne(
                {_id: categoryId},
                '',
                (err, category) => {
                    if (err) {
                        reject(err);
                    } else {
                        relsove(category);
                    }
                }
            )
        });
    }

    /**
     * Get all categories.
     * @return {Promise} promise.
     */
    getCategories() {
        return new Promise((resolve, reject) => {
            this.models.forum.find(
                {},
                '_id title createdBy created description',
                (err, categories) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(categories);
                    }
                }
            );
        });
    }

    /**
     * Edit category.
     * @param {object} category category data.
     * @param {object} user user that created category.
     * @return {Promise}
     */
    editCategory(category, user) {
        return new Promise((resolve, reject) => {
            let cat = this.escapeCategory(category);
        });
    }

    /**
     * Delete category.
     * @param {object} category category data.
     * @param {object} user user that created category.
     * @return {Promise}
     */
    deleteCategory(category, user) {
        return new Promise((resolve, reject) => {
            let cat = this.escapeCategory(category);
        });
    }

    /**
     * Get all topics by category id.
     * @param {*} categoryId Category id.
     * @return {Promise} Promise.
     */
    getTopics(categoryId) {
        return new Promise((resolve, reject) => {
            if (categoryId) {
                this.models.forum.findOne(
                    {_id: categoryId},
                    'topics',
                    (err, topics) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(topics);
                        }
                    }
                );
            } else {
                reject(new Error(`Cannot find category id ${catergoryId}`));
            }
        });
    }

    /**
     * New topic.
     * @param {object} topic topic.
     * @param {object} user user.
     * @param {object} catId category id.
     * @return {Promise} promise.
     */
    newTopic(topic, user, catId) {
        return new Promise((resolve, reject) => {

            let newTopic = this.escapeTopic(topic);

            this.models.forum.update(
                {_id: catId},
                {$push: {
                    topics: newTopic,
                }},
                (err, status) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(status);
                }
            });
        });
    }

    editTopic(topic, user) {
        return new Promise((resolve, reject) => {
            let topic = this.escapeTopic(topic);
        });
    }

    deleteTopic(topic, user) {
        return new Promise((resolve, reject) => {
            let topic = this.escapeTopic(topic);
        });
    }

     /**
     * Get all replies by category and topic id.
     * @param {*} categoryId Category id.
     * @param {*} topicId Topic id.
     * @return {Promise} Promise.
     */
    getReplies(categoryId, topicId) {
        return new Promise((resolve, reject) => {
            if (categoryId) {
                this.models.forum.findOne(
                    {'_id': categoryId, 'topics._id': topicId},
                    'topics.$.replies',
                    (err, topics) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(topics);
                        }
                    }
                );
            } else {
                reject(new Error(`Cannot find category id ${catergoryId}`));
            }
        });
    }

    /**
     * New reply.
     * @param {*} reply repy data.
     * @param {*} user user replying.
     * @param {*} replyId replying to id.
     * @return {Promise} promise.
     */
    newReply(reply, user, replyId) {
        return new Promise((resolve, reject) => {
            let r = this.escapeReply(reply);

            this.models.forum.update(
                {'_id': reply.catId, 'topics._id': reply.topicId},
                {$push: {
                    'topics.$.replies': r,
                }},
                (err, status) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(status);
                    }
                }
            );
        });
    }

    editReply(reply, user) {
        return new Promise((resolve, reject) => {
            let r = this.escapeReply(topic);
        });
    }

    deleteReply(reply, user) {
        return new Promise((resolve, reject) => {
            let r = this.escapeReply(topic);
        });
    }
}

module.exports = Forum;
