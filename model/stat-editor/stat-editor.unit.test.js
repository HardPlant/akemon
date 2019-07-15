var fs = require("fs");
eval(fs.readFileSync("model/stat-editor/nature.js") + "");
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
    console.log(doll.stat);
});
