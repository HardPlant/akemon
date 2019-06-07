
const Idol = require("./idol");
const Skill = require("./skill");

const IdolBattle = {
    IdolBattle: function () {
        this.playerSet = [];
        this.enemySet = [];
        this.dolls = [];
        this.effects = [];

        function setPlayer(dollSet) {
            this.playerSet = dollSet;
            dollSet.forEach(doll => {
                this.dolls.push(doll);
            });
        }

        function setEnemy(dollSet) {
            this.enemySet = dollSet;
            dollSet.forEach(doll => {
                this.dolls.push(doll);
            });
        }

        this.setPlayer = setPlayer;
        this.setEnemy = setEnemy;
    },

    progress: function (battle) {
        battle.priority.forEach((doll) => {
            if (Idol.isFaint(doll)) {
                return;
            }

            var skillList = Idol.getAvailableSkill(doll);

            var skill = IdolBattle.selectAvailableSkill(battle, skillList);
            var target = IdolBattle.selectTargetForDoll(battle, doll);

            Skill.apply(skill, doll, target);
        });
    },

    getDollPriorityBySpeed(battle) {
        return battle.dolls.sort(
            (doll1, doll2) => { return doll1.SPD < doll2.SPD ? 1 : -1 });
    },

    selectTargetForDoll(battle, doll) {
        if (battle.playerSet.indexOf(doll) !== 0) {
            return battle.enemySet[0];
        } else {
            return battle.playerSet[0];
        }
    },

    selectAvailableSkill(battle, skillList) {
        return skillList[0];
    },

    isGameEnded(battle) {
        if (battle.playerSet.filter(
            (doll) => { return Idol.isFaint(doll) }
        ).length === 0
            ||
        battle.enemySet.filter(
            (doll) => { return Idol.isFaint(doll) }
        ).length === 0) {
            return false;
        }
        else
            return true;
    },
    isPlayerWon(battle) {
        if (!IdolBattle.isGameEnded(battle)) return false;
        
        return battle.enemySet.filter(
            (doll) => { return Idol.isFaint(doll) }
        ).length === 0;
    },
    applyEffect(idolbattle, modifier) {
        idolbattle.effects.forEach(effect => {
            effect.apply(modifier);
        });
    }
}

module.exports = IdolBattle;