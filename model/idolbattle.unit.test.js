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
    playerIdol1.HP = 30;
    playerIdol1.SPD = 1;
    playerIdol1.Skill = [skill_idx.getBaseByIdx(0)];

    var enemyIdol1 = new Idol.Idol();
    enemyIdol1.HP = 30;
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
        battle.priority = priority;

        expect(priority[0]).toBe(enemyIdol1);
        expect(priority[1]).toBe(playerIdol1);
    });

    test("turn progress, on not game overed", ()=> {
        IdolBattle.progress(battle);

        expect(IdolBattle.isGameEnded(battle)).toBe(false);
    });
    
    test("apply status on turn start", ()=> {

    });

    test("apply status on turn end", ()=> {

    });
});
