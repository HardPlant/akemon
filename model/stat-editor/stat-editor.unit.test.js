var fs = require("fs");
eval(fs.readFileSync("model/stat-editor/stat-editor.js") + "");

it("inits stat", function() {
    var stat = new Stat({});
    expect(stat).not.toBe(undefined);
});
