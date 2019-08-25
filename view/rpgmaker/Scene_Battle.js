/**
 * @see https://www.5ing-myway.com/create-rpgmaker-plugin-window/
 */

function Scene_Battle() {
    this.initialize.apply(this, arguments);
}

Scene_Battle.prototype = Object.create(Scene_Base.prototype);
Scene_Battle.prototype.constructor = Scene_Battle;

Scene_Battle.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
}

Scene_Battle.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
}
