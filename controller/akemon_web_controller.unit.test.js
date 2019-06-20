const Idol = require("../model/idol");
const Skill = require("../model/skill");
const skill_idx = require("../model/skill_idx");

const request = require("request");
var baseUrl = 'http://localhost:3000';

var startCommand = {
    uri: baseUrl + '/',
    method: 'POST',
    json: true,
    body: {

    }
};

/*
* 이 테스트는 서버가 started되었다고 가정한다.
* 
*/

describe("start", ()=> {
    var idols = {};
    var playerPlan;
    var enemyPlan;

    beforeAll(()=>{
        createIdols(idols);
    });

    it("starts", (done)=> {

        startCommand.body = {};

        request.post(startCommand, (err, response, body)=>{

            var idolbattle = response.body.result;
            
            expect(idolbattle.playerSet.length).toBe(1);
            expect(idolbattle.enemySet.length).toBe(1);
            
            console.log(`코토리는 ${idolbattle.enemySet[0].nickname}를 꺼냈다`);
            expect(idolbattle.enemySet[0]).toBe(idols.kotoha);
    
            console.log(`가랏, ${idolbattle.playerSet[0].nickname}!`);
            expect(idolbattle.playerSet[0]).toBe(idols.mirai);    

            done();
        });
    });
});

function createIdols(idols) {
    idols.mirai = new Idol.Idol({
        nickname: "Mirai",
        LV: 5,
        HP: 30,
        ATK: 15,
        SPE: 20,
        DEF: 10,
        SDF: 15,
        SPD: 15,
        SkillList: []
    });
    idols.sizuka = new Idol.Idol({
        nickname: "sizuka",
        LV: 5,
        HP: 20,
        ATK: 10,
        SPE: 35,
        DEF: 15,
        SDF: 20,
        SPD: 10,
        SkillList: []
    });
    idols.tsubasa = new Idol.Idol({
        nickname: "tsubasa",
        LV: 5,
        HP: 25,
        ATK: 25,
        SPE: 4,
        DEF: 15,
        SDF: 10,
        SPD: 21,
        SkillList: []
    });
    idols.kotoha = new Idol.Idol({
        nickname: "kotoha",
        LV: 5,
        HP: 20,
        ATK: 5,
        SPE: 30,
        DEF: 15,
        SDF: 10,
        SPD: 15,
        SkillList: []
    });
    idols.megumi = new Idol.Idol({
        nickname: "megumi",
        LV: 5,
        HP: 20,
        ATK: 25,
        SPE: 25,
        DEF: 15,
        SDF: 15,
        SPD: 20,
        SkillList: []
    });
    idols.elena = new Idol.Idol({
        nickname: "elena",
        LV: 5,
        HP: 35,
        ATK: 10,
        SPE: 5,
        DEF: 25,
        SDF: 35,
        SPD: 20,
        SkillList: []
    });
    idols.mirai.SkillList.push(skill_idx.getBaseByIdx(2));
    idols.kotoha.SkillList.push(skill_idx.getBaseByIdx(2));
    idols.megumi.SkillList.push(skill_idx.getBaseByIdx(3));
    idols.tsubasa.SkillList.push(skill_idx.getBaseByIdx(3));
    idols.elena.SkillList.push(skill_idx.getBaseByIdx(3));
    idols.elena.SkillList.push(skill_idx.getBaseByIdx(4));
    idols.sizuka.SkillList.push(skill_idx.getBaseByIdx(2));
    idols.sizuka.SkillList.push(skill_idx.getBaseByIdx(5));
}