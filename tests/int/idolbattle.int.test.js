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
        mockPlayerGrp[0].dolls.push(idols.mirai);
        mockPlayerGrp[0].dolls.push(idols.sizuka);
        mockPlayerGrp[0].dolls.push(idols.tsubasa);

        mockEnemyGrp[0].dolls.push(idols.kotoha);
        mockEnemyGrp[0].dolls.push(idols.elena);
        mockEnemyGrp[0].dolls.push(idols.megumi);

        console.log(`${mockEnemyGrp[0].name}가 승부를 걸어왔다!`);
        idolbattle = new IdolBattle.IdolBattle();
        idolbattle.setPlayer(dolls);
        idolbattle.setEnemy(mockEnemyGrp[0].dolls);

        expect(idolbattle.playerSet.length).toBe(3);
        expect(idolbattle.enemySet.length).toBe(3);

    });

});

