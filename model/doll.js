
function Doll(param) {
    param = param || {};

    this.idx = param.idx || 1;
    this.tag = param.tag || "doll";
    this.nickname = param.nickname || "mirai";
    this.baseStat = param.baseStat;
    this.attrType = param.attrType || ["Normal"];
    this.SkillList = param.SkillList || [];
    this.statusList = param.statusList || [];
}

(function ($) {
    $.toJson = function () {
        var skills = [];
        this.SkillList.forEach((item) => {
            skills.push({
                name: item.name
            });
        });

        return {
            tag: this.tag,
            nickname: this.nickname,
            LV: this.LV,
            HP: this.HP,
            baseHP: this.baseHP,
            ATK: this.ATK,
            SPE: this.SPE,
            DEF: this.DEF,
            SDF: this.SDF,
            SPD: this.SPD,
            SkillList: skills,
            attrType: this.attrType,
            statusList: this.statusList,
            statModifier: this.statModifier,
            stats: this.stats
        };
    };
    $.getAvailableSkill = function (doll) {
        var availableSkill = doll.SkillList.filter((skill) => (skill.PP !== 0));
        if (availableSkill.length === 0)
            return null;
        else
            return availableSkill;
    };
    $.isFaint = function (idol) {
        return idol.HP <= 0;
    };
    $.isUnmoveable = function (idol) {
        var isFaint = this.isFaint(idol);
        return isFaint;
    }
})(Doll);