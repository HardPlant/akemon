/**
 * 
 * @param {*} actionList
 */
function selectMove(moveList) {
    return "move"
}

function Scene_SelectMove() {
    this.initialize.apply(this, arguments);
}

Scene_SelectMove.prototype = Object.create(Scene_Base.prototype);
Scene_SelectMove.prototype.constructor = Scene_SelectMove;

Scene_SelectMove.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
}

Scene_SelectMove.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
}
