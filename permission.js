class Permission {
    constructor() {
        this.db = require('mongoose').connection;
    }

    async getRolesByPermission(permission) {
        let p = permission.map(c => c.id);
        return this.db.models.permission_role.find({ permissions: { $in: p } }).exec();
    }

    async getPermissionByUrl(url) {
        return this.db.models.permissions.find({ url: url }, "").exec();
    };

    async doesUserHavePermission(provider, providerId, permission) {
        let roles = await this.getRolesByPermission(permission);
        let p = permission.map(r => r.id);
        let r = roles.map(r => r.id);

        return this.db.models.members.find({
            $and: [
                {
                    $or: [
                        { permissions: { $in: p } },
                        { permissions: { $in: r } }
                    ]
                },
                { provider: provider },
                { providerId: providerId }
            ]
        }, "").exec();
    }

    async getPermissionsByMember(provider, id) {
        this.db.models.member.findOne({ provider: provider, providerId: id }, "", function (err, member) {
            if (err) {
                throw err;
            }

            return member;
        });
    }

    async getPermissionsByRoles(roles) {
        return new Promise((resolve, reject) => {
            this.db.models.roles.find(
                {
                    '_id': { $in: roles }
                },
                (err, permissions) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(permissions);
                    }
                }
            )
        });
    }

    async getUserRolesAndPermissions(user) {
        return new Promise((resolve, reject) => {
            this.db.models.members.findOne(
                {
                    provider: user.provider,
                    providerId: user.id
                }
            )
                .populate('roles')
                .populate('permissions')
                .exec((err, member) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(member);
                    }
                });
        });
    }

    async isAllowed(path, user, method) {
        let permissions = [];

        let member = await this.getUserRolesAndPermissions(user);

        if (member == null) {
            return false;
        } else {
            member.permissions.forEach(p => {
                p.permissions.forEach(r => {
                    permissions.push(r);
                });
            });
        }

        rolesAndPermissions.forEach(p => {
            p.permissions.forEach(r => {
                permissions.push(r);
            });
        });

        return permissions;
    }
}

async function permission(req, res, next) {

    let pathParts = req.path.split('/');
    let perms = new Permission();

    perms.isAllowed(req.path, req.user, req.method)
        .then(r => {
            console.log(r);
        })
        .catch(err => {

        });

    //Check if logged in.
    let allowed = [
        '/auth/google',
        '/auth/google/invite',
        '/auth/google/callback',
        '/auth/fail',
        '/auth/status',
        '/auth/register',
    ]

    let isPathAllowed = allowed.find(a => a === req.path);

    if (isPathAllowed) {
        next();
    } 
    else {
        if (req.user) {
            let db = require('mongoose').connection;
            let perm = new Permission(db);

            let permission = await perm.getPermissionByUrl(pathParts[1]);

            let isOk = await perm.doesUserHavePermission(req.user.provider, req.user.id, permission);

            if(isOk.length > 0){
                next();
            } else {
                res.status(401).send("You do not have access to this page.");
            }
            next();
        }
        else {
            res.status(401).send('Please login to access this page.');
        }
    }
}


module.exports = { permissionMiddleWare: permission, permission: Permission };