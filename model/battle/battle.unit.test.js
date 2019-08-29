const fs = require("fs");

eval(fs.readFileSync("model/doll/doll.js") + "");
//eval(fs.readFileSync("model/skill/skill.js") + "");
eval(fs.readFileSync("model/trainer/trainer.js") + "");
eval(fs.readFileSync("model/battle/battle.js") + "");

describe("Init", function() {
    it("1:1", function() {
        battle = new Battle();
        expect(battle).not.toBe(undefined);
    });

    it("starts battle", function() {
        function Trainer() {
    this.name = name;
    this.dolls = [];
    this.backSprite = "";
    this.frontSprite = "";
}
    });
});

describe("User Command", function() {
    it("fight", function() {

    });
    it("item", function() {

    });
    it("doll", function() {

    });
    it("run", function() {

    });
});

describe("battle", function() {
    it("", function() {

    });
});