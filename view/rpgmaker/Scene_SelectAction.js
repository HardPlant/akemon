/**
 * 
 * @param {*} actionList
 */
function selectAction(actionList) {
    return "Action"
}

function Scene_SelectAction() {
    this.initialize.apply(this, arguments);
}

Scene_SelectAction.prototype = Object.create(Scene_Base.prototype);
Scene_SelectAction.prototype.constructor = Scene_SelectAction;

Scene_SelectAction.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
}

Scene_SelectAction.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
}
