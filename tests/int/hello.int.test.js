const hello = require("../../hello");
const reverse = require("../../helloreverser");

test("reverse hello", ()=> {
    var hi = hello.getHelloWorld();

    expect(hi).toBe("hello world");

    var reversed = reverse.reverse(hi);

    expect(reversed).toBe("dlrow olleh");
});