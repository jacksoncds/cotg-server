const mongoose = require("mongoose");

module.exports = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    description: String,
    createdBy: String
});