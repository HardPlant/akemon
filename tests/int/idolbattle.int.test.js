const Idol = require("../../model/idol");
const Skill = require("../../model/skill");
const IdolBattle = require("../../model/idolbattle");
const skill_idx = require("../../model/skill_idx");

describe("interactive battle", ()=> {
    var mirai;
    var sizuka;
    var tsubasa;
    var kotoha;
    var elena;
    var megumi;

    test("import test", ()=> {
        var idol = new Idol.Idol();
        var skill = new Skill.Skill();
        var idolbattle = new IdolBattle.IdolBattle();
        var skill_0 = skill_idx.getBaseByIdx(0);
    });  

    test("idol team appears", ()=> {
        
    });
});

function createIdols(idols) {
    idols.mirai = new Idol.Idol({
        nickname: "",
        

    });
}