
function Cli_State() {
    this.state = "INIT";
    this.doll = {};

    this.getQuestion = function () {
        if (this.state === "INIT") {
            return "시작합니다:";
        } else if (this.state === "NAME") {
            return "이름을 입력하세요: ";
        } else if (this.state === "ATK") {
            return "ATK를 입력하세요: ";
        } else if (this.state === "DEF") {
            return "DEF를 입력하세요: ";
        } else if (this.state === "SAT") {
            return "SAT를 입력하세요: ";
        } else if (this.state === "SDF") {
            return "SDF를 입력하세요: ";
        } else if (this.state === "SPD") {
            return "SPD를 입력하세요: ";
        } else if (this.state === "END") {
            return "끝내려면 Y, 아니면 N";
        }
    }
    this.processAnswer = function (answer) {
        if (this.state === "INIT") {
            this.doll = {};
            this.state = "NAME";
        } else if (this.state === "NAME") {
            this.doll.name = answer;
            this.state = "ATK";
        } else if (this.state === "ATK") {
            this.doll.ATK = answer;
            this.state = "DEF";
        } else if (this.state === "DEF") {
            this.doll.DEF = answer;
            this.state = "SAT";
        } else if (this.state === "SAT") {
            this.doll.SAT = answer;
            this.state = "SDF";
        } else if (this.state === "SDF") {
            this.doll.SDF = answer;
            this.state = "SPD";
        } else if (this.state === "SPD") {
            this.doll.SPD = answer;
            this.state = "END";
        } else if (this.state === "END") {
            this.result = JSON.stringify(this.doll);
            console.log(this.result);
            this.state = "INIT";
        }
    }
}
