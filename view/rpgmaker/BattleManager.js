/**
 * Battle Manager Controller
 */

function BattleManager() {
    createBattleScene();
    startBattleProgress();
    while(gameEnded) {
        result = loopProgress();
    }
    endBattleProgress();
}

function createBattleScene() {

}

function startBattlePrgress() {
    if ("wild") {
        showWildDoll();
    }
    else if ("normalPlayer") {
        showOpponent();
    }
    showPlayer();
    drawFirstDoll();
}

function loopProgress() {
}

function endBattleProgress() {
}

function selectAction() {

}

function selectDoll() {

}

function selectMove() {

}

function BattleEvents() {

}
