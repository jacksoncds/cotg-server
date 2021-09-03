const mongoose = require(mongoose);


const allianceRankingScore = new mongoose.Schema({
    position: {type: Number, default: 0},
    name: {type: String, default: ""},
    membersCount: {type: Number, default: 0},
    militaryCount: {type: Number, default: 0}
});