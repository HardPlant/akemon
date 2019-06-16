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
        idolbattle.randomness = false;

        expect(idolbattle.playerSet.length).toBe(1);
        expect(idolbattle.enemySet.length).toBe(1);
        
        console.log(`코토리는 ${idolbattle.enemySet[0].nickname}를 꺼냈다`);
        expect(idolbattle.enemySet[0]).toBe(idols.kotoha);

        console.log(`가랏, ${idolbattle.playerSet[0].nickname}!`);
        expect(idolbattle.playerSet[0]).toBe(idols.mirai);

        var playerPlan = {
            0: {
                targetDoll: 0,
                skillIdx: 0
            }
        };
        var enemyPlan = {
            0: {
                targetDoll: 0,
                skillIdx: 0
            }
        };

        IdolBattle.progress(idolbattle, playerPlan, enemyPlan);
        expect(idolbattle.priority.length).toBe(2);

        console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);
        console.log(`${idolbattle.priority[1].nickname}의 ${idolbattle.priority[1].SkillList[0].name}!`);

        expect(idols.mirai.HP).not.toBe(30);
        expect(idols.kotoha.HP).not.toBe(20);

        expect(idols.mirai.HP).toBe(13.75);
        expect(idols.kotoha.HP).toBe(8.75);

        IdolBattle.progress(idolbattle, playerPlan, enemyPlan);

        console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);

        expect(idols.mirai.HP).toBe(13.75);
        expect(idols.kotoha.HP).toBeLessThan(0);
        
        expect(Idol.isFaint(idols.kotoha)).toBe(true);
        console.log(`${idolbattle.enemySet[0].nickname}은 쓰러졌다!`);

        expect(IdolBattle.isGameEnded(idolbattle)).toBe(false);
        expect(IdolBattle.isPlayerWon(idolbattle)).toBe(false);

        IdolBattle.exchange(idolbattle, idols.kotoha, idols.megumi);

        expect(idolbattle.enemySet[0]).not.toBe(idols.kotoha);
        expect(idolbattle.enemySet[0]).toBe(idols.megumi);

        console.log(`상대는 ${idolbattle.enemySet[0].nickname}을 꺼냈다`);

        IdolBattle.progress(idolbattle, playerPlan, enemyPlan);

        expect(idolbattle.priority[0]).toBe(idols.megumi);
        expect(idolbattle.priority[1]).toBe(idols.mirai);
        
        console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);
        console.log(`${idolbattle.priority[1].nickname}은 쓰러졌다!`);

        expect(idols.megumi.HP).toBe(idols.megumi.baseHP);
        expect(Idol.isFaint(idols.mirai)).toBe(true);

        IdolBattle.exchange(idolbattle, idols.mirai, idols.tsubasa);
        console.log(`가랏, ${idolbattle.playerSet[0].nickname}!`);
        
        expect(idolbattle.playerSet.length).toBe(1);

        IdolBattle.progress(idolbattle, playerPlan, enemyPlan);

        expect(idolbattle.priority[0]).toBe(idols.tsubasa);
        expect(idolbattle.priority[1]).toBe(idols.megumi);

        expect(idols.tsubasa.HP).not.toBe(idols.tsubasa.baseHP);
        expect(idols.megumi.HP).not.toBe(idols.megumi.baseHP);
        
        console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);
        console.log(`${idolbattle.priority[1].nickname}의 ${idolbattle.priority[1].SkillList[0].name}!`);

        expect(idols.tsubasa.HP).toBe(14.1875);
        expect(idols.megumi.HP).toBe(8.75);

        expect(IdolBattle.isGameEnded(idolbattle)).toBe(false);
        expect(IdolBattle.isPlayerWon(idolbattle)).toBe(false);

        IdolBattle.progress(idolbattle, playerPlan, enemyPlan);

        expect(idols.tsubasa.HP).toBe(14.1875);
        expect(idols.megumi.HP).not.toBe(8.75);

        expect(Idol.isFaint(idols.megumi)).toBe(true);

        console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);
        console.log(`${idolbattle.priority[1].nickname}은 쓰러졌다!`);

        IdolBattle.exchange(idolbattle, idols.kotoha, idols.megumi);

        expect(idolbattle.enemySet[0]).not.toBe(idols.kotoha);
        expect(idolbattle.enemySet[0]).toBe(idols.megumi);

        console.log(`상대는 ${idolbattle.enemySet[0].nickname}을 꺼냈다`);

    });

});

