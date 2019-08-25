it("fight", function() {

});
// const Idol = require("./idol");
// const Skill = require("./skill");
// const IdolBattle = require("./battle");
// const skill_idx = require("./skill_idx");

// describe("init flow", ()=> {
//     const battle = new IdolBattle.IdolBattle();
//     var priority = [];
//     var currentDoll = {}; // Idol.Idol;
//     var plan = {
//         srcDoll: {},
//         destDoll: {},
//         skill: {}
//     };
    
//     var playerIdol1 = new Idol.Idol();
//     playerIdol1.HP = 30;
//     playerIdol1.SPD = 1;
//     playerIdol1.SkillList = [skill_idx.getBaseByIdx(0)];

//     var enemyIdol1 = new Idol.Idol();
//     enemyIdol1.HP = 30;
//     enemyIdol1.SPD = 2;
//     enemyIdol1.SkillList = [skill_idx.getBaseByIdx(1)];

//     playerIdol1.LV = 100;
//     enemyIdol1.LV = 100;

//     test("Init", () => {
//         var playerSet = [playerIdol1];
//         var enemySet = [enemyIdol1];

//         battle.setPlayer(playerSet);
//         battle.setEnemy(enemySet);

//         expect(battle.dolls).toContain(playerIdol1);
//         expect(battle.dolls).toContain(enemyIdol1);
//     });
    
//     test("get Doll priority", ()=> {
//         priority = IdolBattle.getDollPriorityBySpeed(battle);
//         battle.priority = priority;

//         expect(priority[0]).toBe(enemyIdol1);
//         expect(priority[1]).toBe(playerIdol1);
//     });

//     test("turn progress", ()=> {
//         IdolBattle.progress(battle);

//         expect(IdolBattle.isGameEnded(battle)).toBe(false);
//         expect(IdolBattle.isPlayerWon(battle)).toBe(false);

//         IdolBattle.progress(battle);

//         expect(IdolBattle.isGameEnded(battle)).toBe(true);
//         expect(IdolBattle.isPlayerWon(battle)).toBe(false);
//     });
    
//     test("apply status on turn start", ()=> {

//     });

//     test("apply status on turn end", ()=> {

//     });
// });
// describe("init flow", ()=> {
//     const battle = new IdolBattle.IdolBattle();
//     var priority = [];
//     var currentDoll = {}; // Idol.Idol;
//     var plan = {
//         srcDoll: {},
//         destDoll: {},
//         skill: {}
//     };
    
//     var playerIdol1 = new Idol.Idol();
//     playerIdol1.HP = 1;
//     playerIdol1.SPD = 1;
//     playerIdol1.SkillList = [skill_idx.getBaseByIdx(4)];

//     var enemyIdol1 = new Idol.Idol();
//     enemyIdol1.HP = 1;
//     enemyIdol1.SPD = 2;
//     enemyIdol1.SkillList = [skill_idx.getBaseByIdx(1)];

//     playerIdol1.LV = 100;
//     enemyIdol1.LV = 100;

//     test("Init", () => {
//         var playerSet = [playerIdol1];
//         var enemySet = [enemyIdol1];

//         battle.setPlayer(playerSet);
//         battle.setEnemy(enemySet);

//         expect(battle.dolls).toContain(playerIdol1);
//         expect(battle.dolls).toContain(enemyIdol1);
//     });
    
//     test("get Doll priority", ()=> {
//         priority = IdolBattle.getDollPriorityBySpeed(battle);
//         battle.priority = priority;

//         expect(priority[0]).toBe(enemyIdol1);
//         expect(priority[1]).toBe(playerIdol1);
//     });
//     test("get priority by plan", ()=> {
//         priority = IdolBattle.getDollPriorityBySpeed(battle);
//         battle.priority = priority;
//         expect(priority[0]).toBe(enemyIdol1);
//         expect(priority[1]).toBe(playerIdol1);

