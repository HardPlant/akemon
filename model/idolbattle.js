
module.exports = {
    IdolBattle: function() {
        this.playerSet = [];
        this.enemySet = [];
        this.dolls = [];

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

    act: function() {

    },

    getDollPriorityBySpeed(battle) {
        return battle.dolls.sort(
            (doll1, doll2)=>{return doll1.SPD < doll2.SPD ? 1 : -1});
    },

    selectTargetForDoll(battle, doll) {
        if (battle.playerSet.indexOf(doll) !== 0) {
            return battle.enemySet[0];
        } else {
            return battle.playerSet[0];
        }
    },
    
    selectAvailableSkill(skillList) {
        return skillList[0];
    },
}
