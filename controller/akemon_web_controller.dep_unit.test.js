// const Idol = require("../model/idol");
// const Skill = require("../model/skill");
// const skill_idx = require("../model/skill_idx");

// const request = require("request");
// var baseUrl = 'http://localhost:3000';

// var startCommand = {
//     uri: baseUrl + '/start',
//     method: 'POST',
//     json: true,
//     body: {
//         player: undefined,
//         enemy: undefined
//     }
// };
// var progressCommand = {
//     uri: baseUrl + '/progress',
//     method: 'POST',
//     json: true,
//     body: {
//         isPlayer: true
//     }
// };

// var setEnemyCommand = {
//     uri: baseUrl + '/enemyPlan',
//     method: 'POST',
//     json: true,
//     body: {
//         enemyPlan: undefined,
//     }
// };
// var setPlayerCommand = {
//     uri: baseUrl + '/playerPlan',
//     method: 'POST',
//     json: true,
//     body: {
//         playerPlan: undefined,
//     }
// };

// var exchangeCommand = {
//     uri: baseUrl + '/exchange',
//     method: 'POST',
//     json: true,
//     body: {
//         srcDoll: undefined,
//         destDoll: undefined
//     }
// };
// var getPlayerSetCommand = {
//     uri: baseUrl + '/playerSet',
//     method: 'GET',
// };
// var getEnemySetCommand = {
//     uri: baseUrl + '/enemySet',
//     method: 'GET',
// };
// /*
// * 이 테스트는 서버가 started되었다고 가정한다.
// * 
// */

// describe("start", ()=> {
//     var idols = {};
//     var playerPlan;
//     var enemyPlan;

//     it("starts", (done)=> {
//         start_phase(idols, done);
//         for(var i=0; i<1000000; i++);
//     });

//     it("1st turn", (done)=> {
//         start_phase(idols, function(){});
//         for(var i=0; i<100000; i++);
//         first_phase(idols, done);
//         for(var i=0; i<1000000; i++);
//     });

//     it("2nd turn", (done)=> {
//         start_phase(idols, function(){});
//         for(var i=0; i<100000; i++);
//         first_phase(idols, function(){});
//         for(var i=0; i<1000000; i++);

//         playerPlan = {
//             0: {
//                 targetDoll: 0,
//                 skillIdx: 0
//             }
//         };
    
//         enemyPlan = {
//             0: {
//                 targetDoll: 0,
//                 skillIdx: 0
//             }
//         };
    
//         setEnemyCommand.body.enemyPlan = enemyPlan;

//         for(var i=0; i<100000; i++);
//         request.post(setEnemyCommand, (err, response, body)=> {
//             var response = response.body.result;
    
//             expect(response).toStrictEqual(enemyPlan);
//         });
    
//         setPlayerCommand.body.playerPlan = playerPlan;
        
//         for(var i=0; i<100000; i++);
//         request.post(setPlayerCommand, (err, response, body)=> {
//             var response = response.body.result;
    
//             expect(response).toStrictEqual(playerPlan);
//         });

//         for(var i=0; i<100000; i++);
//         request.post(progressCommand, (err, response, body)=>{
//             var idolbattle = response.body.result;
            
//             expect(idolbattle.priority.length).toBe(2);

//             console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);
//             console.log(`${idolbattle.priority[1].nickname}의 ${idolbattle.priority[1].SkillList[0].name}!`);
    
//             idols.mirai = idolbattle.priority[0];
//             idols.kotoha = idolbattle.priority[1];    

//             expect(idols.mirai.HP).toBe(13.75);
//             expect(idols.kotoha.HP).toBeLessThan(0);
    
//             expect(idolbattle.isPlayerNeededExchange).toBe(false);
//             expect(idolbattle.isEnemyNeededExchange).toBe(true);
            
//         });

//         exchangeCommand.body.srcDoll = idol.kotoha;
//         exchangeCommand.body.destDoll = idol.megumi;

//         for(var i=0; i<100000; i++);

//         request.post(exchangeCommand, (err, response, body)=>{
            
//             var result = response.body.result;
            
//             expect(result.result).toBe(true);

//             expect(srcDoll).toBe(idols.megumi);
//             expect(destDoll).toBe(idols.kotoha);

//             done();
//         });
//     });
// });

// function start_phase(idols, done) {
//     var mockPlayerGrp = [
//         {
//             name: "미사키",
//             sprite: "",
//             dolls: []
//         }
//     ];
//     var mockEnemyGrp = [
//         {
//             name: "코토리",
//             sprite: "",
//             dolls: []
//         }
//     ];
    
//     startCommand.body = {};
//     startCommand.body.player = [10000, 10001, 10002];
//     startCommand.body.enemy = [10003, 10004, 10005];

//     request.post(startCommand, (err, response, body)=>{

//         var idolbattle = response.body.result;

//         expect(idolbattle.playerSet.length).toBe(1);
//         expect(idolbattle.enemySet.length).toBe(1);
        
//         console.log(`코토리는 ${idolbattle.enemySet[0].nickname}를 꺼냈다`);
//         expect(idolbattle.enemySet[0].nickname).toBe("kotoha");

//         console.log(`가랏, ${idolbattle.playerSet[0].nickname}!`);
//         expect(idolbattle.playerSet[0].nickname).toBe("mirai");    
        
//         done();
//     });
// }

// function first_phase(idols, done) {
//     playerPlan = {
//         0: {
//             targetDoll: 0,
//             skillIdx: 0
//         }
//     };

//     enemyPlan = {
//         0: {
//             targetDoll: 0,
//             skillIdx: 0
//         }
//     };

//     setEnemyCommand.body.enemyPlan = enemyPlan;

//     request.post(setEnemyCommand, (err, response, body)=> {
//         var response = response.body.result;

//         expect(response).toStrictEqual(enemyPlan);
//     });

//     setPlayerCommand.body.playerPlan = playerPlan;
    
//     request.post(setPlayerCommand, (err, response, body)=> {
//         var response = response.body.result;

//         expect(response).toStrictEqual(playerPlan);
//     });

//     request.post(progressCommand, (err, response, body)=>{

//         var idolbattle = response.body.result;
        
//         expect(idolbattle.priority.length).toBe(2);

//         console.log(`${idolbattle.priority[0].nickname}의 ${idolbattle.priority[0].SkillList[0].name}!`);
//         console.log(`${idolbattle.priority[1].nickname}의 ${idolbattle.priority[1].SkillList[0].name}!`);

//         idols.mirai = idolbattle.priority[0];
//         idols.kotoha = idolbattle.priority[1];

//         expect(idols.mirai.HP).not.toBe(30);
//         expect(idols.kotoha.HP).not.toBe(20);

//         expect(idols.mirai.HP).toBe(13.75);
//         expect(idols.kotoha.HP).toBe(8.75);

//         done();
//     });
// }
it("",function(){});