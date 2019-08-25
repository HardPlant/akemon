function SkillBase() {
    this.idx = idx;
    this.name = name;
    this.type = type;
    this.pp = pp;
    this.effect = effect;
    this.srcStat = srcStat;
    this.destStat = destStat;
    this.bonusCritical = 0;
}
var skillCount = 0;
function nextIdx() {return skillCount++;}

function PhysicalSkill(name, type, power, accuracy, pp, effect) {
    return Skill(nextIdx(), name, type, power, accuracy, pp, effect, "ATK", "DEF");
}

function SpecialSkill(name, type, power, accuracy, pp, effect) {
    return Skill(nextIdx(), name, type, power, accuracy, pp,  effect, "SAT", "SDF");
}

var skillData = [
     new PhysicalSkill("막치기", "Normal", 40, 100, 35, new NoEffect())
    ,new PhysicalSkill("태권당수", "Fight", 50, 100, 25, new BonusCriticalEffect(1))
    ,new PhysicalSkill("연속뺨치기", "Normal", 15, 85, 10, new MultipleAttackEffect(2,5))
    ,new PhysicalSkill("연속펀치", "Normal", 18, 85, 15, new MultipleAttackEffect(2,5))
    ,new PhysicalSkill("메가톤펀치", "Normal", 80, 85, 15, new NoEffect())
    ,new PhysicalSkill("고양이돈받기", "Normal", 40, 100, 15, new MoneyMakingEffect())
    ,new PhysicalSkill("불꽃펀치", "Fire", 75, 100, 15, new StatusEffect("Burn", 0.1))
    ,new PhysicalSkill("냉동펀치", "Ice", 75, 100, 15, new StatusEffect("Frozen", 0.1))
    ,new PhysicalSkill("번개펀치", "Electric", 75, 100, 15, new StatusEffect("Paralyze", 0.1))        
    
    ,new SpecialSkill("따끈따끈보이스", "Normal", 40)
];

function getSkillData(idx) {
    return skillData[idx];
}




