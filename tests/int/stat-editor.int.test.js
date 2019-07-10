const webdriver = require("selenium-webdriver");
const baseURL = "http://127.0.0.1:8080/view/"
const httpServerCmd = "http-server";
const exec = require("child_process").exec;


var child;
beforeAll(function() {
    child = exec(httpServerCmd);
});

afterAll(function() {
    child.kill();
})

it("opens page", async function() {
    const driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .build();
    await driver.get(baseURL + "stat-editor.html");

    await driver.quit();
});
