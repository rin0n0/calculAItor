const inputField = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const errorDisplay = document.getElementById('error');
const customButtonsContainer = document.getElementById('customButtonsContainer');
const gptButton = document.getElementById('button-gpt');
const API_URL = 'https://nexra.aryahcr.cc/api/chat/gptweb';
const TASK_URL = 'https://nexra.aryahcr.cc/api/chat/task'

inputField.focus();

inputField.addEventListener('input', calculate);
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate();
    }
});

function appendToInput(value) {
    inputField.value += value;
    inputField.focus();
    calculate();
}

function clearAll() {
    inputField.value = '';
    resultDisplay.textContent = '0';
    errorDisplay.style.display = 'none';
    inputField.focus();
}

function calculate() {
    const expression = inputField.value;
    
    if (!expression) {
        resultDisplay.textContent = '0';
        errorDisplay.style.display = 'none';
        return;
    }
    
    try {
        if (/[^0-9()+\-*/\s.]/.test(expression)) {
            throw new Error('Это сложное выражение, нажмите "Подумать"');
        }
        
        const result = new Function(`return ${expression}`)();
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Некорректный результат');
        }
        
        resultDisplay.textContent = formatResult(result);
        errorDisplay.style.display = 'none';
    } catch (error) {
        resultDisplay.textContent = '...';
        errorDisplay.textContent = error.message;
        errorDisplay.style.display = 'block';
    }
}

function calculateAI(){
    resultDisplay.textContent='вычисление...';
    errorDisplay.style.display='none';
    console.log(inputField.value);
    solveExpression(inputField.value);
}

async function solveExpression(expression){

    if (!expression || gptButton.disabled) return;
    console.log('--'+expression);
    gptButton.disabled=true;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: 'Реши математическую задачу и дай только ЧИСЛОВОЙ ответ или ответ математической функцией на неё (без "Ответ:" и похожее). Не используй форматирование текста. Если задачу невозможно решить, то ответь в формате "локонично описанная ошибка и локоничное решение проблемы". Вот выражение:'+expression,
                markdown: false
            })
        });
        
        const data = await response.json();
        
        if (!data.id) {
            throw new Error('Не получили ID задачи');
        }
        
        const result = await waitForResult(data.id);
        
        if (result?.gpt) {
            resultDisplay.textContent = result.gpt;
        } else {
            throw new Error('Пустой ответ от API');
        }
        
    } finally {
        gptButton.disabled=false;
    }
}

async function waitForResult(taskId) {
    for (let i = 0; i < 15; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            const response = await fetch(`${TASK_URL}/${encodeURIComponent(taskId)}`);
            const data = await response.json();
            
            console.log('Статус задачи:', data.status, data);
            
            if (data.status === 'completed') {
                return data;
            } else if (data.status === 'error') {
                throw new Error('Ошибка обработки задачи');
            }
        } catch (error) {
            console.error('Ошибка проверки задачи:', error);
            if (i === 14) throw error;
        }
    }
    throw new Error('Превышено время ожидания');
}

function formatResult(number) {
    if (number % 1 !== 0) {
        const rounded = parseFloat(number.toFixed(8));
        return rounded.toString().replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
    }
    return number.toString();
}

function addCustomButton() {
    const buttonText = document.getElementById('customButtonText').value.trim();
    if(buttonText)
    {
        const button = document.createElement('button');
        button.className = 'custom-button';
        button.textContent = buttonText;
        button.onclick = function() { appendToInput(buttonText); };
        customButtonsContainer.appendChild(button);
        document.getElementById('customButtonText').value='';
    }
}

gptButton.addEventListener('click',calculateAI);