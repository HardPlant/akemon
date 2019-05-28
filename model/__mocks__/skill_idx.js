const skill_idx = jest.genMockFromModule('../skill_idx.js');
const Skill = require("../skill");

const idxTable = {
    0: function() {
        var skill =  new Skill.Skill({
            name: "0번 스킬",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.Type.Physical, 20));

        return skill;
    },
    1: function() {
        var skill =  new Skill.Skill({
            name: "1번 스킬",
            effects: []
        });
        skill.effects.push(
            new Skill.effect.Damage(Skill.Type.Physical, 20));
        
        return skill;
    }
}

function getBaseByIdx(idx) {
    return Object.assign({}, idxTable[idx]);
}

skill_idx.getBaseByIdx = getBaseByIdx;
module.exports = skill_idx;