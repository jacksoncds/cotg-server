const auth = require('./auth/routes.js');
const invite = require('./invite/routes.js');
const permissionRoutes = require('./permission/routes.js');
let database = require( './../../database.js');
let db = database.connect('mongodb://127.0.0.1:27017/database_name');
let Permission = require('./../../permission');
let forum = require('./forum/routes');
let imports = require('./import/routes');
let intel = require('./intel/routes');
let agenda = require('./agenda/routes');
let account = require('./account/routes');
let management = require('./management/routes');

// Exports
module.exports = {
    passport: null,
    bind: function(app) {
        const util = require(global.$root_path + '/util.js');

        util.loadAllModels(db);

        agenda.routes.bind(app, this.passport);

        management.routes.bind(app, this.passport);

        auth.routes.bind(app, this.passport, db);

        invite.routes.bind(app, this.passport, db);

        permissionRoutes.routes.bind(app, this.passport, db);

        forum.routes.bind(app, this.passport, db);

        imports.routes.bind(app, this.passport, db);

        intel.routes.bind(app, this.passport, db);

        account.routes.bind(app, this.passport, db);

        let permission = new Permission.permission(db);
    },
};
