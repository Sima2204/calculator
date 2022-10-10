let first = ''; // first number
let second = ''; // second number
let operator = ''; // operator
let finish = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const actions = ['-', '+', '*', '÷', '√', '^'];
const out = document.querySelector('.result');

function clearAll () {
    first = '';
    second = '';
    operator = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.reset').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', event => {

    if(!event.target.classList.contains('button')) return;
    if(event.target.classList.contains('reset')) return;

    out.textContent = '';

    // receiving pushed button
    const key = event.target.textContent;

    // if pushed digits
    if (digits.includes(key)) {
        if (second === '' && operator === '') {

            if (first.length < 10) {
                if (first === '0' && key === '0') {
                    first = '0';
                    out.textContent = first; 
                } else if (first === '0' && key !== '0' && key !== '.') {
                    first = key;
                    out.textContent = first; 
                } else {
                    first += key;
                    out.textContent = first;
                }
            } else {
                alert("Max 10 digits possible!");
                out.textContent = first;
            }
            
        } else if (first !== '' && second !== '' && finish) {
            second = key;
            finish = false;
            out.textContent = second;
        } else {

            if (second.length < 10) {
                if (second === '0' && key === '0') {
                    second = '0';
                    out.textContent = second; 
                } else if (second === '0' && key !== '0' && key !== '.') {
                    second = key;
                    out.textContent = second; 
                } else {
                    second += key;
                    out.textContent = second;
                } 
            } else {
                alert("Max 10 digits possible!")
                out.textContent = second;
            }

        }
        return;
    };

    // if pushed actions 
    if (actions.includes(key)) {
        operator = key;
        out.textContent = operator;
        return;
    };

    // if pushed equal
    if (key === '=') {
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
                    first = (first * 10 - second * 10) / 10;
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
                if (second === '0') {
                    out.textContent = 'Error';
                    first = '';
                    second = '';
                    operator = '';
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
                    out.textContent = 'Error';
                    first = '';
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
        out.textContent = first.toString().slice(0, 10);    

    }

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

    }

    // if pushed negative
    if (key === '+/-') {

        if (finish === true) {
            first = first * -1;
            second = '';
            operator = '';
            finish = false;
            out.textContent = first;
        } else if (second === '' && operator === '') {
            first = first * -1;
            out.textContent = first;
        } else if (first !== '' && operator !== '') {
            second = second * -1;
            out.textContent = second;
        } 

    }

});


