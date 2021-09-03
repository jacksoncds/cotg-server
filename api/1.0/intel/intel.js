const util = require('./../util');
const validate = require('validator');

/**
 * Intel class.
 */
class Intel {
    /**
     * Constructor
     * @param {*} user user.
     */
    constructor(user) {
        this.user = user;
        this.db = require('mongoose').connection;
    }

    /**
     * Escape city object.
     * @param {Object} city city data.
     * @return {Object} escaped city data.
     */
    escapeCity(city) {
        let data = {
            x: 0,
            y: 0,
            inGameName: validate.escape(city.inGameName),
            isCastle: false,
            troopType: validate.escape(city.troopType),
            comment: validate.escape(city.comment),
        };

        if (validate.isNumeric(city.x)) {
            data.x = city.x;
        } else {
            throw new Error('City X coord must be a number.');
        }

        if (validate.isNumeric(city.y)) {
            data.y = city.y;
        } else {
            throw new Error('City Y coord must be a number.');
        }

        if (validate.isBoolean(city.isCastle)) {
            data.isCastle = city.isCastle;
        } else {
            throw new Error('City castle must be true or false.');
        }

        return data;
    }

    /**
     * Escape player object.
     * @param {Object} player player data.
     * @return {Object} escaped player data.
     */
    escapePlayer(player) {
        return {
            inGameName: validate.escape(player.inGameName),
            alliance: validate.escape(player.alliance),
            timezone: validate.escape(player.timezone),
            substitute: validate.escape(player.substitute),
            substituteTimeZone: validate.escape(player.substituteTimeZone),
            playStyle: validate.escape(player.playStyle),
            comment: validate.escape(city.comment),
        };
    }

    /**
     * Get players
     * @return {Promise} promise.
     */
    getPlayers() {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.models.playerIntel.find((err, players) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(players);
                }
            });
        });
    }

    /**
     * Get cities intel.
     * @return {Promise} promise.
     */
    getCities() {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.models.cityIntel.find((err, cities) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(cities);
                }
            });
        });
    }

    updatePlayer(player){
        let self = this;
        return new Promise(function(resolve, reject){

            self.db.models.playerIntel.findOne({_id: player._id}, {}, function(err, revision){
                if (err) {
                    reject(err);
                }

                let q = self.db.models.playerIntel.where({_id: player._id});
                q.update({
                    inGameName: player.inGameName,
                    alliance: player.alliance,
                    timezone: player.timezone,
                    substitute: player.substitute,
                    substituteTimeZone: player.substituteTimeZone,
                    playStyle: player.playStyle,
                    comment: player.comment,
                    $push: {
                        revisions: {
                            inGameName: revision.inGameName,
                            alliance: revision.alliance,
                            timezone: revision.timezone,
                            substitute: revision.substitute,
                            substituteTimeZone: revision.substituteTimeZone,
                            playStyle: revision.playStyle,
                            comment: revision.comment,
                            revisedOn: Date.now(),
                            revisedBy: "player"
                        }
                    }
                });

                q.exec(function(err, records){
                    if (err) {
                        reject(err);
                    }
    
                    resolve(records);
                 });
            });
        });
    }

    /**
     * Update city intel.
     * @param {*} city city.
     * @return {Promise} promise.
     */
    updateCity(city) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.models.cityIntel.findOne({_id: city._id}, {}, function(err, revision){
                if (err) {
                    reject(err);
                }

                let q = self.db.models.cityIntel.where({_id: city._id});
                q.update({
                    inGameName: city.inGameName,
                    alliance: city.alliance,
                    timezone: city.timezone,
                    substitute: city.substitute,
                    substituteTimeZone: city.substituteTimeZone,
                    playStyle: city.playStyle,
                    comment: city.comment,
                    $push: {
                        revisions: {
                            inGameName: revision.inGameName,
                            alliance: revision.alliance,
                            timezone: revision.timezone,
                            substitute: revision.substitute,
                            substituteTimeZone: revision.substituteTimeZone,
                            playStyle: revision.playStyle,
                            comment: revision.comment,
                            revisedOn: Date.now(),
                            revisedBy: "player"
                        }
                    }
                });

                q.exec(function(err, records){
                    if (err) {
                        reject(err);
                    }
    
                    resolve(records);
                 });
            });
        });
    }

    /**
     * Create player intel.
     * @param {*} player player intel to create.
     * @return {Promise} promise.
     */
    createPlayer(player) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.models.playerIntel.create(player, (err, player) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(player);
                }
            });
        });
    }

    /**
     * Create city intel.
     * @param {*} city city intel to create.
     * @return {Promise} promise.
     */
    createCity(city) {
        return new Promise((resolve, reject) => {
            let data = this.escapeCity(city);
            this.db.models.cityIntel.create(data, (err, city) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(city);
                }
            });
        });
    }
}

module.exports = Intel;
