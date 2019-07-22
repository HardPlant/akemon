eval(fs.readFileSync("model/stat-editor/effect.js") + "");

beforeAll(function() {

});

it("diffs rank", function() {
    var doll = {};
    doll.ranks = {};
    var skill = {};
    skill.effect = new RankEffect("ATK", -1);
    skill.effect.onHit(doll);
    expect(doll.ranks.ATK).not.toBe(undefined);
    expect(doll.ranks.ATK).toBe(-1);
});

it("one-hit ko", function() {

});

it("cause status", function() {

});

it("diffs weather", function() {

});

it("faint with enemy", function() {

});

it("causes fixed damage", function() {

});

it("hits multiple time", function() {

});

it("checks other dolls, and..", function() {

});
