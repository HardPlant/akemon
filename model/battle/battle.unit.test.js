const fs = require("fs");

eval(fs.readFileSync("model/doll/doll.js") + "");
eval(fs.readFileSync("model/skill/skill.js") + "");
eval(fs.readFileSync("model/battle/battle.js") + "");

describe("Init", function() {
    it("1:1", function() {

    });

    it("2:2", function() {

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