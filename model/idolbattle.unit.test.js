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
    playerIdol1.SkillList = [skill_idx.getBaseByIdx(0)];

    var enemyIdol1 = new Idol.Idol();
    enemyIdol1.HP = 30;
    enemyIdol1.SPD = 2;
    enemyIdol1.SkillList = [skill_idx.getBaseByIdx(1)];

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

    test("turn progress with plan", ()=> {
        IdolBattle.progress(battle, {
            0: {
                srcDoll: 0,
                skillIdx: 0
            },
            1: {
                srcDoll: 0,
                skillIdx: 0
            }
        }, {
            0: {
                srcDoll: 1,
                skillIdx: 0
            },
            1: {
                srcDoll: 1,
                skillIdx: 0
            }
        });

        expect(IdolBattle.isGameEnded(battle)).toBe(false);
        expect(IdolBattle.isPlayerWon(battle)).toBe(false);

        expect(Idol.isFaint(enemyIdol1)).toBe(true);
        expect(Idol.isFaint(playerIdol2)).toBe(true);
    });
    
    test("apply status on turn start", ()=> {

    });

    test("apply status on turn end", ()=> {

    });
});

describe("tab battle", ()=> {
    var playerIdol1 = new Idol.Idol();
    playerIdol1.HP = 30;
    playerIdol1.SPD = 1;
    playerIdol1.SkillList = [skill_idx.getBaseByIdx(0)];

    var playerIdol2 = new Idol.Idol();
    playerIdol2.HP = 30;
    playerIdol2.SPD = 3;
    playerIdol2.SkillList = [skill_idx.getBaseByIdx(0)];

    var enemyIdol1 = new Idol.Idol();
    enemyIdol1.HP = 30;
    enemyIdol1.SPD = 2;
    enemyIdol1.SkillList = [skill_idx.getBaseByIdx(1)];

    var enemyIdol2 = new Idol.Idol();
    enemyIdol2.HP = 30;
    enemyIdol2.SPD = 4;
    enemyIdol2.SkillList = [skill_idx.getBaseByIdx(1)];

    const battle = new IdolBattle.IdolBattle();
    var priority = [];
    var currentDoll = {}; // Idol.Idol;
    var plan = {
        srcDoll: {},
        destDoll: {},
        skill: {}
    };

    test("Init", () => {
        var playerSet = [playerIdol1, playerIdol2];
        var enemySet = [enemyIdol1, enemyIdol2];

        battle.setPlayer(playerSet);
        battle.setEnemy(enemySet);

        expect(battle.dolls).toContain(playerIdol1);
        expect(battle.dolls).toContain(enemyIdol1);
    });

    test("get Doll priority", ()=> {
        priority = IdolBattle.getDollPriorityBySpeed(battle);
        battle.priority = priority;

        expect(priority[0]).toBe(enemyIdol2);
        expect(priority[1]).toBe(playerIdol2);
        expect(priority[2]).toBe(enemyIdol1);
        expect(priority[3]).toBe(playerIdol1);
    });

});