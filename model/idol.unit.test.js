const Idol = require('./idol');
const skill_idx = require("./skill_idx");

describe("creation test", ()=>{
    test("create a idol", ()=> {
        var unit = new Idol.Idol({
            idx: 1,
            nickname: "mirai",
            HP: 1,
            ATK: 1,
            SPE: 1,
            DEF: 1,
            SDF: 1,
            SPD: 1,
            Skill: [0, 1, 2, 3]
        });

        expect(unit.nickname).toBe("mirai");
        expect(unit.idx).toBe(1);
        expect(unit.HP).toBe(1);
        expect(unit.ATK).toBe(1);
        expect(unit.SPE).toBe(1);
        expect(unit.DEF).toBe(1);
        expect(unit.SDF).toBe(1);
        expect(unit.SPD).toBe(1);
        expect(unit.SkillList).toStrictEqual([0,1,2,3]);
    });

    test("create a null idol", ()=> {
        var unit = new Idol.Idol();

        expect(unit.nickname).toBe("missingno");
        expect(unit.idx).toBe(0);
        expect(unit.HP).toBe(1);
        expect(unit.ATK).toBe(1);
        expect(unit.SPE).toBe(1);
        expect(unit.DEF).toBe(1);
        expect(unit.SDF).toBe(1);
        expect(unit.SPD).toBe(1);
        expect(unit.SkillList).toStrictEqual([0]);
    });

    test("create a idol by idx", () => {

    });
});

describe("status test", ()=>{
    test("faint test", ()=> {
        var unit = new Idol.Idol({
            idx: 1,
            nickname: "mirai",
            HP: 1,
            ATK: 1,
            SPE: 1,
            DEF: 1,
            SDF: 1,
            SPD: 1,
            Skill: [0, 1, 2, 3]
        });

        expect(Idol.isFaint(unit)).toBe(false);

        unit.HP = 0;

        expect(Idol.isFaint(unit)).toBe(true);
    });
});

describe("action test", ()=> {
    var unit = new Idol.Idol({
        idx: 1,
        nickname: "mirai",
        HP: 1,
        ATK: 1,
        SPE: 1,
        DEF: 1,
        SDF: 1,
        SPD: 1,
        Skill: []
    });
    unit.SkillList.push(skill_idx.getBaseByIdx(0));
    unit.SkillList.push(skill_idx.getBaseByIdx(1));

    test("choose a skill", ()=> {
        var skill = Idol.getAvailableSkill(unit);

        expect(skill).not.toBeUndefined();
    });

    test("cannot choose skill because all skill pp is 0", ()=> {
        unit.SkillList.forEach((skill)=>{
            skill.PP = 0;
        });

        var skill = Idol.getAvailableSkill(unit);
        expect(skill).toBeNull();
    });
});


