const express = require("express");

const Idol = require("../model/idol");
const IdolBattle = require("../model/idolbattle");

function akemonBattleController(app) {
    
    /*
    * GET /start
    * ========
    *
    */
    var idolbattle;

    app.post("/", start);
    function start(req, res) {

        idolbattle = new IdolBattle.IdolBattle();
        idolbattle.startBattle(player, enemy, 1);
        idolbattle.randomness = false;

        return res.json({
            result: idolbattle
        });
    };

    /*
    *
    *
    *
    */
    app.post("/progress", progress);
    function progress(req, res) {
        var result = {};

        res.json(result);
    };
}


module.exports.akemonBattleController = akemonBattleController;

function standalone() {
    var app = express();
    
    akemonBattleController(app);

    var server = app.listen(3000, function(){
        console.log("Express server has started on port 3000")
    });
}

standalone();