
function Doll(param) {
    param = param || {};

    this.idx = param.idx || 0;
    this.tag = param.tag || "MissingNo";
    this.nickname = param.nickname || "kako";
    this.baseStat = param.baseStat;
    this.attrType = param.attrType || ["Normal"];
    this.SkillList = param.SkillList || [];
    this.statusList = param.statusList || [];
}

(function ($) {
    $.getAvailableSkill = function (doll) {
        var availableSkill = doll.SkillList.filter((skill) => (skill.PP !== 0));
        if (availableSkill.length === 0)
            return null;
        else
            return availableSkill;
    };
    $.isFaint = function (doll) {
        return doll.HP <= 0;
    };
    $.isUnmoveable = function (doll) {
        var isFaint = this.isFaint(doll);
        return isFaint;
    };
    $.getRealStat = function (doll) {

    }
})(Doll);