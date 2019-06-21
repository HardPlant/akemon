const express = require("express");

const Idol = require("../model/idol");
const Skill = require("../model/skill");
const IdolBattle = require("../model/idolbattle");
const skill_idx = require("../model/skill_idx");

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

    app.post("/", start);
    function start(req, res) {
        var playerIndexList = req.body.player;
        var enemyIndexList = req.bdy.enemy;
        
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
        
        var player = mockPlayerGrp[0];
        player.dolls.push(idols.mirai);
        player.dolls.push(idols.sizuka);
        player.dolls.push(idols.tsubasa);
        var enemy = mockEnemyGrp[0];
        enemy.dolls.push(idols.kotoha);
        enemy.dolls.push(idols.elena);
        enemy.dolls.push(idols.megumi);
    

        // var player = req.body.player;
        // var enemy = req.body.enemy;

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
}

function createIdols(idols) {
    idols.mirai = new Idol.Idol({
        nickname: "Mirai",
        LV: 5,
        HP: 30,
        ATK: 15,
        SPE: 20,
        DEF: 10,
        SDF: 15,
        SPD: 15,
        SkillList: []
    });
    idols.sizuka = new Idol.Idol({
        nickname: "sizuka",
        LV: 5,
        HP: 20,
        ATK: 10,
        SPE: 35,
        DEF: 15,
        SDF: 20,
        SPD: 10,
        SkillList: []
    });
    idols.tsubasa = new Idol.Idol({
        nickname: "tsubasa",
        LV: 5,
        HP: 25,
        ATK: 25,
        SPE: 4,
        DEF: 15,
        SDF: 10,
        SPD: 21,
        SkillList: []
    });
    idols.kotoha = new Idol.Idol({
        nickname: "kotoha",
        LV: 5,
        HP: 20,
        ATK: 5,
        SPE: 30,
        DEF: 15,
        SDF: 10,
        SPD: 15,
        SkillList: []
    });
    idols.megumi = new Idol.Idol({
        nickname: "megumi",
        LV: 5,
        HP: 20,
        ATK: 25,
        SPE: 25,
        DEF: 15,
        SDF: 15,
        SPD: 20,
        SkillList: []
    });
    idols.elena = new Idol.Idol({
        nickname: "elena",
        LV: 5,
        HP: 35,
        ATK: 10,
        SPE: 5,
        DEF: 25,
        SDF: 35,
        SPD: 20,
        SkillList: []
    });
    idols.mirai.SkillList.push(skill_idx.getBaseByIdx(2));
    idols.kotoha.SkillList.push(skill_idx.getBaseByIdx(2));
    idols.megumi.SkillList.push(skill_idx.getBaseByIdx(3));
    idols.tsubasa.SkillList.push(skill_idx.getBaseByIdx(3));
    idols.elena.SkillList.push(skill_idx.getBaseByIdx(3));
    idols.elena.SkillList.push(skill_idx.getBaseByIdx(4));
    idols.sizuka.SkillList.push(skill_idx.getBaseByIdx(2));
    idols.sizuka.SkillList.push(skill_idx.getBaseByIdx(5));
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