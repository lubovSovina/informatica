let a = '';
let b = '';
let sign = '';
let finish = false;
let history_flag = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const action = ['-', '+', '*', '/'];
const history = [];

const out = document.querySelector('.calc-screen p');
const buttons = document.querySelector('.buttons');
const history_list = document.querySelector('.history_list');


function clearAll(){
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

buttons.onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;

    out.textContent='';
    const key = event.target.textContent;
    if (digit.includes(key)){
        if (b === '' && sign === ''){
            a += key;
            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        
    }
    else if (action.includes(key)){
        sign = key;
        out.textContent = sign;
    }
    else if (key === '=') {
        if (b === '') b = a;
        let old_a = a ? a : 0;
        switch (sign){
            case '+': a = (+a) + (+b); break;
            case '-': a = a - b; break;
            case '*': a = a * b; break;
            case '/': 
            if(b === '0') {
                out.textContent = "Error";
                a = '';
                b = '';
                sign = '';
                return;
            } 
            a = Math.round((a / b) * 100000) / 100000; 
            break;
        }
        finish = true;
        history.push(old_a + ' ' + sign + ' ' + b + ' = ' + a);
        out.textContent = a;
    }
    else if (key === 'h') {
        if (history_flag){
            out.parentElement.style.display = '';
            for(let i = 0; i < buttons.children.length; i++){
                if (buttons.children[i].classList != 'btn history')
                    buttons.children[i].style.display = '';
                    else 
                        buttons.children[i].style.position = '';
            }
            out.textContent = 0;
            history_list.style.display = 'none';
            clearAll();
        } else {
            out.parentElement.style.display = 'none';
            for(let i = 0; i < buttons.children.length; i++){
                if (buttons.children[i].classList != 'btn history')
                    buttons.children[i].style.display = 'none';
                else 
                    buttons.children[i].style.position = 'absolute';
            }
            history.splice(0, history.length).forEach(elem => {
                const newLi = document.createElement('li');
                newLi.textContent = elem;
                history_list.prepend(newLi);
            })
            history_list.style.display = 'block';
        }
        history_flag = !history_flag;
    }
}