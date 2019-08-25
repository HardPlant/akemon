function SkillBase(idx, name, type, pp, effect, srcStat, destStat) {
    this.idx = idx;
    this.name = name;
    this.type = type;
    this.pp = pp;
    this.effect = effect;
    this.srcStat = "";
    this.destStat = "";
    this.classify = "";
    this.bonusCritical = 0;
}
var skillCount = 0;
function nextIdx() {return skillCount++;}

function PhysicalSkill(name, type, pp, effect) {
    return SkillBase(nextIdx(), name, type, pp, effect, "ATK", "DEF");
}

function SpecialSkill(name, type, pp, effect) {
    return SkillBase(nextIdx(), name, type, pp, effect, "SAT", "SDF");
}


new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);
new SpecialSkill("따끈따끈보이스", "Normal", 40);

