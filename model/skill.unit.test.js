eval(require("fs").readFileSync("model/stat-editor/stat-editor.js")+"");
eval(require("fs").readFileSync("model/stat-editor/skill.js")+"");

var battle;

beforeAll(function(){
    battle = {};
    battle.getSkillRandom = function() {
        return 1;
    };
    battle.getDefaultCritical = function() {
        return 0;
    };
    battle.weather = {};
});

it("deals damage", function() {
    var srcDoll = getBalancedDoll();
    var destDoll = getBalancedDoll();
    var skill = getSkillBase();

    var resultDamage = skillDamage(skill, battle, srcDoll, destDoll);
    expect(typeof(resultDamage)).toBe("number");
    console.log(resultDamage);
});

it("deals damage", function() {
    var srcDoll = getBalancedDoll();
    var destDoll = getDefenseDoll();
    var skill = getSkillBase();

    var resultDamage = skillDamage(skill, battle, srcDoll, destDoll);
    expect(typeof(resultDamage)).toBe("number");
    console.log(resultDamage);
});
it("deals damage", function() {
    var srcDoll = getAttackDoll();
    var destDoll = getBalancedDoll();
    var skill = getSkillBase();

    var resultDamage = skillDamage(skill, battle, srcDoll, destDoll);
    expect(typeof(resultDamage)).toBe("number");
    console.log(resultDamage);
});
it("criticals", function() { 
    var critBattle = Object.create(battle);
    critBattle.getDefaultCritical = function() {
        return 1;
    };
    srcDoll = getBalancedDoll();
    destDoll = getBalancedDoll();
    skill = getSkillBase();

    var modifier = calculateModifier(skill, critBattle, srcDoll, destDoll);
    expect(modifier[1]).toBe(1.5);
});
it("bonuses self-type", function() { 
    var critBattle = Object.create(battle);
    critBattle.getDefaultCritical = function() {
        return 1;
    };
    srcDoll = getBalancedDoll();
    destDoll = getBalancedDoll();
    skill = getSkillBase();

    skill.type = "Ice";
    srcDoll.type = ["Ice"];

    var modifier = calculateModifier(skill, critBattle, srcDoll, destDoll);
    expect(modifier[2]).toBe(1.5);
});
it("halves again weak type", function() {
    srcDoll = getBalancedDoll();
    destDoll = getBalancedDoll();
    skill = getSkillBase();

    skill.type = "Ice";
    destDoll.type = ["Water"];

    var modifier = calculateModifier(skill, battle, srcDoll, destDoll);
    console.log(modifier);
    expect(modifier[3]).toBe(0.5);
});
it("doubles again strong type", function() {
    srcDoll = getBalancedDoll();
    destDoll = getBalancedDoll();
    skill = getSkillBase();

    skill.type = "Ice";
    destDoll.type = ["Dragon"];

    var modifier = calculateModifier(skill, battle, srcDoll, destDoll);
    console.log(modifier);
    expect(modifier[3]).toBe(2);
});
function getBalancedDoll() {
    var stat = new BaseStat({
        LV: 50,
        HP: 100,
        ATK: 100,
        DEF: 100,
        SAT: 100,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.stat = realStat(doll, battle);

    return doll;
}
function getAttackDoll() {
    var stat = new BaseStat({
        LV: 50,
        HP: 100,
        ATK: 150,
        DEF: 50,
        SAT: 150,
        SDF: 50,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.stat = realStat(doll, battle);

    return doll;
}
function getDefenseDoll() {
    var stat = new BaseStat({
        LV: 50,
        HP: 100,
        ATK: 50,
        DEF: 150,
        SAT: 50,
        SDF: 150,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.stat = realStat(doll, battle);
    return doll;
}
function getSkillBase() {
    var skillBase = {
        power: 90,
        type: "Normal",
        srcStat: "ATK",
        destStat: "DEF",
        bonusCritical: 0,
        beforeHit: function(){},
        afterHit: function(){}
    };
    return skillBase;
}
