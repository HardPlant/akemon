const IdolBattle = require("./idolbattle");

const DamageType = {
    Physical: 1,
    Special: 2,
    Alter: 3,
    Pure: 4
};

const AttrTypes = {
    "Effective": {
        "Effective" : 1.5,
        "Normal" : 1,
        "NonEffective" : 0.5,
    },
    "Normal": {
        "Effective" : 1,
        "Normal" : 1,
        "NonEffective" : 1,
    },
    "NonEffective": {
        "Effective" : 1.5,
        "Normal" : 1,
        "NonEffective" : 0.5,
    },
    "Vocal": {
        "Vocal" : 1,
        "Dance" : 1.5,
        "Visual" : 0.5
    },
    "Dance": {
        "Vocal" : 0.5,
        "Dance" : 1,
        "Visual" : 1.5
    },
    "Visual": {
        "Vocal" : 1.5,
        "Dance" : 0.5,
        "Visual" : 1
    }
};

const DamageDealer = {
    pure : function(srcDoll, destDoll, idolBattle) {
        var modifiers = [1.0];
        var skill = this;

        getSelfTypeModifier(modifiers, skill.attrType, srcDoll.attrType);
        getEnemyTypeModifier(modifiers, skill.attrType, destDoll.attrType);
        
        if (typeof(idolBattle) !== "undefined") {
            IdolBattle.applyEffect(idolBattle, modifiers);
        }

        var resultModifier = modifiers.reduce(
            (total, item) => total * item
            );
        destDoll.HP -= this.amount * resultModifier;
    },
    physical : function(srcDoll, destDoll, idolBattle) {
        var modifier = 1;
        destDoll.HP -= this.amount * modifier;
    },
    special : function(srcDoll, destDoll, idolBattle) {
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
    
    apply: function(skill, srcDoll, destDoll, idolBattle) {
        skill.effects.forEach(effect => {
            effect.apply(srcDoll, destDoll, idolBattle);
        });
    },

    effect: {
        Damage: function(damageType, amount, dealer, parentSkill) {
            this.damageType = damageType || Type.Pure; // Physical, Special, Alter
            this.amount = amount || 0;

            var parentSkill = parentSkill || {};
            this.attrType = parentSkill.attrType || "Normal";

            var defaultDealer = DamageDealer.selectAuto(this.type);
            this.apply = dealer || defaultDealer;
        },
        Weather: function(idolBattle, args) {
            this.apply = function() {
                idolBattle.effects.push({
                    type: args.type,
                    turn: args.turn,
                })
            }
        },
        Status: function() {
            
        },
    },
    
};

function getSelfTypeModifier(modifiers, skillType, srcDollType) {
    if (typeof(skillType) === "undefined") return;
    if (typeof(srcDollType) === "undefined") return;
    if (skillType === "Normal") return;

    if (skillType === srcDollType) {
        modifiers.push(1.5);
    }
}

function getEnemyTypeModifier(modifiers, skillType, destDollType) {
    if (typeof(skillType) === "undefined") return;
    if (typeof(destDollType) === "undefined") return;
    var modifier = AttrTypes[skillType][destDollType];

    modifiers.push(modifier);
}

module.exports = Skill;
module.exports.DamageType = DamageType;
module.exports.DamageDealer = DamageDealer;