const util = {
    loadAllModels: function(db) {
        let fs = require("fs");
        let path = require("path");
        let models_path = __dirname + '/database_models';
        fs.readdirSync(models_path).forEach(function (file) {
            if (fs.lstatSync(models_path + "/" + file).isDirectory() == false) {
                let name = path.parse(file).name;
                let schema = require(models_path+'/'+file);
                db.model(name, schema, name);
            }
        })
    },

    createTableOptions: function(params){
        let validator = require('validator');

        if (!validator.isNumeric(params.limit)) {
            throw new Error("Limit must be a number.");
        }

        if (params.sortOrder !== 'asc' && params.sortOrder !== 'desc') {
            throw new Error("Sort order must be asc or desc.");
        }

        if (!validator.isAlpha(params.sortColumn)) {
            throw new Error("Limit must be a string.");
        }

        if (params.search.length > 0 && !validator.isAlphanumeric(params.search)) {
            throw new Error("Limit must be a alphanumeric.");
        }

        if (params.search.length > 0 && !validator.isAlphanumeric(params.search)) {
            throw new Error("Search must be a alphanumeric.");
        }

        if (!validator.isNumeric(params.page)) {
            throw new Error("Page must be a number.");
        }

        let sortColumn = params.sortColumn;
        if (params.sortOrder === 'desc') {
            sortColumn = '-'+sortColumn;
        }

        return {
            page: Number.parseInt(params.page),
            limit: Number.parseInt(params.limit),
            sortOrder: params.sortOrder,
            sortColumn: sortColumn,
            search: validator.escape(params.search)
        }
    }
}

module.exports = util;