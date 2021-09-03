const mongoose = require("mongoose");

class Attack {
    constructor(){
        
    }

    getData(){
        return new Promise(function(resolve, reject){
            let query = mongoose.models.members.find({}, '_id military', function(err, results){
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    }

    getDateByPlayers(players){
        return new Promise(function(resolve, reject){
            let query = mongoose.models.members.find({inGameName: {$in : players}}, '_id military', function(err, results){
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    }

    calculateTroopStrenth(data, minimumTs){
        let result = {
            artillery: 0,
            infantry: 0,
            cavalary: 0,
            magin: 0,
            warship: 0
        }

        data.forEach(player => {
            
        });
    }

    getPlayers(){

    }

    getTargets(){
        
    }

    // Crate attack order ready for input
    createAttackOrders(){

    }

    // Create mail orders
    createMailOrders(){

    }

    //Get max number of reals to fufill min attack offense.
    getMaxReals(){

    }

    // Get max ts available to fufill all reals.
    getMaxTs(){

    }
}

module.exports = Attack;