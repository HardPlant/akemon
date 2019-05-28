const Type = {
    Physical: 1,
    Special: 2,
    Alter: 3,
    Pure: 4
};

const DamageDealer = {
    pure : function(srcDoll, destDoll) {
        destDoll.HP -= this.amount;
    },
    physical : function(srcDoll, destDoll) {
        destDoll.HP -= this.amount;
    },
    special : function(srcDoll, destDoll) {
        destDoll.HP -= this.amount;
    },
    selectAuto: function(type) {
        if (type === Type.Physical) return DamageDealer.physical;
        if (type === Type.Special) return DamageDealer.special;
        return DamageDealer.pure;
    }
};

const Skill = {
    Skill: function(param) {
        param = param || {};
        this.name = param.name || "발버둥";
        this.effects = param.effects || [];
        this.PP = 35;
    },
    effect: {
        Damage: function(type, amount, dealer) {
            this.type = type || Type.Pure; // Physical, Special, Alter
            this.amount = amount || 0;
            var defaultDealer = DamageDealer.selectAuto(this.type);
            this.apply = dealer || defaultDealer;
        },
        Status: function() {
            
        },
    },
    
    apply: function(skill, srcDoll, destDoll) {
        skill.effects.forEach(effect => {
            effect.apply(srcDoll, destDoll);
        });
    },
    
};

module.exports = Skill;
module.exports.Type = Type;
module.exports.DamageDealer = DamageDealer;