const fs = require("fs");
eval(fs.readFileSync("model/doll/doll.js") + "");
eval(fs.readFileSync("model/stat/stat.js") + "");
eval(fs.readFileSync("model/skill/skill.js") + "");
eval(fs.readFileSync("model/ability/ability.js") + "");
eval(fs.readFileSync("model/doll/doll_idx.js") + "");
eval(fs.readFileSync("model/skill/skill.js")+"");
eval(fs.readFileSync("model/skill/effect.js")+"");
eval(fs.readFileSync("model/skill/skill_data.js")+"");
eval(fs.readFileSync("model/battle/battle.js") + "");

describe("Doll and Stat DB", ()=> {
    test("create a doll by idx", ()=> {
        var doll = getDollByIdx(10000);
        expect(doll).not.toBeUndefined();
        expect(doll.baseStat).not.toBeUndefined();
    });

    test("create a skill by idx", ()=> {
        var skill = getSkillData(0);
        expect(skill).not.toBeUndefined();
        expect(skill.name).not.toBeUndefined();
    });

    test("doll can have skill", ()=> {
        var doll = getDollByIdx(10000);
        var skill = getSkillData(0);
        
        learnSkill(doll, skill);

        expect(doll.skillList[0]).toBe(skill);
    });
});

describe("Doll + Skill", ()=> {
    it("has a skill", ()=> {

    });
});

describe("Doll + ability", function() {

});