function BaseStat(statObj) {
    this.LV = statObj.LV;
    this.HP = statObj.HP;
    this.ATK = statObj.ATK;
    this.DEF = statObj.DEF;
    this.SAT = statObj.SAT;
    this.SDF = statObj.SDF;
    this.SPD = statObj.SPD;
    this.EXP = statObj.EXP;
    this.friendship = statObj.friendship;
}

function realStat(doll, battle) {
    if (!(doll && battle
            && doll.ability
            && doll.statModifiers
            && battle.weather)) {
        console.error("[realStat] Unexpected Param");
        console.error(this);
    }
    var lv = doll.baseStat.LV;
    var statObj = {
        LV: lv,
        HP: calculateHP(doll.baseStat.HP,lv),
        ATK: calculateStat(doll.baseStat.ATK,lv),
        DEF: calculateStat(doll.baseStat.DEF,lv),
        SAT: calculateStat(doll.baseStat.SAT,lv),
        SDF: calculateStat(doll.baseStat.SDF,lv),
        SPD: calculateStat(doll.baseStat.SPD,lv),
    }
    if (doll.nature) {
        statObj = calculateNature(doll, statObj);
    }
    return statObj;
}

function calculateHP(base, lv){
    return Math.floor(
        ((base * 2) * lv / 100)) + 10;
}
function calculateStat(base, lv){
    return Math.floor(
        ((base) * 2 ) * lv / 100) + 5;
}
