const skill_idx = jest.genMockFromModule('skill_idx');
const Skill = require("../skill");

const idxTable = {
    0: function() {
        var skill =  new Skill.Skill({
            name: "0번 스킬",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.Type.Physical, 20));
    },
    1: function() {
        var skill =  new Skill.Skill({
            name: "1번 스킬",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.Type.Physical, 20));
    }
}

function getBaseByIdx(idx) {
    return Object.clone(idxTable[idx]);
}

skill_idx.getBaseByIdx = getBaseByIdx;
module.exports = skill_idx;