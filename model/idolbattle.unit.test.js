const IdolBattle = require("./idolbattle");
const Idol = require("./idol");
const Skill = require("./skill");

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
    var enemyIdol1 = new Idol.Idol();
    enemyIdol1.HP = 10;
    enemyIdol1.SPD = 2;

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
            var skill = Idol.getAvailableSkill(doll);
            var target = IdolBattle.selectTargetForDoll(battle, doll);

            Skill.apply(skill,doll,target);
        });
    });
    
    test("apply status on turn start", ()=> {

    });

    test("apply status on turn end", ()=> {

    });
});
