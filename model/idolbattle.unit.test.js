const IdolBattle = require("./idolbattle");
const Idol = require("./idol");

describe("init flow", ()=> {
    const battle = new IdolBattle.IdolBattle();
    var priority = [];
    var currentDoll = {}; // Idol.Idol;
    var plan = {
        srcDoll: {},
        destDoll: {},
        skill: {}
    };

    test("Init", () => {
        battle.setPlayer();
        battle.setEnemy();
    });
    
    test("get Doll priority", ()=> {
        priority = IdolBattle.getDollPriorityBySpeed(battle);
    });

    test("is selects target", ()=> {
        currentDoll = priority[0];

        plan = Idol.selectSkillAndTarget(battle, currentDoll);
    });
    
    test("is act applied", ()=> {
        IdolBattle.act(battle, plan);
    });
    
    test("apply status on turn start", ()=> {

    });

    test("apply status on turn end", ()=> {

    });
});
