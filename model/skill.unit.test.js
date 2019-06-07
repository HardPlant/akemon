const Idol = require('./idol');
const Skill = require("./skill");
const skill_idx = require("./skill_idx");

jest.mock("skill_idx");

describe("creation test", ()=> {
    test("init", ()=> {
        var skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure, 120));
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

        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,120));

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
            new Skill.effect.Damage(Skill.DamageType.Pure,120));
        expect(skill.effects[0].apply).toBe(Skill.DamageDealer.pure);
        Skill.apply(skill, srcIdol, destIdol);
        expect(destIdol.HP).not.toBe(10);
        expect(destIdol.HP).toBe(-110);
    });
    
    test("dealing status test", ()=> {
        //plan = Idol.selectSkillAndTarget(battle, currentDoll);
    });
});

describe("type test", ()=> {
    var srcIdol;
    var destIdol;
    var skill;
    var damage;
    
    beforeEach(()=> {
        srcIdol = new Idol.Idol();
        srcIdol.HP = 10;
    
        destIdol = new Idol.Idol();
        destIdol.HP = 10;

        damage = new Skill.effect.Damage(Skill.DamageType.Pure,5, undefined, skill);
        
        skill = new Skill.Skill();
        skill.effects.push(damage);
    });

    test("normal", ()=> {
        damage.attrType = "Normal";
        destIdol.attrType = "Normal";

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(5);
    });
    
    test("effective", ()=> {
        damage.attrType = "Effective";
        destIdol.attrType = "Effective";
        
        expect(destIdol.attrType).not.toBe(undefined);
        Skill.apply(skill, srcIdol, destIdol);
        
        expect(destIdol.HP).toBe(2.5);
    });

    test("selftyped", ()=> {
        srcIdol.attrType = "Effective"
        damage.attrType = "Effective";
        destIdol.attrType = "Normal";

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(2.5);
    });

    test("selftyped effective", ()=> {
        srcIdol.attrType = "Effective"
        damage.attrType = "Effective";
        destIdol.attrType = "Effective";

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(-1.25);
    });

    test("selftyped noneffective", ()=> {
        srcIdol.attrType = "Effective"
        damage.attrType = "Effective";
        destIdol.attrType = "NonEffective";

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(10 - (5 * 1.5 * 0.5));
    });

    test("not effective", ()=> {
        damage.attrType = "NonEffective";
        destIdol.attrType = "NonEffective";
        
        expect(destIdol.attrType).not.toBe(undefined);
        Skill.apply(skill, srcIdol, destIdol);
        
        expect(destIdol.HP).toBe(7.5);
    });
});

describe("interact with battle", ()=> {

});

describe("interact with special condition", ()=> {

});