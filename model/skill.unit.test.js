const Idol = require('./idol');
const Skill = require("./skill");
const skill_idx = require("./skill_idx");

jest.mock("skill_idx");

describe("creation test", ()=> {
    test("init", ()=> {
        var skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.Type.Physical, 120));
    });
    test("init from idx", ()=> {
        var skill = skill_idx.getBaseByIdx(0);

        expect(skill).not.toBeUndefined();
        expect(skill.name).not.toBeUndefined();
        expect(skill.name).toBe("0번 스킬");
    });
})

describe("interact with self", ()=> {
    var destIdol = Idol.Idol();
    destIdol.HP = 10;

    test("deal damage to self", ()=> {
        var skill = new Skill.Skill();

        skill.effects.push(new Skill.effect.Damage(Skill.Type.Physical,120));

        Skill.apply(skill, destIdol, destIdol);
        expect(destIdol.HP).not.toBe(10);
    });
});

describe("interact with other idol", ()=> {
    var srcIdol = new Idol.Idol();
    srcIdol.HP = 10;

    var destIdol = new Idol.Idol();
    destIdol.HP = 10;

    test("dealing damage test", ()=> {
        var skill = new Skill.Skill();

        skill.effects.push(
            new Skill.effect.Damage(Skill.Type.Physical,120));
        Skill.apply(skill, srcIdol, destIdol);
        expect(destIdol.HP).not.toBe(10);
        expect(destIdol.HP).toBe(-110);
    });
    
    test("dealing status test", ()=> {
        //plan = Idol.selectSkillAndTarget(battle, currentDoll);
    });
});

describe("interact with battle", ()=> {

});

describe("interact with special condition", ()=> {

});