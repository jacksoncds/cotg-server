module.exports = function(){
    var r = require("./api/1.0/attack/attack");

    let x = new r();
    x.getDateByPlayers(["player"]).then(result => {
        console.log(result);
    }).catch(function(err){
        console.log(err);
    });
}