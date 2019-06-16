const DamageType = {
    Physical: 1,
    Special: 2,
    Alter: 3,
    Pure: 4
};

const AttrTypes = {
    "Effective": {
        "Effective" : 2,
        "Normal" : 1,
        "NonEffective" : 0.5,
    },
    "Normal": {
        "Effective" : 2,
        "Normal" : 1,
        "NonEffective" : 0.5,
    },
    "NonEffective": {
        "Effective" : 2,
        "Normal" : 1,
        "NonEffective" : 0.5,
    },
    "Vocal": {
        "Vocal" : 1,
        "Dance" : 2,
        "Visual" : 0.5
    },
    "Dance": {
        "Vocal" : 0.5,
        "Dance" : 1,
        "Visual" : 2
    },
    "Visual": {
        "Vocal" : 2,
        "Dance" : 0.5,
        "Visual" : 1
    }
};

const DamageDealer = {
    applyStats: function(amount, skillType, damageType) {
        var modifiers = [1.0];

        return function(srcDoll, destDoll, battle) {
            amount = getSelfTypeModifier(amount, skillType, srcDoll.attrType);
            amount = getAmountModifier(amount, srcDoll, destDoll, damageType);

            getEnemyTypeModifier(modifiers, skillType, destDoll.attrType);
            getBattleModifiers(modifiers, battle);
    
            var resultModifier = modifiers.reduce(
                (total, item) => total * item
                );
            

            destDoll.HP -= amount * resultModifier;
        }
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
        Damage: function(damageType, amount, parentSkill) {
            var parentSkill = parentSkill || {};

            this.damageType = damageType || DamageType.Pure;
            this.attrType = parentSkill.attrType || "Normal";

            this.apply = DamageDealer.applyStats(amount, this.attrType, this.damageType);
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

function getSelfTypeModifier(amount, skillType, srcDollType) {
    if (typeof(skillType) === "undefined") return amount;
    if (typeof(srcDollType) === "undefined") return amount;
    if (skillType === "Normal") return amount;

    if (skillType === srcDollType) {
        amount *= 1.5;
    }
    return amount;
}

function getEnemyTypeModifier(modifiers, skillType, destDollTypes) {
    if (typeof(skillType) === "undefined") return;
    if (typeof(destDollTypes) === "undefined") return;

    destDollTypes.forEach(function(attrType) {
        var modifier = AttrTypes[skillType][attrType];
    
        modifiers.push(modifier);
    });
}

function getBattleModifiers(modifiers, battle) {
    if (typeof(battle) !== "undefined") {
        modifiers = battle.applyEffect(modifiers);
    }
}

function getAmountModifier(amount, srcDoll, destDoll, damageType) {
    originalAmount = amount;
    amount *= (srcDoll.LV / 100);

    if (damageType === DamageType.Physical) {
        amount += srcDoll.ATK - destDoll.DEF;
    }
    if (damageType === DamageType.Special) {
        amount += srcDoll.SPE - destDoll.SPF;
    }
    if (damageType !== DamageType.Pure) {
        // deals pure damage
        amount = originalAmount;
    }
    return amount;
}

module.exports = Skill;
module.exports.DamageType = DamageType;
module.exports.DamageDealer = DamageDealer;