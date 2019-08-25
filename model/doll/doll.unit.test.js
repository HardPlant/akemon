const fs = require("fs");
eval(fs.readFileSync("model/doll/doll.js") + "");
eval(fs.readFileSync("model/ability/ability.js") + "");
eval(fs.readFileSync("model/doll/doll_idx.js") + "");
eval(fs.readFileSync("model/stat/stat.js") + "");

describe("creation test", ()=>{
    test("create a idol", ()=> {
        var doll = new Doll({
            idx: 10000,
            nickname: "mirai"
        });
        
        doll.baseStat = mockStatIndex(doll.idx);
        
        expect(doll).not.toBeUndefined();
    });
    test("create a doll by idx", ()=> {
        var doll = getDollByIdx(10000);
        expect(doll).not.toBeUndefined();
        expect(doll.baseStat).not.toBeUndefined();
    });
});

function mockStatIndex(index) {
    var db = {
        1: new BaseStat({
            LV: 50,
            ATK: 100,
            DEF: 100,
            SAT: 100,
            SDF: 100,
            SPD: 100
        }),
    }
    return db[index];
}

// describe("status test", ()=>{
//     test("faint test", ()=> {
//         var unit = new Doll.Doll({
//             idx: 1,
//             nickname: "mirai",
//             HP: 1,
//             ATK: 1,
//             SPE: 1,
//             DEF: 1,
//             SDF: 1,
//             SPD: 1,
//             SkillList: [0, 1, 2, 3]
//         });

//         expect(Doll.isFaint(unit)).toBe(false);

//         unit.HP = 0;

//         expect(Doll.isFaint(unit)).toBe(true);
//     });
//     test("stat test", ()=> {
//         var doll = new Doll.Doll({
//             HP: 10,
//             ATK: 10,
//             SPE: 10,
//             DEF: 10,
//             SDF: 10,
//             SPD: 10,
//         });

//         expect(doll.stats.ATK()).toBe(10);
//         expect(doll.stats.SPE()).toBe(10);
//         expect(doll.stats.DEF()).toBe(10);
//         expect(doll.stats.SDF()).toBe(10);
//         expect(doll.stats.SPD()).toBe(10);

//         doll.statModifier.push({stat:"ATK", type:"mul", val:1.2});
//         expect(doll.stats.ATK()).toBe(12);
//     });
// });

// describe("action test", ()=> {
//     var unit = new Doll.Doll({
//         idx: 1,
//         nickname: "mirai",
//         HP: 1,
//         ATK: 1,
//         SPE: 1,
//         DEF: 1,
//         SDF: 1,
//         SPD: 1,
//         SkillList: []
//     });
//     unit.SkillList.push(skill_idx.getBaseByIdx(0));
//     unit.SkillList.push(skill_idx.getBaseByIdx(1));

//     test("choose a skill", ()=> {
//         var skill = Doll.getAvailableSkill(unit);

//         expect(skill).not.toBeUndefined();
//     });

//     test("cannot choose skill because all skill pp is 0", ()=> {
//         unit.SkillList.forEach((skill)=>{
//             skill.PP = 0;
//         });

//         var skill = Doll.getAvailableSkill(unit);
//         expect(skill).toBeNull();
//     });
// });


