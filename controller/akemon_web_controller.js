const express = require("express");

const IdolBattle = require("../model/idolbattle");
const idol_idx = require("../model/idol_idx");

function akemonBattleController(app) {
    
    /*
    * GET /start
    * ========
    *
    */
    var idolbattle;
    var enemyPlan;
    var isPlayerActed;
    var isEnemyActed;

    app.post("/start", start);
    function start(req, res) {
        idolbattle = new IdolBattle.IdolBattle();

        var idols = {};
        createIdols(idols);

        var mockPlayerGrp = [
            {
                name: "미사키",
                sprite: "",
                dolls: []
            }
        ];
        var mockEnemyGrp = [
            {
                name: "코토리",
                sprite: "",
                dolls: []
            }
        ];
        req.body.player.forEach((item)=>{
            mockPlayerGrp[0].dolls.push(idol_idx.getBaseByIdx(item));
        });
        req.body.enemy.forEach((item)=>{
            mockEnemyGrp[0].dolls.push(idol_idx.getBaseByIdx(item));
        });

        var player = mockPlayerGrp[0];
        var enemy = mockEnemyGrp[0];

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
        var priority = [];
        
        idolbattle.priority.forEach(function(item) {
            priority.push(item.toJson());
        });

        var playerFainted = idolbattle.playerSet.filter((item)=>{
            return item.HP < 0
        }).length != 0;

        var enemyFainted = idolbattle.enemySet.filter((item)=>{
            return item.HP < 0
        }).length != 0;

        console.log(playerFainted)
        console.log(enemyFainted)

        return res.json({
            result: {
                priority: priority,
                isPlayerNeededExchange: playerFainted,
                isEnemyNeededExchange: enemyFainted
            }
        });
    };

    app.post("/enemyPlan", setEnemyPlan);
    function setEnemyPlan(req, res) {
        if (!isEnemyActed) {
            enemyPlan = req.body.enemyPlan;
            isEnemyActed = true;
        }
        if (isEnemyActed && isPlayerActed) {
            isPlayerActed = false;
            isEnemyActed = false;
            IdolBattle.progress(idolbattle, playerPlan, enemyPlan);
        }
        
        res.json({
            result: enemyPlan
        });
    }

    app.post("/playerPlan", setPlayerPlan);
    function setPlayerPlan(req, res) {
        if (!isPlayerActed) {
            playerPlan = req.body.playerPlan;
            isPlayerActed = true;
        }

        if (isEnemyActed && isPlayerActed) {
            isPlayerActed = false;
            isEnemyActed = false;
            IdolBattle.progress(idolbattle, playerPlan, enemyPlan);
        }

        res.json({
            result: playerPlan
        });
    }

    app.post("/exchange", exchange);
    function exchange(req, res){
        var srcDoll = res.body.srcDoll;
        var destDoll = res.body.destDoll;

        var dolls = [];

        idolbattle.dolls.forEach(function(item) {
            dolls.push(item.toJson());
        });

        IdolBattle.exchange(idolbattle, srcDoll, destDoll);

        return res.json({
            result: true,
            dolls: dolls,
            srcDoll: srcDoll,
            destDoll: destDoll
        })
    }

    app.get("/gameover");

    app.get("/playerSet", (req, res)=> {
        var playerSet = [];
        idolbattle.playerSet.forEach((item)=>{
            playerSet.push(item.toJson());
        });
        res.json({
            playerSet: playerSet
        });
    });
    
    app.get("/enemySet", (req, res)=> {
        var enemySet = [];
        idolbattle.enemySet.forEach((item)=>{
            enemySet.push(item.toJson());
        });
        res.json({
            enemySet: enemySet
        });
    });


    app.get("/idol/:id", getIdol);
    function getIdol(req, res) {
        var idol = idol_idx.getBaseByIdx(req.params.id);

        return res.json(idol);
    }
}

function createIdols(idols) {
        idols.mirai = idol_idx.getBaseByIdx(10000);
        idols.sizuka = idol_idx.getBaseByIdx(10001);
        idols.tsubasa = idol_idx.getBaseByIdx(10002);
        idols.kotoha = idol_idx.getBaseByIdx(10003);
        idols.megumi = idol_idx.getBaseByIdx(10004);
        idols.elena = idol_idx.getBaseByIdx(10005);
}

module.exports.akemonBattleController = akemonBattleController;

function standalone() {
    var app = express();
    app.use(express.json());
    
    akemonBattleController(app);

    var server = app.listen(3000, function(){
        console.log("Express server has started on port 3000")
    });
}

standalone();