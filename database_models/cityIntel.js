const mongoose = require('mongoose');

let cityRevision = new mongoose.Schema({
    x: Number,
    y: Number,
    inGameName: String,
    alliance: String,
    isCastle: Boolean,
    type: String,
    comment: String,
    revisedOn: Date,
    revisedBy: String,
});

let city = new mongoose.Schema({
    x: Number,
    y: Number,
    inGameName: String,
    alliance: String,
    isCastle: Boolean,
    troopType: String,
    comment: String,
    revisions: [
        {
            type: cityRevision,
        },
    ],
});

module.exports = city;
