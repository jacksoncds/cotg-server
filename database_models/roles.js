const Schema = require('mongoose').Schema;
const permission = require('./permissions');
const SchemaTypes = require('mongoose').SchemaTypes;

const roles = new Schema({
    title: String,
    description: String,
    permissions: [permission],
    createdBy: SchemaTypes.ObjectId,
    createdOn: String,
    isActive: Boolean,
});

module.exports = roles;
