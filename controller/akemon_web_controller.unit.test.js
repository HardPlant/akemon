const request = require("request");

describe("start", ()=> {
    var options;

    beforeAll(()=>{
        options = {
            uri: 'http://localhost:3000/',
            method: 'POST',
            json: true,
            body: {

            }
        };
    });

    it("starts", (done)=> {
        request.post(options, (err, response, body)=>{

            expect(response.body.result).toBe("hello world");
            done();
        });
    });
});