//         var playerPlan = {
//             0: {
//                 targetDoll: 0,
//                 skillIdx: 0
//             }
//         };
//         var enemyPlan = {
//             0: {
//                 targetDoll: 0,
//                 skillIdx: 0
//             }
//         };
//         battle.priority = IdolBattle.getPriorityBySkill(battle, playerPlan, enemyPlan);

//         expect(priority[0]).toBe(playerIdol1);
//         expect(priority[1]).toBe(enemyIdol1);

//         IdolBattle.progress(battle, playerPlan, enemyPlan);
//         expect(Idol.isFaint(playerIdol1)).toBe(false);
//         expect(Idol.isFaint(enemyIdol1)).toBe(true);
//     });
// });

// describe("tag battle", ()=> {
//     var playerIdol1 = new Idol.Idol();
//     playerIdol1.HP = 30;
//     playerIdol1.SPD = 1;
//     playerIdol1.SkillList = [skill_idx.getBaseByIdx(0)];

//     var playerIdol2 = new Idol.Idol();
//     playerIdol2.HP = 30;
//     playerIdol2.SPD = 3;
//     playerIdol2.SkillList = [skill_idx.getBaseByIdx(0)];

//     var enemyIdol1 = new Idol.Idol();
//     enemyIdol1.HP = 30;
//     enemyIdol1.SPD = 2;
//     enemyIdol1.SkillList = [skill_idx.getBaseByIdx(1)];

//     var enemyIdol2 = new Idol.Idol();
//     enemyIdol2.HP = 30;
//     enemyIdol2.SPD = 4;
//     enemyIdol2.SkillList = [skill_idx.getBaseByIdx(1)];

//     playerIdol1.LV = 100;
//     enemyIdol1.LV = 100;
//     playerIdol2.LV = 100;
//     enemyIdol2.LV = 100;

//     const battle = new IdolBattle.IdolBattle();
//     var priority = [];
//     var currentDoll = {}; // Idol.Idol;
//     var plan = {
//         srcDoll: {},
//         destDoll: {},
//         skill: {}
//     };

//     test("Init", () => {
//         var playerSet = [playerIdol1, playerIdol2];
//         var enemySet = [enemyIdol1, enemyIdol2];

//         battle.setPlayer(playerSet);
//         battle.setEnemy(enemySet);

//         expect(battle.dolls).toContain(playerIdol1);
//         expect(battle.dolls).toContain(enemyIdol1);
//     });

//     test("get Doll priority", ()=> {
//         priority = IdolBattle.getDollPriorityBySpeed(battle);
//         battle.priority = priority;

//         expect(priority[0]).toBe(enemyIdol2);
//         expect(priority[1]).toBe(playerIdol2);
//         expect(priority[2]).toBe(enemyIdol1);
//         expect(priority[3]).toBe(playerIdol1);
//     });
    
//     test("turn progress with plan", ()=> {
//         // it will be enemy2 -> player 2->
//         // enemy1 (player2 faint) -> player1 (enemy1 faint)
//         expect(battle.priority.length).toBe(4);
        
//         IdolBattle.progress(battle, {
//             0: {
//                 targetDoll: 0,
//                 skillIdx: 0
//             },
//             1: {
//                 targetDoll: 0,
//                 skillIdx: 0
//             }
//         }, {
//             0: {
//                 targetDoll: 1,
//                 skillIdx: 0
//             },
//             1: {
//                 targetDoll: 1,
//                 skillIdx: 0
//             }
//         });

//         expect(IdolBattle.isGameEnded(battle)).toBe(false);
//         expect(IdolBattle.isPlayerWon(battle)).toBe(false);

//         expect(Idol.isFaint(playerIdol2)).toBe(true);
//         expect(Idol.isFaint(enemyIdol1)).toBe(true);
//     });
// });

// describe("after progress", ()=> {
//     it("poison deals 1/16 damage", ()=>{
//         fail();
//     });
// });