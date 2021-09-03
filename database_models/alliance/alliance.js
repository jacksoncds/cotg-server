const mongoose = require("mongoose");

let alliance = mongoose.Schema({
    name: String,
    abbreviation: String,
    rank: Number,
    numberOfMembers: Number,
    score: Number,
    reputationRank: Number,
    highestMemberTitle: String,
    rankPlayerMilitary: [],
    agenda: [],
    rankPlayerOffense: [],
    rankPlayerDefense:[],
    rankPlayerScore: [],
    combatReputarion: [],
    combatOffensive: [],
    combatDefensive: [],
    unitKills: [],
    plundered: [],
    raidingCavern: [],
    radingBoss: [],
    playerTemples: []
});

module.exports = alliance;