const dollTable = {
    10000: function() {
        var doll = new Doll({
            tag: "[Test]",
            nickname: "mirai",
            baseStat: null,
            type: ["Normal"]
        });
        doll.baseStat = new BaseStat({
            LV: 50,
            HP: 100,
            ATK: 100,
            DEF: 100,
            SAT: 100,
            SDF: 100,
            SPD: 100
        });
        doll.ability = new Ability("");

        doll.skillTable = {
            10: "",
            15: "",
            50: "",
        };

        return doll;
    },
    10001: function() {
        var doll = new Doll({
            idx: 2,
            tag: "[Test]",
            nickname: "sizuka",
            baseStat: null,
            type: ["Normal"]
        });

        doll.baseStat = new BaseStat({
            LV: 50,
            HP: 100,
            ATK: 100,
            DEF: 100,
            SAT: 100,
            SDF: 100,
            SPD: 100
        });

        doll.ability = new Ability("");

        doll.skillTable = {
            10: "",
            15: "",
            50: "",
        };

        return doll;
    },
    10002: function() {
    },
    10003: function() {
    },
    10004: function() {
    },
    10005: function() {
    },
}

function getDollByIdx(idx) {
    return dollTable[idx]();
}