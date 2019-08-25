const fs = require("fs");
eval(fs.readFileSync("model/status/status.js") + "");
eval(fs.readFileSync("model/skill/effect.js") + "");

beforeAll(function() {

});

it("diffs rank", function() {
    var doll = {};
    doll.stat = {};
    doll.stat.HP = 10;
    doll.ranks = {};
    var skill = {};
    skill.effect = new RankEffect("ATK", -1);
    skill.effect.onBeforeHit(doll);
    skill.effect.onHit(doll);
    skill.effect.onAfterHit(doll);
    
    expect(doll.ranks.ATK).not.toBe(undefined);
    expect(doll.ranks.ATK).toBe(-1);
});

it("one-hit ko", function() {
    var doll = {};
    doll.ranks = {};
    doll.fullStat = {};
    doll.stat = {};
    doll.fullStat.HP = 10;
    doll.stat.HP = 10;
    var skill = {};
    doll.event = {};
    doll.event.onOneHitKO = function(){};
    skill.effect = new OneHitKOEffect("ATK", -1);
    skill.effect.onBeforeHit(doll);
    skill.effect.onHit(doll);
    skill.effect.onAfterHit(doll);

    expect(doll.stat.HP).toBe(0);
});
it("prevent one-hit ko", function() {
    var doll = {};
    doll.ranks = {};
    doll.fullStat = {};
    doll.stat = {};
    doll.fullStat.HP = 10;
    doll.stat.HP = 10;
    doll.event = {};
    doll.event.onOneHitKO = function(doll, beforeHP, fullHP){
        if(beforeHP === fullHP) {
            doll.stat.HP = 1;
        }
    };
    var skill = {};
    skill.effect = new OneHitKOEffect("ATK", -1);
    skill.effect.onBeforeHit(doll);
    skill.effect.onHit(doll);
    skill.effect.onAfterHit(doll);
    
    expect(doll.stat.HP).toBe(1);
});

it("cause status", function() {
    var doll = {};
    var skill = {};
    skill.effect = new StatusEffect("Burn");
    skill.effect.onBeforeHit(doll);
    skill.effect.onHit(doll);
    skill.effect.onAfterHit(doll);
    
    expect(doll.status).not.toBe(undefined);
    expect(doll.status.name).toBe("Burn");
});

it("causes fixed damage", function() {
    var doll = {};
    doll.ranks = {};
    doll.stat = {};
    doll.stat.HP = 10;
    
    var skill = {};
    skill.effect = new FixedDamageEffect(4);
    skill.effect.onBeforeHit(doll);
    skill.effect.onHit(doll);
    skill.effect.onAfterHit(doll);
    
    expect(doll.stat.HP).toBe(6);
});

it("diffs weather", function() {
    
});

it("faint with enemy", function() {
    
});

it("hits multiple time", function() {

});

it("checks other dolls, and..", function() {

});
