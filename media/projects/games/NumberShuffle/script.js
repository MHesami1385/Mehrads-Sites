let interval, s = 0;
let n = Number(window.prompt("Enter the row and column size:"));

let count = 0;
for (let i = 0; i <= n + 1; i++) {
    document.write(`<tr>`);

    for (let j = 0; j <= n + 1; j++) {

        if (i === 0 || i === n + 1 || j === 0 || j === n + 1)
            document.write(`<td id ='${i}_${j}' class="err"></td>`);
        else {
            count++
            document.write(`<td id ='${i}_${j}' onclick="Move(${i},${j})">${count}</td>`);
        }
    }
    document.write(`</tr>`);
}

function Shuffle() {
    s = 0;
    document.getElementById(`timer`).textContent = "0";
    let numbers = [0];

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            let randomSH = Math.floor((Math.random() * (n * n)) + 1);

            if (!numbers.includes(randomSH)) {
                document.getElementById(`${i}_${j}`).textContent = String(randomSH);
                numbers.push(randomSH);
            } else
                j--;


            if (document.getElementById(`${i}_${j}`).textContent === String(n * n))
                document.getElementById(`${i}_${j}`).style.visibility = "hidden";
            else
                document.getElementById(`${i}_${j}`).style.visibility = "visible";


        }

    }

    document.getElementById('startBtn').disabled = true;

    interval = setInterval(Time, 1000);
}

function Move(i, j) {
    let up = document.getElementById(`${i - 1}_${j}`);
    let down = document.getElementById(`${i + 1}_${j}`);
    let left = document.getElementById(`${i}_${j - 1}`);
    let right = document.getElementById(`${i}_${j + 1}`);

    let original = document.getElementById(`${i}_${j}`);

    if (up.style.visibility === "hidden") {
        let copy = original.textContent;
        original.textContent = up.textContent;
        up.textContent = copy;

        up.style.visibility = "visible";
        original.style.visibility = "hidden";
    } else if (down.style.visibility === "hidden") {
        let copy = original.textContent;
        original.textContent = down.textContent;
        down.textContent = copy;

        down.style.visibility = "visible";
        original.style.visibility = "hidden";
    } else if (left.style.visibility === "hidden") {
        let copy = original.textContent;
        original.textContent = left.textContent;
        left.textContent = copy;

        left.style.visibility = "visible";
        original.style.visibility = "hidden";
    } else if (right.style.visibility === "hidden") {
        let copy = original.textContent;
        original.textContent = right.textContent;
        right.textContent = copy;

        right.style.visibility = "visible";
        original.style.visibility = "hidden";
    }

    let hiddenI, hiddenJ;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (document.getElementById(`${i}_${j}`).style.visibility === "hidden") {
                hiddenI = i;
                hiddenJ = j;
                document.getElementById(`${i}_${j}`).style.visibility = "visible";
            }
        }
    }

    let sorted = false;
    count = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            count++;
            if (document.getElementById(`${i}_${j}`).textContent === String(count))
                sorted = true;
            else {
                sorted = false;
                break;
            }
        }
    }

    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++)
            document.getElementById(`${hiddenI}_${hiddenJ}`).style.visibility = "hidden";


    if (sorted) {
        let finalS = document.getElementById(`timer`).textContent;
        window.alert(`Congrats! You won! Time spent: ${finalS} seconds`);
        clearInterval(interval);
        document.getElementById(`startBtn`).textContent = "Again!";
        document.getElementById(`startBtn`).disabled = false;
    }
}

function Time() {
    s++;
    document.getElementById(`timer`).textContent = String(s);
}