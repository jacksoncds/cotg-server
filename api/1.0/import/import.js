const Military = require('./military');

class Import {
    constructor(){
        this.db = require('mongoose').connection;
        this.sanitize = require('mongo-sanitize');
    }

    importPlayerMilitary(member, data){
        let military = new Military(data, member);
        return military.save();
    }

    importPlayerCities(){

    }

    importAllianceData(){

    }

    importReport(){

    }

    importImcomingAttacks(){

    }
}

module.exports = Import;