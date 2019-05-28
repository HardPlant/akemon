module.exports = {
    Idol : function(param) {
        if (typeof(param) === "undefined") return NullIdol();
        return {
            idx: param.idx,
            nickname: "mirai",
            HP: 1,
            ATK: 1,
            SPE: 1,
            DEF: 1,
            SDF: 1,
            SPD: 1,
            Skill: [0, 1, 2, 3]
        }
    }
}

const NullIdol = function() {
    return 
    {
        idx: 0
    };
}