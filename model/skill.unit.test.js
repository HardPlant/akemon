const Idol = require('./idol');
const Skill = require("./skill");

describe("creation test", ()=> {
    test("init", ()=> {
        var skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.Type.Physical, 120));
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
    var srcIdol = Idol.Idol();
    srcIdol.HP = 10;

    var destIdol = Idol.Idol();
    destIdol.HP = 10;

    test("dealing damage test", ()=> {
        var skill = new Skill.Skill();

        skill.effects.push(new Skill.effect.Damage(Skill.Type.Physical,120));
        Skill.apply(skill, srcIdol, destIdol);
        expect(destIdol.HP).not.toBe(10);
    });
    
    test("dealing status test", ()=> {
        //plan = Idol.selectSkillAndTarget(battle, currentDoll);
    });
});

describe("interact with battle", ()=> {

});

describe("interact with special condition", ()=> {

});