const mongoose = require(mongoose);

const allianceRankingScore = new mongoose.Schema({
    position: {type: Number, default: 0},
    name: {type: String, default: ""},
    score: {type: Number, default: 0}
});