var Doll_Div = {};

var $ = $ || require("jquery");

Doll_Div.Ally = function(idol) {
    this.dom = document.createElement("div");
    this.dom.id = "ally_doll";
    this.dom.style.backgroundImage = "url(assets/sprite/" + idol.sprite_name + "/back.png)";
};

Doll_Div.Enemy = function(idol) {
    this.dom = document.createElement("div");
    this.dom.id = "enemy_doll"
    this.dom.style.backgroundImage = "url(assets/sprite/" + idol.sprite_name + "/front.png)";
};

Doll_Div.faint = function(doll_div) {
    this.whiteArea = document.createElement("div");
    this.whiteArea.style.zIndex = "10";
    this.whiteArea.style.backgroundColor = "white";
    this.whiteArea.style.top = addPercent(doll_div.style.top, "10%");
    doll_div.css("top");
    $(this.whiteArea).animate({top: "10%", left: "10%"});
};

Doll_Div.withdraw = function(doll_div) {

};

Doll_Div.appear = function(doll_div) {

};

Doll_Div.effect = {};

Doll_Div.effect.lvlUp = function(doll_div) {

};

Doll_Div.effect.abilityChange = function(doll_div) {

};

function addPercent(from, to) {
    var a = Number.parseInt(from);
    var b = Number.parseInt(to);
    var result = "" + (a + b) + "%";

    return result;
}