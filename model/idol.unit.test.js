const Idol = require('./idol');

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
        expect(unit.Skill).toStrictEqual([0,1,2,3]);
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
        expect(unit.Skill).toStrictEqual([0]);
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




