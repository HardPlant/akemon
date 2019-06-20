const Idol = require("./idol");
const Skill_idx = require("./skill_idx");
/*
* Idol at level 100, for demo.
* 
*
*
*/
const idolTable = {
    0: function() {
        var idol = new Idol.Idol({
            idx: 1,
            nickname: "mirai",
            LV: 100,
            baseHP: 


        });
        Skill_idx.getBaseByIdx();

        return idol;
    }
}

function idol_idx(){};
function getBaseByIdx(idx) {
    return idolTable[idx]();
}

idol_idx.getBaseByIdx = getBaseByIdx;
module.exports = idol_idx;