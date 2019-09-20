var fs = require("fs");
eval(fs.readFileSync("model/phase/AppearPhase.js").toString());

var mockBattle = {
    battleType: battleType,
    playingIdx: playingIdx,
    trainers: trainers,
    phases: phases,
    metadata: metadata,
    leftPlayer: [],
    rightPlayer: []
};
var phase;

it("inits", function() {
    phase = new AppearPhase(mockBattle);
    expect(phase).not.toBeUndefined();
});

it ("place left player", function() {
    var leftPlayer = trainers.filter(trainer=>trainer.idx === mockBattle.idx);
    
    var expectIdx = leftPlayer.map(player=>player.idx);
    var leftPlayerIdx = phase.LeftPlayer().map(player=>player.idx);
    
    expect(expectIdx.sort()).toEqual(leftPlayerIdx.sort());
});

it ("place right player", function() {

});

it ("set left player's left doll", function() {

});

it ("set right player's left doll", function() {

});

it ("shows appear message", function() {

});