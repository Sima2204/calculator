let first = ''; // first number
let second = ''; // second number
let operator = ''; // operator
let previousButton = '';
let currentButton = '';
let finish = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const actions = ['-', '+', '*', '÷', '√', '^'];
const out = document.querySelector('.result');

function clearAll () {
    first = '';
    second = '';
    operator = '';
    previousButton = '';
    currentButton = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.reset').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', event => {

    if(!event.target.classList.contains('button') || event.target.classList.contains('reset')) return;
    
    out.textContent = '';

    // receiving pushed button
    previousButton = currentButton;
    const key = event.target.textContent;
    currentButton = key;

    // if pushed digits
    if (digits.includes(key)) {
        if (second === '' && operator === '') {
            if (first.length <= 9) {
                if (first === '0' && key === '0') { //avoiding double 0 in begin
                    first = '0';
                } else if (first === '' && key === '.') { // making 0.n correct
                    first = '0' + key;
                } else if (first === '0' && key !== '.') {
                    first = key;
                } else {
                    first += key;
                }
            } else if (first.length > 9) {
                alert("Max 10 digits possible!");
            }
            out.textContent = first;
        } else if (first !== '' && second !== '' && finish) {
            second += key;
            finish = false;
            out.textContent = second;
        } else {
            if (second.length <= 9) {
                if (second === '0' && key === '0') { //avoiding double 0 in begin
                    second = '0';
                } else if (second === '' && key === '.') { // making 0.n correct
                    second = '0' + key;
                } else if (second === '0' && key !== '.') {
                    second = key;
                } else {
                    second += key;
                } 
            } else if (second.length > 9) {
                alert("Max 10 digits possible!")
            }
            out.textContent = second;
            finish = false; 
        }
        return;
    };

    // if pushed actions 
    if (actions.includes(key) && operator === '') {
        if (first === 'Error' || isNaN(first)) {
            out.textContent = 'Error';
            operator = key;
            return;
        } else {
            operator = key;
            out.textContent = operator;
            return;
        }
    };

    // if pushed equal
    if (key === '=') {
        if (first === 'Error' || isNaN(first)) {
            out.textContent = 'Error';
            operator = key;
            return;
        } else {
            equal();
            finish = true;
            out.textContent = first.toString().slice(0, 10); 
            operator = '';
            second = '';
        }
    };

    // if equal not pushed, and new action pushed
    if (actions.includes(key) && operator !== '') {
        if (!(actions.includes(previousButton) && actions.includes(currentButton))) {
            equal();
            second = '';
        }
        operator = key;
        second = '';
        out.textContent = first.toString().slice(0, 10); 
        finish = true;    
    };

    // if pushed DEL
    if (key === 'DEL') {

        if (finish === true) {
            first = first.toString().slice(0, -1);
            second = '';
            operator = '';
            finish = false;
            out.textContent = first;  
        } else if (second === '' && operator === '') {
            first = first.toString().slice(0, -1);
            if (first.length >= 1) {
                out.textContent = first;
            } else {
                first = 0;
                out.textContent = first;
            }
        } else if (first !== '' && operator !== '') {
            second = second.toString().slice(0, -1);
            if (second.length >= 1) {
                out.textContent = second;
            } else {
                second = 0;
                out.textContent = second;
            }
        }
    };

    // if pushed negative
    if (key === '+/-') {
        if (out.textContent === first && first === '') {
            first = '-';
            out.textContent = first;
        } else if (out.textContent === second && first !== '' && operator !== '' && !finish) {
            second = '-';
            out.textContent = second;
        } else if (finish === true) {
            first = first * -1;
            second = '';
            operator = '';
            finish = false;
            out.textContent = first;
        } else if (second === '' && operator === '') {
            if (first === '-') {
                first = '0';
                out.textContent = first;
            } else if (first === '0') {
                first = '-';
                out.textContent = first;
            } else {
                first = first * -1;
                out.textContent = first;
            }
        } else if (first !== '' && operator !== '') {
            if (second === '-') {
                second = '0';
                out.textContent = second;
            } else if (second === '0') {
                second = '-';
                out.textContent = second;
            } else {
                second = second * -1;
                out.textContent = second;
            }
        }
    };
});

function equal () {
    if (second === '') second = first;
    switch (operator) {
        case "+":
            if (+first < 1 && +second < 1) {
                first = (first * 10 + second * 10) / 10;
                break;
            }
            first = (+first) + (+second);
            break;
        case "-":
            if (+first < 1 && +second < 1) {
                first = (first * 100 - second * 100) / 100;
                break;
            }
            first = (+first) - (+second);
            break;
        case "*":
            if (+first < 1 && +second < 1) {
                first = (first * 10 * second * 10) / 100;
                break;
            }
            first = (+first) * (+second);
            break;
        case "÷":
            console.log('HI!')
            if (second === '0') {
                first = 'Error';
                second = '';
                operator = '';
                finish = true;
                return;
            } else if (+first < 1 && +second < 1) {
                first = (first * 10 + second * 10) / 10;
                break;
            } else {
                first = (+first) / (+second);
                break;
            }
        case '^':
            first = Math.pow(+first, +second);
            break;
        case '√':
            if (Math.sign(first) === -1) {
                first = 'Error';
                second = '';
                operator = '';
                return;
            } else {
                first = Math.sqrt(first);
                second = '';
                break;
            };   
    }
    finish = true;
};