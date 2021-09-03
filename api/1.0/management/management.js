/**
 * Management class.
 * @return {Class} Management.
 */
class Management {
    /**
     * Constructor.
     */
    constructor() {
        this.db = require('mongoose').connection;
        this.sanitize = require('mongo-sanitize');
    }

    /**
     * Get members.
     * @return {Promise} Promise
     */
    getMembers() {
        return new Promise((resolve, reject) => {
            this.db.models.members.find({},
            'inGameName joinOnDate permissions roles',
            (err, members) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(members);
                }
            });
        });
    }

    /**
     * Update member roles and permissions.
     * @param {*} m Member
     * @return {Promise} Promise.
     */
    updateMember(m) {
        return new Promise((resolve, reject) => {
            if (m) {
                m = this.sanitize(m);

                this.db.models.members.update(
                    {_id: m._id},
                    {
                        roles: m.roles,
                        permissions: m.permissions,
                    }, (err, member) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(member);
                        }
                    }
                );
            }
        });
    }

    /**
     * Get all roles.
     */

     /**
      * Get roles by member.
      */

    /**
     * Update member roles.
     */

    /**
     * Update role.
     */

     /**
      * 
      */
}

module.exports = Management;
