/**
 * 
 * @param {*} player 
 */
function selectDoll(player) {
    return "Doll";
}

function Scene_SelectDoll() {
    this.initialize.apply(this, arguments);
}

Scene_SelectDoll.prototype = Object.create(Scene_Base.prototype);
Scene_SelectDoll.prototype.constructor = Scene_SelectDoll;

Scene_SelectDoll.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
}

Scene_SelectDoll.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
}
