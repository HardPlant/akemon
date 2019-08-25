const readline = require("readline");
const fs = require("fs");
eval(fs.readFileSync("model/stat-editor/cli_runner.js").toString());

var processor = new Cli_State();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(processor.getQuestion(), function (answer) {
    processor.processAnswer(answer);
});
