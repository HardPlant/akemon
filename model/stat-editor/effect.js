function Effect(turn) {
    this.turn = turn;
    this.onBeforeHit = undefined;
    this.onHit = undefined;
    this.onAfterHit = undefined;
}

function RankEffect(stat, amount) {
    var effect = new Effect(-1);
    effect.onHit = function(destDoll) {
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
        destDoll.HP = 0;
        destDoll.event.onOneHitKO();
    }

    return effect;
}

function StatusEffect(prob, status, turn) {
    var effect = new Effect();
    effect.onHit = function(destDoll) {
        destDoll.status = new Status(status, turn);
    };
    
    return effect;
}

function FixedDamageEffect(amount) {
    var effect = new Effect();
    
    effect.onHit = function(destDoll) {
        destDoll.HP -= amount;
    }

    return effect;
}

function NothingHappenedEvent() {
    var effect = new Effect();

    return effect;
}
