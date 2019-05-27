const idol = require('./idol');

test("create a idol", ()=> {
    var idol = new idol.Idol({
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

    expect(idol.name).toBe("mirai");
    expect(idol.idx).toBe(1);
    expect(idol.HP).toBe(1);
    expect(idol.ATK).toBe(1);
    expect(idol.SPE).toBe(1);
    expect(idol.DEF).toBe(1);
    expect(idol.SDF).toBe(1);
    expect(idol.SPD).toBe(1);
    expect(idol.Skill).toBe(0,1,2,3);
});

test("create a null idol", ()=> {
    var idol = new idol.Idol();

    expect(idol.name).toBe("missingno");
    expect(idol.idx).toBe(0);
    expect(idol.HP).toBe(1);
    expect(idol.ATK).toBe(1);
    expect(idol.SPE).toBe(1);
    expect(idol.DEF).toBe(1);
    expect(idol.SDF).toBe(1);
    expect(idol.SPD).toBe(1);
    expect(idol.Skill).toBe(0);
});