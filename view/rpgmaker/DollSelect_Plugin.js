/*:
 * @plugindesc A Pokemon-Style Battle Plugin.
 * @author HardPlant
 * 
 * @help
 * Plugin Command:
 *  DollBattle
 *  DollBattle 
 */
(function() {
    'use strict';
    var pluginName = "DollSelect";
    var _Game_Interpreter_pluginCommand = _Game_Interpreter.prototype.pluginCommand;
    
    var parameters = PluginManager.parameters(pluginName);

    Game_Interpreter_pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch(args[0]) {
                case 'open':
                    SceneManager.push(Scene_EmployActor)
                    break;
    
            }
        }
    }

    function Scene_EmployActor() {
        this.initialize.apply(this, arguments);
    }

    Scene_EmployActor.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_EmployActor.prototype.constructor = Scene_EmployActor;

    Scene_EmployActor.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    }

    Scene_EmployActor.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        
        this.createIndexWindow();
        this.createGoldWindow();
        this.createCommandWindow();

        this.activateIndexWindow();
    }

    Scene_EmployActor.prototype.createIndexWindow = function() {
        var wx = 0;
        var wy = 0;
        var ww = Graphics.width / 3;
        var wh = Graphics.height;

        this._indexWindow = new Window_EmployActorIndex(wx, wy, ww, wh);
        this._indexWindow.setHandler("ok", this.onIndexOk.bind(this));
        this._indexWindow.setHandler("cancel", this.onIndexCancel.bind(this));

        this.addWindow(this._indexWindow);
    }

    Scene_EmployActor.prototype.createGoldWindow = function() {
        this._goldWindow = new Window_Gold(0, 0);

        var wx = Graphics.width - this._goldWindow.width;
        this._goldWindow.move(wx, 0, this._goldWindow.width, this._goldWindow.height);

        this.addWindow(this._goldWindow);
    }

    Scene_EmployActor.prototype.createCommandWindow = function() {
        this._commandWindow = new Window_EmployCommand(0, 0);

        var wx = Graphics.width - this._commandWindow.width;
        var wy = Graphics.height - this._commandWindow.height;

        this._commandWindow.move(wx, wy, this._commandWindow.width, this._commandHeight);
        this._commandWindow.setHandler('employ', this.onCommandEmploy.bind(this));
        this._commandWindow.setHandler('cancel', this.onCommandCancel.bind(this));
        
        this.hideCommandWindow();

        this.addWindow(this._commandWindow);
    }

    Scene_EmployActor.prototype.onIndexOk = function () {
        this.activateCommandWindow();
    }

    Scene_EmployActor.prototype.onIndexCancel = function() {
        this.popScene();
    }

    Scene_EmployActor.prototype.onCommandEmploy = function() {
        this.hideCommandWindow();
        this.employ();
        this.activateIndexWindow();
    }

    Scene_EmployActor.prototype.onCommandCancel = function() {
        this.hideCommandWindow();
        this._indexWindow.activate();
    }

    Scene_EmployActor.prototype.employ = function() {

    };

    Scene_EmployActor.prototype.activateIndexWindow = function() {
        this._indexWindow.activate();
        this._indexWindow.refresh();
    }

    Scene_EmployActor.prototype.activateCommandWindow = function() {
        this._commandWindow.activate();
        this._commandWindow.select(0);
        this._commandWindow.show();
    }

    Scene_EmployActor.prototype.hideCommandWindow = function() {
        this._commandWindow.deselect();
        this._commandWindow.deactive();
        this._commandWindow.hide();
    }

    function Window_EmployActorIndex() {
        this.initialize.apply(this.arguments);
    }

    Window_EmployActorIndex.prototype = Object.create(Window_Selectable.prototype);
    Window_EmployActorIndex.prototype.constructor = Window_EmployActorIndex;

    Window_EmployActorIndex.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);

        this.refresh();
        this.select(0);
        this.activate();
    };

    function Window_EmployCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_EmployActorIndex.prototype.refresh = function() {
        this.createContents();
        this.makeActorList();
        this.drawAllItems();
    }
    Window_EmployActorIndex.prototype.makeActorList = function() {
        this._list = [];

        for (var i = 1; i < $dataActors.length; i++) {
            var actor = $dataActors[i];

            if (hasTag(actor.meta, 'EASalary') && !isJoinedParty(actor)) {
                this._list.push(actor);
            }
        }
    };

    Window_EmployActorIndex.prototype.maxCols = function() {
        return 1;
    };

    Window_EmployActorIndex.prototype.maxItems = function() {
        return this._list? this._list.length : 0;
    };

    Window_EmployActorIndex.prototype.drawItem = function(index) {
        var actor = this._list[index];
        var salary = actor.meta["EASalary"] + TextManager.currencyUnit;
        var rect = this.itemRect(index);;

        this.drawText(actor.name, rect.x, rect.y, 100);
        this.drawText(salary, rext.x + 130, rext.y, 100, "right");
    };

    function hasTag(obj, tagName) {
        for (var propertyName in obj) {
            if (propertyName === tagName) {
                return true;
            }
        }
        return false;
    }

    function isJoinedParty(actor) {
        for (var i = 0; i < $gameParty._actors.length; i++) {
            if ($gameParty._actors[i] === actor.id) {
                return true;
            }
        }
        return false;
    }

    Window_EmployCommand.prototype = Object.create(Window_Command.prototype);
    Window_EmployCommand.prototype = Window_EmployCommand;

    Window_EmployCommand.prototype.initialize = function(x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
    };

    Window_EmployCommand.prototype.makeCommandList = function() {
        this.addCommand("Employ", "employ", true);
    }
})();
