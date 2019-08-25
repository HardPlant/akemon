/**
 * @see https://www.5ing-myway.com/rpgmake-mv-save-plugindata/
 */


/**
 * $gameSystem（Game_Systemオブジェクト）
$gameScreen（Game_Screenオブジェクト）
$gameTimer（Game_Timerオブジェクト）
$gameSwitches（Game_Switchesオブジェクト）
$gameVariables（Game_Variablesオブジェクト）
$gameSelfSwitches（Game_SelfSwitchesオブジェクト）
$gameActors（Game_Actorsオブジェクト）
$gameParty（Game_Partyオブジェクト）
$gameMap（Game_Mapオブジェクト）
$gamePlayer（Game_Playerオブジェクト）
 */

// 전역으로 설정 안할 시 load 중 undefined
function Game_MyCount() {
    this.initialize.apply(this, arguments);
}
(function () {
    'use strict';

    // 定数の定義
    const PLUGIN_NAME = "MyCount";

    // ---------- プラグインコマンドの定義 ここから ----------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === PLUGIN_NAME) {
            switch (args[0]) {
                case 'add':
                    $gameSystem.MyCount().add(args[1]);
                    break;
                case 'show':
                    $gameSystem.MyCount().show();
                    break;
            }
        }
    };
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._myCount = new Game_MyCount();
    };

    Game_System.prototype.MyCount = function() {
        return this._myCount;
    }

    Game_MyCount.prototype = Object.create(Game_MyCount.prototype);
    Game_MyCount.prototype.constructor = Game_MyCount;

    Game_MyCount.prototype.initialize = function() {
        this._count = 0;
    };

    Game_MyCount.prototype.add = function(val) {
        val = Number(val || 0);
        if (!Number.isNaN(val)) {
            this._myCount += val;
    }

    Game_MyCount.prototype.show = function() {
        $gameMessage.add("현재 카운트는" + this._myCount);
    }


    // Game_System.prototype.addMyCount = function(val) {
    //     val = Number(val || 0);
    //     if (!Number.isNaN(val)) {
    //         this._myCount += val;
    //     }
    // };

    // Game_System.prototype.showMyCount = function() {
    //     $gameMessage.add("현재 카운트는" + this._myCount);
    // };

})();
