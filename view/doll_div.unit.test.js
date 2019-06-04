var Doll_div = require("./doll_div");

var mock_idol = {
    sprite_name : "unknown"
}

it("created with ally", function() {
    test("create", function() {
        var ally_div = new Doll_Div.Ally(idol);
        expect(ally_div.tagName).toBe("div");
    });
});

it("created with enemy", function() {

});