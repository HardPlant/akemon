const DamageType = {
    Physical: 1,
    Special: 2,
    Alter: 3,
    Pure: 4
};

const types = {
    "Vocal": {
        "Vocal" : 1,
        "Visual" : 1.5,
        "Dance" : 0.5
    },
    "Visual": {
        "Vocal" : 0.5,
        "Visual" : 1,
        "Dance" : 1.5
    },
    "Dance": {
        "Vocal" : 1,
        "Visual" : 0.5,
        "Dance" : 1
    }
};

const DamageDealer = {
    pure : function(srcDoll, destDoll) {
        var modifiers = [1.0];
        var skill = this;

        getSelfTypeModifier(modifiers, skill.attrType, srcDoll.attrType);
        getEnemyTypeModifier(modifiers, skill.attrType, destDoll.attrType);

        var resultModifier = modifiers.reduce(
            (total, item) => total + item
            );
        console.log(resultModifier);
        destDoll.HP -= this.amount * resultModifier;
    },
    physical : function(srcDoll, destDoll) {
        var modifier = 1;
        destDoll.HP -= this.amount * modifier;
    },
    special : function(srcDoll, destDoll) {
        var modifier = 1;
        destDoll.HP -= this.amount * modifier;
    },
    selectAuto: function(damageType) {
        if (damageType === DamageType.Physical) return DamageDealer.physical;
        if (damageType === DamageType.Special) return DamageDealer.special;
        return DamageDealer.pure;
    }
};

const Skill = {
    Skill: function(param) {
        param = param || {};
        this.name = param.name || "발버둥";
        this.effects = param.effects || [];
        this.attrType = param.attrType;
        this.PP = 35;
    },
    effect: {
        Damage: function(damageType, amount, dealer) {
            this.damageType = damageType || Type.Pure; // Physical, Special, Alter
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

function getSelfTypeModifier(modifiers, skillType, srcDollType) {
    if (typeof(skillType) === "undefined") return;
    if (typeof(destDollType) === "undefined") return;
    
    if (skillType === srcDollType) {
        modifiers.push(0.5);
    }
}

function getEnemyTypeModifier(modifiers, skillType, destDollType) {
    if (typeof(skillType) === "undefined") return;
    if (typeof(destDollType) === "undefined") return;
    var modifier = types[skillType][destDollType];

    modifiers.push(modifier - 1);
}

module.exports = Skill;
module.exports.DamageType = DamageType;
module.exports.DamageDealer = DamageDealer;