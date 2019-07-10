function test() {
    console.log("Controller");
    var stat = new Stat({
        LV: 100,
        HP: 255,
        ATK: 255,
        DEF: 255,
        SAT: 255,
        SDF: 255,
        SPD: 255,
        EXP: 255,
        friendship: 255
    });
    console.log(stat);
}
$(function(){
    test();
});
