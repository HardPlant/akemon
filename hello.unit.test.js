const hello = require("./hello");

test("get hello", ()=> {
    expect(hello.getHelloWorld()).toBe("hello world");
});