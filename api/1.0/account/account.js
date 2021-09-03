module.exports = class Account {
    /**
     * Empty constructor.
     */
    constructor() {
        this.db = require('mongoose').connection;
    };

    /**
     * Generate new extension token.
     * @param {Object} tokenData token data.
     * @return {string} [Token] Generated token.
     */
    generateExtToken(tokenData) {
        let jwt = require('jsonwebtoken');

        // TODO: Use env variable
        let secret = 'TestingSecret';

        return jwt.sign(tokenData, secret);
    }

    /**
     * Get extension token.
     * @param {object} member member provider and provider id.
     * @return {Promise} Token.
     */
    getExtToken(member) {
        return new Promise((resolve, reject) => {
            this.db.models.members.findOne(
                {provider: member.provider, providerId: member.id},
                'extensionToken',
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    }

    /**
     * Update member extension token.
     * @param {string} token Token to use.
     * @param {object} member Member to update.
     * @return {string} Token.
     */
    updateExtToken(token, member) {
        return new Promise((resolve, reject) => {
            this.db.models.members.update(
                {provider: member.provider, providerId: member.id},
                {$set: {extensionToken: token}},
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
            });
        });
    }
};
