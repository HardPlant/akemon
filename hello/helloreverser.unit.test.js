const reverse = require("./helloreverser");

test("reverse string", ()=> {
    expect(reverse.reverse("123456") ).toBe("654321");
});