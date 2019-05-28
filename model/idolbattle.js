
const IdolBattle = {
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
        priority.forEach((doll)=> {
            var skillList = Idol.getAvailableSkill(doll);
            var skill = IdolBattle.selectAvailableSkill(battle, skillList);

            expect(skill.effects).not.toBeUndefined();

            var target = IdolBattle.selectTargetForDoll(battle, doll);

            Skill.apply(skill,doll,target);

            
        });
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
    
    selectAvailableSkill(battle, skillList) {
        return skillList[0];
    },
}

module.exports = IdolBattle;