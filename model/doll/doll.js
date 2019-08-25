
function Doll(param) {
    param = param || {};

    this.idx = param.idx || 0;
    this.tag = param.tag || "MissingNo";
    this.nickname = param.nickname || "kako";
    this.baseStat = param.baseStat;
    this.type = param.attrType || ["Normal"];
    this.ability = param.ability || undefined;
    this.skillList = [];

    // on Battle
    this.stat = null; // bind with stat later
    this.statModifiers = {}; // on Battle
    this.status = param.statusList || [];
}

function learnSkill(doll, skill) {
    doll.skillList.push(skill);
}