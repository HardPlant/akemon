const Skill = require("./skill");

const idxTable = {
    0: function() {
        var skill = new Skill.Skill({
            name: "0번 스킬",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.DamageType.Pure, 20));

        return skill;
    },
    1: function() {
        var skill =  new Skill.Skill({
            name: "1번 스킬",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.DamageType.Pure, 20));
        
        return skill;
    },
    2: function() {
        var skill =  new Skill.Skill({
            name: "흥얼거리기",
            attrType: Skill.AttrType[""],
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.DamageType.Special, 25));
        
        return skill;
    },
    2: function() {
        var skill =  new Skill.Skill({
            name: "하프스탭",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.DamageType.Physical, 25));
        
        return skill;
    }
}

function skill_idx() {};
function getBaseByIdx(idx) {
    return idxTable[idx]();
}

skill_idx.getBaseByIdx = getBaseByIdx;
module.exports = skill_idx;