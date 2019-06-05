var $ = require("jquery");
var fs = require("fs");
eval(fs.readFileSync("/home/seongwon/repo/akemon/view/doll_div.js") + "");

var mock_idol = {
    sprite_name : "unknown"
}

describe("created with ally", function() {
    test("create", function() {
        var doll_div = new Doll_Div.Ally(mock_idol);
        
        expect(doll_div.dom.tagName).toBe("DIV");
        expect(doll_div.dom.style.backgroundImage).toBe("url(assets/sprite/unknown/back.png)");
        expect($(doll_div.dom)[0]).toBe(doll_div.dom);
        document.documentElement.appendChild(doll_div.dom);
        
        expect($("#ally_doll")[0]).toBe(doll_div.dom);
    });
});

describe("created with enemy", function() {
    var doll_div = new Doll_Div.Enemy(mock_idol);
    
    expect(doll_div.dom.tagName).toBe("DIV");
    expect(doll_div.dom.style.backgroundImage).toBe("url(assets/sprite/unknown/front.png)");

});