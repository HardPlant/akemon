const express = require("express");

const Idol = require("../model/idol");
const IdolBattle = require("../model/idolbattle");

function akemonBattleController(app) {
    
    /*
    * GET /start
    * ========
    *
    */

    app.post("/", start);
    function start(req, res) {

        return res.json({
            result: "hello world"
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

function standalone() {
    var app = express();
    
    akemonBattleController(app);

    var server = app.listen(3000, function(){
        console.log("Express server has started on port 3000")
    });
}

module.exports.akemonBattleController = akemonBattleController;

standalone();