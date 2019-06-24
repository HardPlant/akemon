const Idol = require("./idol");
const skill_idx = require("./skill_idx");
/*
* Idol at level 100, for demo.
* 
*
*
*/
const idolTable = {
    10000: function() {
        var idol = new Idol.Idol({
            idx: 10000,
            tag: "[test]",
            nickname: "mirai",
            LV: 5,
            HP: 30,
            ATK: 15,
            SPE: 20,
            DEF: 10,
            SDF: 15,
            SPD: 15,
        });
        idol.SkillList.push(skill_idx.getBaseByIdx(2));
        
        return idol;
    },
    10001: function() {
        var idol = new Idol.Idol({
            idx: 10001,
            tag: "[test]",
            nickname: "sizuka",
            LV: 5,
            HP: 20,
            ATK: 10,
            SPE: 35,
            DEF: 15,
            SDF: 20,
            SPD: 10,
            SkillList: []
        });
        idol.SkillList.push(skill_idx.getBaseByIdx(2));
        idol.SkillList.push(skill_idx.getBaseByIdx(5));

        return idol;
    },
    10002: function() {
        var idol = new Idol.Idol({
            idx: 10002,
            tag: "[test]",
            nickname: "tsubasa",
            LV: 5,
            HP: 25,
            ATK: 25,
            SPE: 4,
            DEF: 15,
            SDF: 10,
            SPD: 21,
            SkillList: []
        });
        idol.SkillList.push(skill_idx.getBaseByIdx(3));
        
        return idol;
    },
    10003: function() {
        var idol = new Idol.Idol({
            idx: 10003,
            tag: "[test]",
            nickname: "kotoha",
            LV: 5,
            HP: 20,
            ATK: 5,
            SPE: 30,
            DEF: 15,
            SDF: 10,
            SPD: 15,
            SkillList: []
        });
        idol.SkillList.push(skill_idx.getBaseByIdx(2));

        return idol;
    },
    10004: function() {
        var idol = new Idol.Idol({
            idx: 10004,
            tag: "[test]",
            nickname: "megumi",
            LV: 5,
            HP: 20,
            ATK: 25,
            SPE: 25,
            DEF: 15,
            SDF: 15,
            SPD: 20,
            SkillList: []
        });
        idol.SkillList.push(skill_idx.getBaseByIdx(3));

        return idol;
    },
    10005: function() {
        var idol = new Idol.Idol({
            idx: 10005,
            tag: "[test]",
            nickname: "elena",
            LV: 5,
            HP: 35,
            ATK: 10,
            SPE: 5,
            DEF: 25,
            SDF: 35,
            SPD: 20,
            SkillList: []
        });
        idol.SkillList.push(skill_idx.getBaseByIdx(3));
        idol.SkillList.push(skill_idx.getBaseByIdx(4));

        return idol;
    },
}

function idol_idx(){};
function getBaseByIdx(idx) {
    return idolTable[idx]();
}

idol_idx.getBaseByIdx = getBaseByIdx;
module.exports = idol_idx;