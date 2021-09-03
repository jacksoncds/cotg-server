module.exports = {
    getMember(user) {
        return new Promise((resolve, reject) => {
            if (user.id && user.provider) {
                const mongoose = require('mongoose');
                mongoose.connection.db.models.members.findOne(
                    {
                        provider: user.provider,
                        providerId: user.id,
                    },
                    (err, member) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(member);
                        }
                    }
                );
            } else {
                reject(new Error('User id and provide must be present.'));
            }
        });
    },
};

