/**
 * 
 * @param {*} actionList
 */
function selectMove(moveList) {
    return "move"
}

function Scene_SelectTarget() {
    this.initialize.apply(this, arguments);
}

Scene_SelectTarget.prototype = Object.create(Scene_Base.prototype);
Scene_SelectTarget.prototype.constructor = Scene_SelectTarget;

Scene_SelectTarget.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
}

Scene_SelectTarget.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
}
