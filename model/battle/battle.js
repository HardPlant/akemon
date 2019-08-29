function Battle() {
    this.force = {};
    this.dollsInBattle = 1;

    this.getSkillRandom = function() {
        return 1;
    };
    this.getDefaultCritical = function() {
        return 0;
    };
    this.weather = {};
}

(function($) {
    //트레이너 정보를 가져와 첫 번째 아이돌을 꺼내고, 기본 날씨를 세팅한다.
    $.startBattle = function(players, weather) {
        this.weather = weather;

        players.forEach(function(player) {
            var availableDoll = player.dolls.filter((doll)=>!isFaint(doll));
        
            for (var i = 0; i < dollsInBattle; i++) {
                this.deployDoll(player, availableDoll[i]);
            }

        });
    };

    $.deployDoll = function(player, doll) {
        doll.ability.onDeploy();
    };

    // 플레이어 계획, 적 계획을 받아
    $.progressTurn = function(plans) {

    };
})(Battle);