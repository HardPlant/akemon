var fs = require("fs");
eval(fs.readFileSync("model/phase/AppearPhase.js").toString());

it("inits", function() {
    var phase = new AppearPhase({});
    expect(phase).not.toBeUndefined();
});