import { isNumber } from "util";

/*:
 * @plugindesc A Pokemon-Style Battle Plugin.
 * @author HardPlant
 * 
 * @param defaultAnimationIndex
 * @dest Default index of animation to play.
 * @default 1
 * @type Number
 * @min 1
 * 
 * @help
 * Plugin Command:
 *  DollBattle
 *  DollBattle 
 */
(function() {
    'use strict';
    var pluginName = "DollBattle";
    const DEFAULT_ANIMATION_INDEX = 1;
    
    var _Game_Interpreter_pluginCommand = _Game_Interpreter.prototype.pluginCommand;
    
    var parameters = PluginManager.parameters(pluginName);
    var defaultAnimationIndex = Number(parameters['defaultAnimationIndex']) || DEFAULT_ANIMATION_INDEX;
    if (Number.isNaN(defaultAnimationIndex) {
        defaultAnimationIndex = DEFAULT_ANIMATION_INDEX;
    })

    Game_Interpreter_pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch(args[0]) {
                case 'show':
                    SceneManager.push(Scene_MyWindow);
                    SceneManager.prepareNextScene(args[1]);
                    break;
    
            }
        }
    }
    
    //
    function Scene_MyWindow() {
        this.initialize.apply(this, arguments);
    }

    // 프로토타입 정의
    Scene_MyWindow.prototype = Object.create(Scene_Base.prototype);
    Scene_MyWindow.prototype.constructor = Scene_MyWindow;
    
    // Scene 생성시
    Scene_MyWindow.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    }

    //SceneManager.prepareNextScene을 이용한 인자처리
    Scene_MyWindow.prototype.prepare = function(description) {
        this._description = description;
    }

    // 윈도우 작성 부분
    Scene_MyWindow.prototype.create = function() {
        Scene_Base.prototype.create.call(this);

        this.createWindowLayer();
        this.createMainWindow();
        this._mainWindow.drawText(this._description, 0, 0, this._mainWindow.width);

        this.createCommandWindow();
    }

    // 메인 윈도우
    Scene_MyWindow.prototype.createMainWindow = function() {
        var ww = 350;
        var wh = 100;

        var wx = (Graphics.width - ww) / 2;
        var wy = (Graphics.height - wh) / 2;

        this._mainWindow = new Window.Base(wx, wy, ww, wh);
        this.addWindow(this._mainWindow);
    };

    // 커맨드 윈도우

    Scene_MyWindow.prototype.createCommandWindow = function() {
        var wx = this._mainWindow.x;
        var wy = this._mainWindow.y + this._mainWindow.height + 50;

        this._commandWindow = new Window_MyCommandWindow(wx, wy);
        this._commandWindow.setHandler('ok', this.onCommandOk.bind(this));
        this.addWindow(this._commandWindow);
    };
    
    Scene_MyWindow.prototype.onCommandOk = function() {
        this.popScene();
    };

    function Window_MyCommandWindow() {
        this.initialize.apply(this, arguments);
    }

    Window_MyCommandWindow.prototype = Object.create(Window_Command.prototype);
    Window_MyCommandWindow.prototype.constructor = Window_MyCommandWindow;

    Window_MyCommandWindow.prototype.initialize = function(x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
    }

    Window_MyCommandWindow.prototype.makeCommandList = function() {
        this.addCommand("취소", 'back', true);
    }
    function showAnimation(index) {
        if (!isNumber(index) || index < 1 || index > $dataAnimations.length) {
            index = defaultAnimationIndex;
        }
        $gamePlayer.requestAnimation(index);
    }
})();
