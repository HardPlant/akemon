
module.exports = {
    IdolBattle: function() {
        this.dolls = [];

        function setPlayer(dollSet) {
            dollSet.forEach(doll => {
                this.dolls.push(doll);
            });
        }
        
        function setEnemy(dollSet) {
            this.dolls.push(dollSet);
        }

        this.setPlayer = setPlayer;
        this.setEnemy = setEnemy;
    },

    act: function() {

    },

    getDollPriorityBySpeed(battle) {
        return battle.dolls.sort(
            (doll1, doll2)=>{return doll1.SPD < doll2.SPD ? 1 : -1});
    }
}
