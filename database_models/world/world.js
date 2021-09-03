const mongoose = require("mongoose");

let world = mongoose.Schema({
    allianceBlessing: [],
    agenda: [],
    rankScore: [],
    rankReputation:[],
    rankMilitary: [],
    timezone: String,
    start: Date
});

module.exports = world;