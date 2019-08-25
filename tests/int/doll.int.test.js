const fs = require("fs");
eval(fs.readFileSync("model/doll/doll.js") + "");
eval(fs.readFileSync("model/stat/stat.js") + "");

describe("Doll + Stat", ()=> {
    it("has a stat on Battle", ()=> {
        var battle = new Battle();
        var playerDoll = new Doll({
            idx: 1,
            tag: "[Test]",
            nickname: "mirai",
            baseStat: null,
            type: ["Normal"]
        });
        
        var enemyDoll = new Doll({
            idx: 2,
            tag: "[Test]",
            nickname: "sizuka",
            baseStat: null,
            type: ["Normal"]
        });

        var battle = {};
        battle.weather = {};

        battle.onStart();

        expect(playerDoll.stat).not.toBeUndefined();
        expect(enemyDoll.stat).not.toBeUndefined();
    });
});

describe("Doll + Skill", ()=> {
    it("has a skill", ()=> {

    });
});

describe("Doll + ability", function() {

});

describe("ability + battle", function() {

});

function mockStatIndex(index) {
    var db = {
        1: new BaseStat({
            LV: 50,
            ATK: 100,
            DEF: 100,
            SAT: 100,
            SDF: 100,
            SPD: 100
        }),
    }
    return db[index];
}