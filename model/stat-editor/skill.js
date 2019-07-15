function skillDamage(skill, battle, srcDoll, destDoll) {
    var randomness = battle.getSkillRandom();
    var statDiff = srcDoll.stat[skill.srcStat] / destDoll.stat[skill.destStat];
    var modifiers = calculateModifier(skill, battle, srcDoll, destDoll);

    return Math.floor(
        ((2 * srcDoll.stat.LV + 10) / 250 / statDiff) * skill.power + 2
        * modifiers.reduce(multipleReduce)
        * randomness
    );
}

function multipleReduce(total, item) {
    return total * item;
}

function calculateModifier(skill, battle, srcDoll, destDoll) {
    var totalModifier = [1];
    var criticalness = battle.getDefaultCritical() + skill.bonusCritical;
    totalModifier.push(getCriticalModifier(criticalness));
    totalModifier.push(getSelfTypeModifier(skill, srcDoll));
    totalModifier.push(getTypeModifier(skill, battle, srcDoll, destDoll));

    return totalModifier;
}

function getCriticalModifier(criticalness) {
    if (Math.random() < criticalness) return 1.5;
    return 1;
}
function getSelfTypeModifier(skill, srcDoll) {
    if (!srcDoll.type) return 1;
    if (srcDoll.type.indexOf(skill.type) > -1) 
        return 1.5;
    return 1;
}
function getTypeModifier(skill, battle, srcDoll, destDoll) {
    if (!(destDoll.type && skill.type )) return 1;
    // Attack => Defense
    var testTable = {
        "Water": {
            "Water" : 0.5,
            "Ice" : 1,
            "Dragon" : 0.5,
            "Flying" : 1,
        },
        "Ice": {
            "Water" : 0.5,
            "Ice" : 0.5,
            "Dragon" : 2,
            "Flying" : 2,
        },
        "Dragon": {
            "Water" : 1,
            "Ice" : 1,
            "Dragon" : 2,
            "Flying" : 1,
        },
        "Flying": {
            "Water" : 1,
            "Ice" : 1,
            "Dragon" : 1,
            "Flying" : 1,
        },
    }
    var modifiers = [1];
    destDoll.type.forEach(function(defenseType) {
        modifiers.push(testTable[skill.type][defenseType])
    });

    return modifiers.reduce(multipleReduce);
}
