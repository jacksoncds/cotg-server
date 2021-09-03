const mongoose = require("mongoose");

let invites = mongoose.Schema({
    created: Date,
    expiration: Date,
    inGameName: String,
    createdBy: String,
    isClaimed: Boolean
});

module.exports = invites;