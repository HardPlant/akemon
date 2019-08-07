var natureTable = {
    "vocal": {
        "SAT" : 1.1,
        "ATK" : 0.9
    },
    "dance": {
        "ATK" : 1.1,
        "SAT" : 0.9
    },
    "visual": {
        "DEF" : 1.1,
        "SPD" : 0.9
    },
    "princess": {
        "SDF" : 1.1,
        "SPD" : 0.9,
    },
    "fairy": {
        "SPD" : 1.1,
        "ATK" : 0.9,
    },
    "angel": {
        "SPD" : 1.1,
        "DEF" : 0.9,
    }
}
function Nature(name) {
    if (typeof(natureTable[name]) === "undefined") {
        console.error("Unexpected Param");
    }
    return {
        name: name,
        stat: natureTable[name]
    }
}
function calculateNature(doll, statObj) {
    if (!doll.nature) return;
    
    for (var stat in doll.nature.stat) {
        var modifier = doll.nature.stat[stat];
        statObj[stat] *= modifier;
    }
    
    return statObj;
}
