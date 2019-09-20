var fs = require("fs");
eval(fs.readFileSync("model/battle/DollBattle.js"));

it("inits", function() {
    var battle = new DollBattle(null, null, null, null, null);
    expect(battle).not.toBeUndefined();
});