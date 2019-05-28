function NullIdol() {};

NullIdol.prototype = {
    idx: 0,
    nickname: "missingno",
    HP: 1,
    ATK: 1,
    SPE: 1,
    DEF: 1,
    SDF: 1,
    SPD: 1,
    Skill: [0]
}

module.exports = {
    Idol: function(param) {
        if (typeof(param) === "undefined") return new NullIdol();
    
        this.idx= param.idx || 1,
        this.nickname = param.nickname || "mirai",
        this.HP = param.HP || 1,
        this.ATK = param.ATK || 1,
        this.SPE = param.SPE || 1,
        this.DEF = param.DEF || 1,
        this.SDF = param.SDF || 1,
        this.SPD = param.SPD || 1,
        this.Skill = param.Skill || [0, 1, 2, 3];
    },
    chooseSkill: function(doll) {
        return doll.Skill[0];
    },
    isFaint: function(idol) {
        return idol.HP <= 0;
    },
    applyStatus: function() {
        throw Error("Not Implemented");
    }
};