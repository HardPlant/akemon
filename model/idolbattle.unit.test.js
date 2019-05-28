const IdolBattle = require("./idolbattle");
const Idol = require("./idol");
const Skill = require("./skill");
const skill_idx = require("./skill_idx");

describe("init flow", ()=> {
    const battle = new IdolBattle.IdolBattle();
    var priority = [];
    var currentDoll = {}; // Idol.Idol;
    var plan = {
        srcDoll: {},
        destDoll: {},
        skill: {}
    };
    
    var playerIdol1 = new Idol.Idol();
    playerIdol1.HP = 10;
    playerIdol1.SPD = 1;
    playerIdol1.Skill = [skill_idx.getBaseByIdx(0)];

    var enemyIdol1 = new Idol.Idol();
    enemyIdol1.HP = 10;
    enemyIdol1.SPD = 2;
    enemyIdol1.Skill = [skill_idx.getBaseByIdx(1)];

    test("Init", () => {
        var playerSet = [playerIdol1];
        var enemySet = [enemyIdol1];

        battle.setPlayer(playerSet);
        battle.setEnemy(enemySet);

        expect(battle.dolls).toContain(playerIdol1);
        expect(battle.dolls).toContain(enemyIdol1);
    });
    
    test("get Doll priority", ()=> {
        priority = IdolBattle.getDollPriorityBySpeed(battle);

        expect(priority[0]).toBe(enemyIdol1);
        expect(priority[1]).toBe(playerIdol1);
    });

    test("is act applied", ()=> {
        priority.forEach((doll)=> {
            var skillList = Idol.getAvailableSkill(doll);
            var skill = IdolBattle.selectAvailableSkill(skillList);

            expect(skill.effects).not.toBeUndefined();

            var target = IdolBattle.selectTargetForDoll(battle, doll);

            Skill.apply(skill,doll,target);
        });
    });
    
    test("apply status on turn start", ()=> {

    });

    test("apply status on turn end", ()=> {

    });
});
