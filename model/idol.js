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
    attrType: ["Normal"],
    SkillList: [0]
}

module.exports = {
    Idol: function(param) {
        if (typeof(param) === "undefined") return new NullIdol();
    
        this.idx= param.idx || 1,
        this.nickname = param.nickname || "mirai",
        this.LV = param.LV || 1,
        this.HP = param.HP || 1,
        this.ATK = param.ATK || 1,
        this.SPE = param.SPE || 1,
        this.DEF = param.DEF || 1,
        this.SDF = param.SDF || 1,
        this.SPD = param.SPD || 1,
        this.attrType = param.attrType || ["Normal"],
        this.SkillList = param.SkillList || [];
        this.statusList = param.statusList || [];
        this.statModifier = [];
        
        this.stats = {
            general: function(stat) {
                var multipleModifiers = this.statModifier.filter(
                    (mod)=>{return mod.stat === stat && mod.type === "mul"}
                );
                var resultMultipleModifier = multipleModifiers.reduce(
                    (total, item)=> total*item
                );
                var plusModifiers = this.statModifier.filter(
                    (mod)=>{return mod.stat === stat && mod.type === "plus"}
                );
                var resultPlusModifier = plusModifiers.reduce(
                    (total, item)=> total+item
                );
                
                return this.stat * resultMultipleModifier + resultPlusModifier;
            },
            ATK: function() {
                return this.general("ATK");
            },
            SPE: function() {
                return this.general("SPE");
            },
            DEF: function() {
                return this.general("DEF");
            },
            SDF: function() {
                return this.general("SDF");
            },
            SPD: function() {
                return this.general("SPD");
            },
        }
    },
    getAvailableSkill: function(doll) {
        var availableSkill = doll.SkillList.filter((skill)=>(skill.PP !== 0));
        if (availableSkill.length === 0)
            return null;
        else
            return availableSkill;
    },
    isFaint: function(idol) {
        return idol.HP <= 0;
    },

    applyStatus: function() {
        throw Error("Not Implemented");
    }
};