const fs = require("fs");
eval(fs.readFileSync("model/doll/doll.js") + "");
eval(fs.readFileSync("model/stat/stat.js") + "");
eval(fs.readFileSync("model/skill/skill.js") + "");

describe("Doll + Stat", ()=> {
    it("has a stat on Battle", ()=> {
        var battle = new Battle();

        battle.weather = {};

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