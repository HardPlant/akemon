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
                    $gameSystem.addMyCount(args[1]);
                    break;
                case 'show':
                    $gameSystem.showMyCount();
                    break;
            }
        }
    };
})();
