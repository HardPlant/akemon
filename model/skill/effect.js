function Effect(turn) {
    this.turn = turn;
    this.onBeforeHit = function(doll){};
    this.onHit = function(doll){};
    this.onAfterHit = function(doll){};
}

function RankEffect(stat, amount) {
    var effect = new Effect(-1);
    effect.onHit = function(destDoll) {
        if (typeof(destDoll.ranks[stat]) === "undefined") {
            destDoll.ranks[stat] = 0;
        }

        destDoll.ranks[stat] += amount;

        if (destDoll.ranks[stat] > 6)
            destDoll.ranks[stat] = 6;
        if (destDoll.ranks[stat] < -6)
            destDoll.ranks[stat] = -6;

    };
    return effect;
}

function OneHitKOEffect(amount) {
    var effect = new Effect();

    effect.onHit = function(destDoll) {
        var beforeHP = destDoll.stat.HP;
        var fullHP = destDoll.fullStat.HP;

        destDoll.stat.HP = 0;
        destDoll.event.onOneHitKO(destDoll, beforeHP, fullHP);
    }

    return effect;
}

function StatusEffect(status, prob) {
    var effect = new Effect();
    effect.onHit = function(destDoll) {
        destDoll.status = new Status(status, prob);
    };
    
    return effect;
}

function FixedDamageEffect(amount) {
    var effect = new Effect();
    
    effect.onHit = function(destDoll) {
        destDoll.stat.HP -= amount;
    }

    return effect;
}

function ChainEffect() {
    var effect = new Effect();

    return effect;
}

function ChangeWeatherEffect() {
    var effect = new Effect();

    return effect;
}
function MultipleAttackEffect(min, max) {
    var effect = new Effect();

    return effect;
}

function NoEffect() {
    var effect = new Effect();

    return effect;
}

function BonusCriticalEffect() {
    var effect = new Effect();

    return effect;
}

function MoneyMakingEffect() {
    var effect = new Effect();

    return effect;
}
