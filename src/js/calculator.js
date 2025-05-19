// Fonction pour afficher/masquer la calculatrice
window.toggleCalculator = function() {
    const container = document.getElementById('calculator-container');
    container.classList.toggle('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    const firstNumber = document.getElementById('first-number');
    const operator = document.getElementById('operator');
    const secondNumber = document.getElementById('second-number');
    const result = document.getElementById('result');

    let currentValue = '';
    let isFirstNumber = true;
    let operatorValue = '';
    let shouldResetDisplay = false;

    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
        if (isFirstNumber) {
            firstNumber.value = currentValue;
        } else {
            secondNumber.value = currentValue;
        }
    }

    // Fonction pour ajouter un chiffre
    function appendNumber(number) {
        if (shouldResetDisplay) {
            currentValue = number;
            shouldResetDisplay = false;
        } else {
            currentValue += number;
        }
        updateDisplay();
    }

    // Fonction pour ajouter un point décimal
    function appendDecimal() {
        if (shouldResetDisplay) {
            currentValue = '0';
            shouldResetDisplay = false;
        }
        if (!currentValue.includes('.')) {
            if (currentValue === '') {
                currentValue = '0';
            }
            currentValue += '.';
            updateDisplay();
        }
    }

    // Fonction pour gérer les opérations
    function handleOperation(op) {
        if (!isFirstNumber) {
            calculate();
        }
        operatorValue = op;
        operator.value = op;
        isFirstNumber = false;
        shouldResetDisplay = true;
        currentValue = '';
    }

    // Fonction pour calculer le résultat
    function calculate() {
        if (operatorValue === '' || shouldResetDisplay) return;

        const num1 = parseFloat(firstNumber.value || '0');
        const num2 = parseFloat(secondNumber.value || '0');
        let calculatedResult;

        switch (operatorValue) {
            case '+':
                calculatedResult = num1 + num2;
                break;
            case '-':
                calculatedResult = num1 - num2;
                break;
            case '*':
                calculatedResult = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    alert('Division par zéro impossible !');
                    clear();
                    return;
                }
                calculatedResult = num1 / num2;
                break;
            default:
                return;
        }

        result.value = Math.round(calculatedResult * 1000000) / 1000000;
    }

    // Fonction pour effacer
    function clear() {
        currentValue = '';
        isFirstNumber = true;
        operatorValue = '';
        firstNumber.value = '';
        secondNumber.value = '';
        operator.value = '';
        result.value = '0';
        shouldResetDisplay = false;
        updateDisplay();
    }

    // Fonction pour effacer le dernier caractère
    function backspace() {
        if (currentValue.length <= 1) {
            currentValue = '';
        } else {
            currentValue = currentValue.slice(0, -1);
        }
        updateDisplay();
    }

    // Gestionnaire d'événements pour les boutons
    document.querySelectorAll('.calc-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
                appendNumber(value);
            } else if (value === '.') {
                appendDecimal();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperation(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clear();
            } else if (value === '←') {
                backspace();
            }
        });
    });
}); 