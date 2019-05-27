const hello = require("../../hello");

test("print hello to console", ()=> {
    var hi = hello.getHelloWorld();

    expect(hi).toBe("hello world");

    console.log(hi);

});