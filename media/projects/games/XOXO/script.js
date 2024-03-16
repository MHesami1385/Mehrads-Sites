let isStarted = false;
let players = ["X", "O"];
let turn;
let turnIsPlayed = false;
let thereIsAWinner = false;
let n = 3;

for (let i = 1; i <= n; i++) {
    document.write(`<tr>`);
    for (let j = 1; j <= n; j++)
        document.write(`<td id="${i}_${j}"  onclick="Click(${i},${j})"></td>`);
    document.write(`</tr>`);
}


function Start() {
    turn = 1;
    document.querySelectorAll('td').forEach(td => td.textContent = "");
    isStarted = true;
    document.getElementById('startBtn').disabled = true;
    playerChange();
}

function Click(orgI, orgJ) {
    if (isStarted) {

        let orgTD = document.getElementById(`${orgI}_${orgJ}`);

        if (orgTD.innerText === "") {
            orgTD.innerText = players[turn];
            turnIsPlayed = true;
        } else {
            turnIsPlayed = false;
            document.getElementById('status').innerHTML = `The area is NOT empty!`;
        }

        CheckWinner();

        if (thereIsAWinner) {
            document.getElementById('status').innerHTML = `Player <span id="playersTurn">${players[turn]}</span> WON!<br>Press "Again!" to play again!`;
            document.getElementById('startBtn').disabled = false;
            document.getElementById('startBtn').textContent = `Again!`;
            isStarted = false;
        } else {
            let notEmpty = CheckEmpty();

            if (notEmpty) {
                document.getElementById('status').innerHTML = `It's a DRAW!<br>Press "Again!" to play again!`;
                document.getElementById('startBtn').disabled = false;
                document.getElementById('startBtn').textContent = `Again!`;
            } else if(turnIsPlayed)
                playerChange();
        }
    }
}

function playerChange() {
    turn = turn === 0 ? 1 : 0;
    document.getElementById('status').innerHTML = `Player <span id="playersTurn">${players[turn]}</span>'s turn!`;
}

function CheckWinner() {

    //افقی
    for (let i = 1; i <= n; i++) {
        let current = document.getElementById(`${i}_${1}`);

        for (let j = 2; j <= n; j++) {
            let next = document.getElementById(`${i}_${j}`);

            if (current.textContent === next.textContent && current.textContent !== "" && next.textContent !== "")
                thereIsAWinner = true;
            else {
                thereIsAWinner = false;
                break;
            }
        }
        if (thereIsAWinner)
            return;
    }
    //عمودی
    for (let j = 1; j <= n; j++) {
        let current = document.getElementById(`${1}_${j}`);

        for (let i = 2; i <= n; i++) {
            let next = document.getElementById(`${i}_${j}`);

            if (current.textContent === next.textContent && current.textContent !== "" && next.textContent !== "")
                thereIsAWinner = true;
            else {
                thereIsAWinner = false;
                break;
            }
        }
        if (thereIsAWinner)
            return;
    }

    //مورب اول
    for (let i = 2; i <= n; i++) {
        let current = document.getElementById(`${1}_${1}`);
        let next = document.getElementById(`${i}_${i}`);

        if (current.textContent === next.textContent && current.textContent !== "" && next.textContent !== "")
            thereIsAWinner = true;
        else {
            thereIsAWinner = false;
            break;
        }
    }
    if (thereIsAWinner)
        return;

    //مورب دوم
    for (let i = 2; i <= n; i++) {
        let current = document.getElementById(`${1}_${3}`);
        let next = document.getElementById(`${i}_${4 - i}`);

        if (current.textContent === next.textContent && current.textContent !== "" && next.textContent !== "")
            thereIsAWinner = true;
        else {
            thereIsAWinner = false;
            break;
        }
    }
}

function CheckEmpty(){
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (document.getElementById(`${i}_${j}`).textContent === "")
                return false;
        }
    }

    return true;
}