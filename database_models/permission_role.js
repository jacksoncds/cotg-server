const mongoose = require("mongoose");

var permissionRoles = new mongoose.Schema({
    title: String,
    permissions: Array
});

module.exports = permissionRoles;