const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var player = new mongoose.Schema({
    provider: String,
    providerId: String,
    inGameName: String,
    gender: String,
    email: String,
    inviteId: String,
    joinOnDate: Date,
    agenda: [],
    military: [military],
    cities: [cities],
    roles: [
        {type: Schema.Types.ObjectId, ref: 'permission_role'}
    ],
    permissions: [
        {type: Schema.Types.ObjectId, ref: 'permission'}
    ]
});

module.exports = player;