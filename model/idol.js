function statObject(currentdoll) {
    return {
        general: function(stat) {
            var multipleModifiers = currentdoll.statModifier.filter(
                (mod)=>{return mod.stat === stat && mod.type === "mul"}
            );
            multipleModifiers.push({val:1.0});

            var resultMultipleModifier = multipleModifiers.reduce(
                (total, item)=> total.val * item.val
            );

            var plusModifiers =  currentdoll.statModifier.filter(
                (mod)=>{return mod.stat === stat && mod.type === "plus"}
            );
            plusModifiers.push({val:0.0});
            
            var resultPlusModifier = plusModifiers.reduce(
                (total, item)=> total.val + item.val
            );
            if (typeof(resultMultipleModifier) === "object") {
                resultMultipleModifier = resultMultipleModifier.val;
            }    

            if (typeof(resultPlusModifier) === "object") {
                resultPlusModifier = resultPlusModifier.val;
            }    
            
            return currentdoll[stat] * resultMultipleModifier + resultPlusModifier;
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
}
const Idol = {
    Idol: function(param) {
        param = param || {},
        this.idx= param.idx || 1,
        this.nickname = param.nickname || "mirai",
        this.LV = param.LV || 1,
        this.HP = param.HP || 1,
        this.baseHP = param.HP || 1,
        this.ATK = param.ATK || 1,
        this.SPE = param.SPE || 1,
        this.DEF = param.DEF || 1,
        this.SDF = param.SDF || 1,
        this.SPD = param.SPD || 1,
        this.attrType = param.attrType || ["Normal"],
        this.SkillList = param.SkillList || [];
        this.statusList = param.statusList || [];
        this.statModifier = [1.0];

        this.stats = statObject(this);
        
        this.applyStatus = function(srcDoll, status) {
            this.statusList.push(status);
            status.attached(this);
        }
        
        this.removeStatus = function(srcDoll, status) {
            this.statusList = this.status.filter((item)=>item !== status);
            status.detached(this);
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
    isUnmoveable: function(idol) {
        var isFaint = this.isFaint(idol);
        return isFaint;
    },

};
module.exports = Idol;