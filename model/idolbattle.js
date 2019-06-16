
const Idol = require("./idol");
const Skill = require("./skill");

const IdolBattle = {
    IdolBattle: function () {
        this.playerDolls = [];
        this.enemyDolls = [];
        this.playerSet = [];
        this.enemySet = [];
        this.dolls = [];
        this.effects = [];
        this.dollsInBattle = 1;
        this.randomness = true;

        function startBattle(player, enemy, dollsInBattle) {
            this.dollsInBattle = dollsInBattle || 1;
            this.playerDolls = player.dolls;
            this.enemyDolls = enemy.dolls;

            for(var i=0; i<dollsInBattle; i++) {
                if (i < this.playerDolls.length) {
                    this.playerSet.push(this.playerDolls[i]);
                }
                if (i < this.enemyDolls.length) {
                    this.enemySet.push(this.enemyDolls[i]);
                }
            }
            this.playerSet.forEach(doll => {
                this.dolls.push(doll);
            });
            this.enemySet.forEach(doll => {
                this.dolls.push(doll);
            });
        }

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

        this.applyEffect = function(modifier) {
            this.effects.forEach(effect => {
                effect.apply(modifier);
            });

            return modifier;
        }

        this.setPlayer = setPlayer;
        this.setEnemy = setEnemy;
        this.startBattle = startBattle;
    },

    progress: function (battle, playerPlan, enemyPlan) {
        battle.priority = this.getDollPriorityBySpeed(battle);
        
        if (typeof(playerPlan) === "undefined") {
            battle.priority.forEach((doll) => {
                if (Idol.isUnmoveable(doll)) {
                    return;
                }

                var skillList = Idol.getAvailableSkill(doll);

                var skill = IdolBattle.selectAvailableSkill(battle, skillList);
                var target = IdolBattle.selectTargetForDoll(battle, doll);

                Skill.apply(skill, doll, target, battle);
            });
        } else {
            battle.priority.forEach((doll) => {
                if (Idol.isUnmoveable(doll)) return;

                if (battle.playerSet.indexOf(doll) > -1) {
                    var index = battle.playerSet.indexOf(doll);

                    Skill.apply(
                        doll.SkillList[playerPlan[index].skillIdx],
                        doll,
                        battle.enemySet[playerPlan[index].targetDoll],
                        battle);
                } else {
                    var index = battle.enemySet.indexOf(doll);

                    Skill.apply(doll.SkillList[enemyPlan[index].skillIdx],
                         doll,
                         battle.playerSet[enemyPlan[index].targetDoll],
                         battle);
                }
            });
        }
        
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
            (doll) => { return !Idol.isFaint(doll) }
        ).length !== 0
            ||
        battle.enemySet.filter(
            (doll) => { return !Idol.isFaint(doll) }
        ).length !== 0) {
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
    exchange(battle, srcIdol, destIdol) {
        battle.dolls = battle.dolls.filter(elem => elem !== srcIdol);
        
        if (battle.playerSet.indexOf(srcIdol) !== -1) {
            battle.playerSet = battle.playerSet.filter(elem => elem !== srcIdol);
            battle.playerSet.push(destIdol);
        } else {
            battle.enemySet = battle.enemySet.filter(elem => elem !== srcIdol);
            battle.enemySet.push(destIdol);
        }
        
        battle.dolls.push(destIdol);
        battle.priority = this.getDollPriorityBySpeed(battle);
        
    }
}

module.exports = IdolBattle;