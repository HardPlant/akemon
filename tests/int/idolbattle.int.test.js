const Idol = require("../../model/idol");
const Skill = require("../../model/skill");
const IdolBattle = require("../../model/idolbattle");
const skill_idx = require("../../model/skill_idx");

describe("interactive 1:1, one on one battle", ()=> {
    var idols = {};
    var idolbattle;

    function createIdols(idols) {
        idols.mirai = new Idol.Idol({
            nickname: "Mirai",
            LV: 5,
            HP: 30,
            ATK: 15,
            SPE: 15,
            DEF: 15,
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
            SPE: 5,
            DEF: 15,
            SDF: 10,
            SPD: 20,
            SkillList: []
        });
        idols.kotoha = new Idol.Idol({
            nickname: "kotoha",
            LV: 5,
            HP: 20,
            ATK: 5,
            SPE: 35,
            DEF: 5,
            SDF: 15,
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
    }

    test("import test", ()=> {
        var idol = new Idol.Idol();
        var skill = new Skill.Skill();
        var idolbattle = new IdolBattle.IdolBattle();
        var skill_0 = skill_idx.getBaseByIdx(0);
        createIdols(idols);

    });  

    test("idol team appears", ()=> {
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

        console.log(`${enemy.name}가 승부를 걸어왔다!`);
        idolbattle = new IdolBattle.IdolBattle();
        idolbattle.startBattle(player, enemy, 1);

        expect(idolbattle.playerSet.length).toBe(3);
        expect(idolbattle.enemySet.length).toBe(3);

    });

});

