const RouteUtility = require('./../RouteUtility');
const mongoose = require('mongoose');

/**
 * Class Agenda.
 */
class Agenda extends RouteUtility {
    /**
     * Constructor.
     */
    constructor() {
        super(mongoose.connection);
        this.db = mongoose.connection;
        this.sanitize = require('mongo-sanitize');
    }

    /**
     * Add new agenda event to member.
     * @param {object} agenda agenda object.
     * @param {obejctId} userId userId from database.
     * @return {Promise} promise.
     */
    add(agenda, user) {
        return new Promise((resolve, reject) => {
            this.db.models.members.update(
                {provider: user.provider, providerId: user.id},
                {$push: {
                    agenda: agenda,
                }},
                (err, agenda) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(agenda);
                    }
                }
            );
        });
    }

    /**
     * Get all agenda events for this member.
     * @param {objectId} userId userId from database.
     * @return {Promise} promise.
     */
    get(user) {
        return new Promise((resolve, reject) => {
            this.db.models.members.find(
                {provider: user.provider, providerId: user.id},
                'agenda',
                (err, agenda) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(agenda);
                }
            });
        });
    }

    complete(userId, agendaId){

    }

    update(userId, agendaId){

    }

    delete(userId, agendaId){
        
    }
}

module.exports = Agenda;
