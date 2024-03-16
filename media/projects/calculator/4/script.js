let runningTotal = 0;
let buffer = "0";
let previousOperator;


const screen = document.querySelector(".zero");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {

        case 'AC':
            buffer = '0';
            runningTotal = 0;
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case'+/-':

            if (buffer[0] !== "-") {
                buffer = `-${buffer}`;
            } else {
                buffer = buffer.substring(1, buffer.length);
            }
            break;

        case '.':
            if (!buffer.includes('.')) {
                buffer = `${buffer}.`
            }
            break;

        case '%':
        case'÷':
        case'×':
        case'-':
        case'+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const FloatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = FloatBuffer;
    } else {
        flushOperation(FloatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(FloatBuffer) {
    //if --> ===
    if (previousOperator === '÷') {
        runningTotal /= FloatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= FloatBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= FloatBuffer;
    } else if (previousOperator === '+') {
        runningTotal += FloatBuffer;
    } else {
        runningTotal *= (FloatBuffer / 100);
    }
}

function handleNumber(numberString) {


    if (buffer === '0' || buffer === '-0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }

}

function init() {
    document.querySelector('.buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}

init();