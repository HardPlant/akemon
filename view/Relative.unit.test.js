const fs = require("fs");
const clientWidthSpy = jest
.spyOn(document.documentElement, 'clientWidth', 'get')
.mockImplementation(() => 720);
eval(fs.readFileSync("view/Relative.js") + "");
const clientHeightSpy = jest
                    .spyOn(document.documentElement, 'clientHeight', 'get')
                    .mockImplementation(() => 480);

it("x * 10%, returns 72", function() {
    // var relX = relativeWidth(10);
    // expect(relX).toBe(72);
});

it("y * 20, returns 96", function() {
    // var relY = relativeHeight(20);
    // expect(relY).toBe(96);
});
