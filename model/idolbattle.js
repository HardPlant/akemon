
module.exports = {
    IdolBattle: function() {
        this.dolls = [];

        function setPlayer() {

        }
        this.setPlayer = setPlayer;

        function setEnemy() {
    
        }
        this.setEnemy = setEnemy;
    },



    act: function() {

    },

    getDollPriorityBySpeed(battle) {
        return battle.dolls.sort(
            (doll1, doll2)=>{return doll1.SPD < doll2.SPD ? 1 : -1});
    }
}
