module.exports = {
    validateToken(token, ip) {
        const jwt = require('jsonwebtoken');
        let content = jwt.verify(token, 'TestingSecret');

        if (content.ip !== ip) {
            return false;
        } else {
            return true;
        }
    },
    authenticate(inGameName, extensionToken, ip) {
        let db = require('mongoose').connection;

        return new Promise((resolve, reject) => {
            db.models.members.findOne(
                {inGameName: inGameName, extensionToken: extensionToken},
                (err, member) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (member) {
                            if (this.validateToken(extensionToken, ip)) {
                                resolve(member);
                            }
                        } else {
                            reject('Could not find member.');
                        }
                    }
                }
            );
        });
    },
    isAuthenticated() {
        return true;
    },
    unauthorized(connection) {
        let response = {
            status: 401,
            data: 'Could not authorize.',
        };

        connection.send(JSON.stringify(response));
    },
};

