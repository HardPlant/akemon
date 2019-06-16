const Idol = require('./idol');
const Skill = require("./skill");
const skill_idx = require("./skill_idx");
const IdolBattle = require("./idolbattle");

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
    var destIdol = new Idol.Idol();
    destIdol.HP = 10;
    destIdol.LV = 100;

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

    srcIdol.LV = 100;
    destIdol.LV = 100;

    test("dealing damage test", ()=> {
        var skill = new Skill.Skill();

        skill.effects.push(
            new Skill.effect.Damage(Skill.DamageType.Pure,120));
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

        srcIdol.LV = 100;
        destIdol.LV = 100;
    });

    test("normal", ()=> {
        skill = new Skill.Skill();
        skill.attrType = "Normal"
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        destIdol.attrType = ["Normal"];

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(5);
    });
    
    test("effective", ()=> {
        skill = new Skill.Skill();
        skill.attrType = "Effective";
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        destIdol.attrType = ["Effective"];
        
        expect(destIdol.attrType).not.toBe(undefined);
        Skill.apply(skill, srcIdol, destIdol);
        
        expect(destIdol.HP).toBe(10 - (5 * 2));
    });

    test("double effective", ()=> {
        skill = new Skill.Skill();
        skill.attrType = "Effective";
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        destIdol.attrType = ["Effective", "Effective"];
        
        expect(destIdol.attrType).not.toBe(undefined);
        Skill.apply(skill, srcIdol, destIdol);
        
        expect(destIdol.HP).toBe(10 - (5 * 2 * 2));
    });

    test("selftyped", ()=> {
        skill = new Skill.Skill();
        skill.attrType = "Effective";
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        srcIdol.attrType = "Effective"
        destIdol.attrType = ["Normal"];

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(10 - (5 * 1.5));
    });

    test("selftyped effective", ()=> {
        skill = new Skill.Skill();
        skill.attrType = "Effective";
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        srcIdol.attrType = "Effective";
        destIdol.attrType = ["Effective"];

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(10 - (5 * 2 * 1.5));
    });

    test("selftyped noneffective", ()=> {
        skill = new Skill.Skill();
        skill.attrType = "Effective";
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        srcIdol.attrType = "Effective";
        destIdol.attrType = ["NonEffective"];

        Skill.apply(skill, srcIdol, destIdol);

        expect(destIdol.HP).toBe(10 - (5 * 1.5 * 0.5));
    });

    test("not effective", ()=> {
        skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Pure,5, skill));
        skill.attrType = "NonEffective";
        destIdol.attrType = ["NonEffective"];
        
        expect(destIdol.attrType).not.toBe(undefined);
        Skill.apply(skill, srcIdol, destIdol);
        
        expect(destIdol.HP).toBe(7.5);
    });

    test("lv10", ()=> {
        skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Physical,5, skill));
        skill.attrType = "Normal";

        srcIdol.LV = 10;
        srcIdol.ATK = 0;
        destIdol.DEF = 0;

        destIdol.attrType = ["Normal"];
        expect(destIdol.attrType).not.toBe(undefined);
        
        Skill.apply(skill, srcIdol, destIdol);
        expect(destIdol.HP).toBe(9.5);
    });
    test("lv50", ()=> {
        skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Physical,5, skill));
        skill.attrType = "Normal";

        srcIdol.LV = 50;
        srcIdol.ATK = 0;
        destIdol.DEF = 0;

        destIdol.attrType = ["Normal"];
        expect(destIdol.attrType).not.toBe(undefined);
        
        Skill.apply(skill, srcIdol, destIdol);

        expect(skill.applyResult["amount"]).toBe(2.5);
        expect(destIdol.HP).toBe(7.5);
    });
    test("lv100", ()=> {
        skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Physical,5, skill));
        skill.attrType = "Normal";

        srcIdol.LV = 100;
        srcIdol.ATK = 0;
        destIdol.DEF = 0;

        destIdol.attrType = ["Normal"];
        expect(destIdol.attrType).not.toBe(undefined);
        
        Skill.apply(skill, srcIdol, destIdol);
        expect(skill.applyResult["finalDamage"]).not.toBe(undefined);
        expect(skill.applyResult["amount"]).toBe(5);
    
        expect(destIdol.HP).toBe(5);
        
    });
    test("physical", ()=> {
        skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Physical,5, skill));
        skill.attrType = "Normal";

        srcIdol.LV = 100;
        srcIdol.ATK = 10;
        destIdol.DEF = 0;

        destIdol.attrType = ["Normal"];
        expect(destIdol.attrType).not.toBe(undefined);
        
        Skill.apply(skill, srcIdol, destIdol);
        expect(skill.applyResult["finalDamage"]).not.toBe(undefined);
        expect(skill.applyResult["amount"]).toBe(15);
    
        expect(destIdol.HP).toBe(-5);
    });
    test("special", ()=> {
        skill = new Skill.Skill();
        skill.effects.push(new Skill.effect.Damage(Skill.DamageType.Special,5, skill));
        skill.attrType = "Normal";

        srcIdol.LV = 100;
        srcIdol.SPE = 10;
        destIdol.SDF = 0;

        destIdol.attrType = ["Normal"];
        expect(destIdol.attrType).not.toBe(undefined);
        
        Skill.apply(skill, srcIdol, destIdol);
        expect(skill.applyResult["finalDamage"]).not.toBe(undefined);
        expect(skill.applyResult["amount"]).toBe(15);
    
        expect(destIdol.HP).toBe(-5);
    });
});

describe("interact with battle", ()=> {
    var idolBattle;

    beforeEach(()=>{
        idolBattle = new IdolBattle.IdolBattle();
    });

    test("apply weather Effect", function() {
        var skill = new Skill.Skill();
        var weatherEffect = new Skill.effect.Weather(idolBattle,
            {
                type: {},
                turn: 5
            });
        skill.effects.push(weatherEffect);

        Skill.apply(skill);

        expect(idolBattle.effects.length).not.toBe(0);
    });
});

describe("interact with special condition", ()=> {

});