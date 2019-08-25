
function Doll(param) {
    param = param || {};

    this.idx = param.idx || 0;
    this.tag = param.tag || "MissingNo";
    this.nickname = param.nickname || "kako";
    this.baseStat = param.baseStat;
    this.type = param.attrType || ["Normal"];
    this.ability = param.ability || undefined;

    // on Battle
    this.stat = null; // bind with stat later
    this.statModifiers = {}; // on Battle
    this.skill = param.SkillList || [];
    this.status = param.statusList || [];
}

(function ($) {
    $.getAvailableSkill = function (doll) {
        var availableSkill = doll.SkillList.filter((skill) => (skill.PP !== 0));
        if (availableSkill.length === 0)
            return null;
        else
            return availableSkill;
    };
})(Doll.prototype);