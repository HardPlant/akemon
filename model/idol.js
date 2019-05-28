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

function Idol(param) {
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
}

module.exports.Idol = Idol;