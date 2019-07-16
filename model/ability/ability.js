function Ability(name) {
    this.name = name;
    this.onGrassWalk = function(){};
    this.onBattleEngage = function(){};
    this.onBattleWithdraw = function(){};
    this.onSelectMove = function(){};
    this.onUseMove = function(){};
    this.onHitMove = function(){};
    this.onDamage = function(){};
    this.onTurnStart = function(){};
    this.onTurnEnd = function(){};
}
