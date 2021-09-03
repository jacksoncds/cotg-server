module.exports = class RouteUtility {
    constructor() {
        this.db = require('mongoose').connection;
    }

    getUserId(id, p) {
        return new Promise((resolve, reject) => {
            if (id && p) {
                this.db.models.members.findOne(
                    {
                        provider: p,
                        providerId: id
                    },
                    'inGameName',
                    function (err, member) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(member);
                        }
                    }
                );
            }
        });
    }
}