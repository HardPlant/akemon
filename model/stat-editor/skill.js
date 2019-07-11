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
    totalModifier.push(getTypeModifier(battle, srcDoll, destDoll));

    return totalModifier;
}

function getCriticalModifier(criticalness) {
    if (Math.random() < criticalness) return 1.5;
    else return 1;
}

function getTypeModifier() {
    return 1;
}
