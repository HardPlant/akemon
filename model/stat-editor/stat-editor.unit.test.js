var fs = require("fs");
eval(fs.readFileSync("model/stat-editor/nature.js") + "");
eval(fs.readFileSync("model/stat-editor/status.js") + "");
eval(fs.readFileSync("model/stat-editor/weather.js") + "");
eval(fs.readFileSync("model/stat-editor/stat-editor.js") + "");

it("inits stat", function() {
    var stat = new BaseStat({});
    expect(stat).not.toBe(undefined);
});

it("calculates 1Lv stat", function() {
    var stat = new BaseStat({
        LV: 1,
        HP: 100,
        ATK: 100,
        DEF: 100,
        SAT: 100,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    var battle = {};
    battle.weather = {};

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    console.log(doll.stat);
});

it("calculates 100Lv stat", function() {
    var stat = new BaseStat({
        LV: 100,
        HP: 255,
        ATK: 150,
        DEF: 100,
        SAT: 180,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    var battle = {};
    battle.weather = {};

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    console.log(doll.stat);
});

it("takes a nature", function() {
    var stat = new BaseStat({
        LV: 100,
        HP: 255,
        ATK: 150,
        DEF: 100,
        SAT: 180,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.nature = new Nature("vocal");
    var battle = {};
    battle.weather = {};

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    expect(doll.stat["ATK"]).toBeLessThan(305);
    expect(doll.stat["SAT"]).toBeGreaterThan(365);
});

it("calculates up-rank", function() {
    var stat = new BaseStat({
        LV: 100,
        HP: 255,
        ATK: 150,
        DEF: 100,
        SAT: 180,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.ranks = {
        "ATK": 1,
        "DEF": 1,
        "SAT": 2,
        "SDF": 2,
        "SPD": 3
    };
    var battle = {};
    battle.weather = {};

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    expect(doll.stat["SAT"]).toBe(730);
    expect(doll.stat["SPD"]).toBe(512.5);
});

it("calculates down-rank", function() {
    var stat = new BaseStat({
        LV: 100,
        HP: 255,
        ATK: 150,
        DEF: 100,
        SAT: 180,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.ranks = {
        "ATK": -1,
        "DEF": -1,
        "SAT": -2,
        "SDF": -2,
        "SPD": -6
    };
    var battle = {};
    battle.weather = {};

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    expect(doll.stat["SAT"]).toBe(182.5);
    expect(doll.stat["SPD"]).toBe(51.25
});
it("calculates status", function() {
    var stat = new BaseStat({
        LV: 100,
        HP: 255,
        ATK: 150,
        DEF: 100,
        SAT: 180,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.status = new Status("Burn");
    var battle = {};
    battle.weather = {};

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    expect(doll.stat["ATK"]).toBeLessThan(305);
});

it("causes weather", function() {

    var stat = new BaseStat({
        LV: 100,
        HP: 255,
        ATK: 150,
        DEF: 100,
        SAT: 180,
        SDF: 100,
        SPD: 100        
    });
    var doll = {};
    doll.baseStat = stat;
    doll.ability = {};
    doll.statModifiers = {};
    doll.type = ["Rock"];
    var battle = {};
    var beforeStat = realStat(doll, battle)["SDF"] * 1.5;
    battle.weather = new Weather("Sandstorm");

    doll.stat = realStat(doll, battle);

    expect(doll.stat).not.toBe(undefined);
    expect(doll.stat["SDF"]).toBe(beforeStat);
});  
