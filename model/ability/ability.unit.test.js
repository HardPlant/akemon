const fs = require("fs");
eval(fs.readFileSync("model/ability/ability.js") + "");

it("위협", function() {
    var intimate = new Ability();
    intimate.onBattleEngage = function(battle) {
        //console.log("");
        //Show Effect
        battle.enemySet.forEach(function(){

        });
    };
});

it("복슬복슬", function() {

});
it("짖궂은마음", function() {

});
it("위협", function() {

});
