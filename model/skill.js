const DamageType = {
    Physical: 1,
    Special: 2,
    Alter: 3,
    Pure: 4
};

const StatusType = {
    Poison: 1,
    BadPoison: 2,
    Paralyze: 3,
    Burn: 4,
    Disable: 5,
    ATKp: 6,
    ATKm: 7,
    DEFp: 8,
    DEFm: 9,
    SPEp: 10,
    SPEm: 11,
    SDFp: 12,
    SDFm: 13,
    SPDp: 14,
    SPDm: 15,
}

const AttrTypes = { // Attack -> Defense
    "Effective": {
        "Effective" : 2,
        "NonEffective" : 0.5,
    },
    "NonEffective": {
        "Effective" : 2,
        "NonEffective" : 0.5,
    },
    "Vocal": {
        "Dance" : 2,
        "Visual" : 0.5
    },
    "Dance": {
        "Vocal" : 0.5,
        "Visual" : 2
    },
    "Visual": {
        "Vocal" : 2,
        "Dance" : 0.5,
    },
    "Normal": {
        "Effective" : 2,
        "NonEffective" : 0.5,
        "Ghost": 0,
        "Steel": 0.5,
    },
    "Fire": {
        "Fire": 0.5,
        "Water": 0.5,
        "Grass": 2,
        "Ice": 2,
        "Bug": 2,
        "Rock": 0.5,
        "Dragon": 0.5,
        "Steel": 2
    },
    "Water": {
        "Fire": 2,
        "Water": 0.5,
        "Grass": 0.5
    },
    "Electric": {
        "Water": 2,
        "Grass": 0.5
    },
    "Grass": {
        "Fire": 0.5,
        "Water": 2,
        "Grass": 0.5
    }
};

const DamageDealer = {
    applyStats: function(amount, skillType, damageType) {
        var modifiers = [1.0];

        return function(srcDoll, destDoll, battle) {
            battle = battle || {randomness: false};

            amount = getSelfTypeModifier(amount, skillType, srcDoll.attrType);
            amount = getAmountModifier(amount, srcDoll, destDoll, damageType);

            getEnemyTypeModifier(modifiers, skillType, destDoll.attrType);
            getBattleModifiers(modifiers, battle);
    
            var resultModifier = modifiers.reduce(
                (total, item) => total * item
                );
            

            destDoll.HP -= amount * resultModifier;

            return {
                srcDoll: srcDoll,
                destDoll: destDoll,
                battle: battle,
                amount: amount,
                modifiers: modifiers,
                finalDamage: amount * resultModifier
            }
        }
    }
};

const NullStatusLifecycle = {
    attached: function(destDoll) {},
    detached: function(destDoll) {},
    beforeTurn: function(destDoll) {},
    afterTurn: function(destDoll) {},
};

const StatusDealer = {
    applyStatus: function(srcDoll, statusType, randomness) {

        if (statusType === StatusType.Poison) {
            return function(srcDoll, destDoll, battle) {
                if (battle.randomness && randomness < Math.random()) {
                    return;
                }
                destDoll.applyStatus(srcDoll, {
                    type: statusType,
                    turn : battle.randomness ? (2 + Math.floor(Math.random() * 3)) : 3,
                                    
                    attached: NullStatusLifecycle.attached,
                    detached: NullStatusLifecycle.detached,
                    beforeTurn: NullStatusLifecycle.beforeTurn,
                    afterTurn : function() {
                        destDoll.HP -= destDoll.baseHP / 16;
                    }
                });
            }
        }

    },
    apply: function(destDoll) {

    },
    remove: function(destDoll) {

    }
}
const Skill = {
    Skill: function(param) {
        param = param || {};
        this.name = param.name || "발버둥";
        this.effects = param.effects || [];
        this.attrType = param.attrType;
        this.PP = param.PP || 35;
        this.priority = param.priority || 0;
        this.applyResult = {};
    },
    
    apply: function(skill, srcDoll, destDoll, idolBattle) {
        skill.effects.forEach(effect => {
            skill.applyResult = effect.apply(srcDoll, destDoll, idolBattle);
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
        Status: function(srcDoll, destDoll) {
            this.srcDoll = srcDoll;
            this.destDoll = destDoll;
            this.statusType = statusType;

            this.apply = StatusDealer.applyStatus(srcDoll, statusType, randomness);
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
        var modifier = AttrTypes[skillType][attrType] || 1;
    
        modifiers.push(modifier);
    });
}

function getBattleModifiers(modifiers, battle) {
    if (typeof(battle.applyEffect) !== "undefined") {
        modifiers = battle.applyEffect(modifiers);
    }
}

function getAmountModifier(amount, srcDoll, destDoll, damageType) {
    originalAmount = amount;
    amount *= (srcDoll.LV / 100);

    if (damageType === DamageType.Physical) {
        amount += srcDoll.stats.ATK() - destDoll.stats.DEF();
    }
    if (damageType === DamageType.Special) {
        amount += srcDoll.stats.SPE() - destDoll.stats.SDF();
    }
    if (damageType === DamageType.Pure) {
        // deals pure damage
        amount = originalAmount;
    }
    return Math.max(1,amount);
}

module.exports = Skill;
module.exports.DamageType = DamageType;
module.exports.DamageDealer = DamageDealer;
module.exports.AttrTypes = AttrTypes;