function skill() {
    this.idx = 0;
    this.name = "";
    this.power = Number();
    this.type = "Normal";
    this.srcStat = "";
    this.destStart =  "";
    this.bonusCritical = 0;
    this.beforeHit = undefined;
    this.afterHit = undefined;
}

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
    totalModifier.push(getWeatherModifier(skill, battle));
    
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
    if (!(destDoll.type && skill.type)) return 1;
    var modifiers = [1];
    destDoll.type.forEach(function (defenseType) {
        modifiers.push(typeTable[skill.type][defenseType])
    });

    return modifiers.reduce(multipleReduce);
}

function getWeatherModifier(skill, battle) {
    if (!battle.weather) return 1;

    if (battle.weather.name === "Rainy") {
        if (skill.type === "Water") {
            return 1.5; 
        }
        if (skill.type === "Fire") {
            return 0.5; 
        }
    }

    if (battle.weather.name === "Sunny") {
        if (skill.type === "Fire") {
            return 1.5; 
        }
        if (skill.type === "Water") {
            return 0.5; 
        }
    }

    return 1;
}
