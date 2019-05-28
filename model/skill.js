const Type = {
    Physical: 1,
    Special: 2,
    Alter: 3
}
const DamageDealer = {
    pure : function(srcDoll, destDoll) {
        if (this.type === Type.Physical) {
            destDoll.HP -= this.amount;
        } else if (this.type === Type.Special) {
            destDoll.HP -= this.amount;
        }
    }
}
const Skill = {
    Skill: function(param) {
        param = param || {};
        this.name = param.name || "발버둥";
        this.effects = param.effects || [];
        this.PP = 35;
    },
    effect: {
        Damage: function(type, amount) {
            this.type = type || Type.Physical; // Physical, Special, Alter
            this.amount = amount || 0;

            this.apply = DamageDealer.pure;
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