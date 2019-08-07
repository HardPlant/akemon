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
    if (battle.weather) {
        statObj = calculateWeather(battle.weather, doll, statObj);
    }
    if (doll.ranks) {
        statObj = calculateRank(doll, statObj);
    }
    if (doll.status) {
        statObj = calculateStatus(doll, statObj);
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
function calculateRank(doll, statObj) {
    if (!doll.ranks) return;
    
    for (stat in doll.ranks) {
        if (stat === "Accuracy") {

        }
        else if (doll.ranks[stat] > 0) {
            statObj[stat] *= (2+doll.ranks[stat])/2;
        } else {
            statObj[stat] *= 2.0/(2-doll.ranks[stat]);
        }
    }

    return statObj;
}
function calculateStatus(doll, statObj) {
    if (!doll.status) return;
    if (doll.status.name === "Burn") {
        statObj["ATK"] *= 0.5;
    }

    return statObj;
}
function calculateWeather(weather, doll, statObj) {
    if (!doll.type) return statObj;

    if (weather.name === "Sandstorm" && 
    (doll.type.indexOf("Rock") > -1))
    {
        statObj["SDF"] *= 1.5;
    }
    if (weather.name === "Fog" && doll.ranks) {
        doll.ranks["Accuracy"]
         = doll.ranks["Accuracy"] > -6? doll.ranks["Accuracy"] - 1: -6;
    }
    return statObj;
}
