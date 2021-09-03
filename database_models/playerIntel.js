const mongoose = require('mongoose');

let playerRevision = new mongoose.Schema({
    inGameName: String,
    alliance: String,
    timezone: String,
    substitute: String,
    substituteTimeZone: String,
    playStyle: String,
    comment: String,
    revisedOn: Date,
    revisedBy: String,
});

let player = new mongoose.Schema({
    inGameName: String,
    alliance: String,
    timezone: String,
    substitute: String,
    substituteTimeZone: String,
    playStyle: String,
    comment: String,
    revisions: [
        {
            type: playerRevision,
        },
    ],
});

module.exports = player;
