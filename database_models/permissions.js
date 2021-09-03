const mongoose = require("mongoose");

let permission = mongoose.Schema({
    title: String,
    url: Object,
    read: Boolean,
    write: Boolean,
    delete: Boolean
}); 

module.exports = permission;