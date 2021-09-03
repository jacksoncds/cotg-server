/**
 * Import player data.
 */
class Import {
    /**
     * Constructor.
     */
    constructor() {

    };

    sanitize(data) {
        let s = require('mongo-sanitize');
        return s(data);
    }

    formatData(data) {
        return {
            importDate: new Date(),
            data: JSON.parse(data),
        }
    }

    /**
     * Military import.
     * @param {string} player Player name.
     * @param {object} data Data
     */
    military(player, data) {
        let mongoose = require('mongoose').connection;
        let readyData = this.sanitize(data);
        readyData = this.formatData(readyData);

        mongoose.models.members.update(
            {inGameName: player},
            {
                $push: {military: readyData},
            },
            function(err, result) {
                if (err) {
                    throw err;
                }

                console.log('Updated: ', result);
            }
        );
    }

    city(player, data){

    }

    playerRanking(player, data){

    }

    allianceRanking(player, data){

    }
}

module.exports = Import;
