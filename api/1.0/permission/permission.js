/**
 * Permission class.
 */
class Permission {
    /**
     * Constructor.
     */
    constructor() {
        this.db = require('mongoose').connection;
        this.sanitize = require('mongo-sanitize');
    }

    /**
     * Get all permissions available.
     * @return {Promise} Promise.
     */
    getPermissions() {
        return new Promise((resolve, reject) => {
            this.db.models.permissions.find({}, (err, permissions) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(permissions);
                }
            });
        });
    }

    /**
     * Get all roles.
     * @return {Promise} Promise.
     */
    getRoles() {
        return new Promise((resolve, reject) => {
            this.db.models.roles.find({}, '', (err, roles) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(roles);
                }
            });
        });
    }

    /**
     * Create new role.
     * @param {Object} role Role.
     * @return {Promise} Promise.
     */
    newRole(r, userId) {
        return new Promise((resolve, reject) => {
            if (typeof userId != 'string') {
                reject('Could not create new role. Please try again later.');
            }

            r = this.sanitize(r);

            let role = {
                title: r.title,
                description: r.description,
                permissions: r.permissions,
                createdBy: userId,
                createdOn: Date.now(),
                isActive: true,
            };

            this.db.models.roles.create(role, (err, role) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(role);
                }
            });
        });
    }

    /**
     * Get permissions by user id.
     * @param  {String} userId User Id.
     * @return {Promise} Promise.
     */
    getPermission(userId) {
        return new Promise((resolve, reject) => {
            this.db.models.members
                .find({ _id: userId }, 'permissions', (err, permissions) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(permissions);
                    }
                });
        });
    }
}

module.exports = Permission;
