const hello = require("../../hello/hello");
const reverse = require("../../hello/helloreverser");

test("reverse hello", ()=> {
    var hi = hello.getHelloWorld();

    expect(hi).toBe("hello world");

    var reversed = reverse.reverse(hi);

    expect(reversed).toBe("dlrow olleh");
});