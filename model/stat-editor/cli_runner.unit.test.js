const fs = require("fs");
eval(fs.readFileSync("model/stat-editor/cli_runner.js").toString());

var processor;

beforeAll(function() {
    processor = new Cli_State();
});

it ("Process answer", function() {
    expect(processor.state).toBe("INIT");
});

it ("Process answer", function() {
    processor.state = "NAME"
    processor.processAnswer("mirai")
    expect(processor.doll.name).toBe("mirai");
});

it ("Process answer", function() {
    processor.state = "ATK"
    processor.processAnswer(60)
    expect(processor.doll.atk).toBe(60);
});
it ("Process answer", function() {
    processor.processAnswer(60)
    processor.processAnswer(60)
    processor.processAnswer(60)
    processor.processAnswer(60)
    processor.processAnswer()
    expect(processor.doll.def).toBe(60);
    expect(processor.doll.sat).toBe(60);
    expect(processor.doll.sdf).toBe(60);
    expect(processor.doll.spd).toBe(60);
    expect(processor.result.length).not.toBe(0);
});
