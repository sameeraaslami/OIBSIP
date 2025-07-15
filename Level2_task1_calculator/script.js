document.addEventListener('DOMContentLoaded', function() {
  // Get display element
  const display = document.querySelector('.display input');
  
  // Initialize calculator state
  let currentInput = '0';
  let previousInput = '';
  let operation = null;
  let resetScreen = false;

  // Update the calculator display
  function updateDisplay() {
    display.value = currentInput;
  }

  // Append number to current input
  function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
      currentInput = number;
      resetScreen = false;
    } else {
      currentInput += number;
    }
  }

  // Choose operation
  function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
      calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
  }

  // Calculate result
  function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev)) return;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      case '%':
        result = prev % current;
        break;
      default:
        return;
    }
    
    currentInput = result.toString();
    operation = null;
  }

  // Reset calculator
  function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
  }

  // Delete last character
  function deleteLastChar() {
    if (currentInput.length === 1) {
      currentInput = '0';
    } else {
      currentInput = currentInput.slice(0, -1);
    }
  }

  // Add decimal point
  function addDecimal() {
    if (resetScreen) {
      currentInput = '0.';
      resetScreen = false;
      return;
    }
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
  }

  // Change sign
  function changeSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
  }

  // Calculate square root
  function squareRoot() {
    const num = parseFloat(currentInput);
    if (num >= 0) {
      currentInput = Math.sqrt(num).toString();
    } else {
      currentInput = 'Error';
    }
  }

  // Add event listeners to all buttons
  document.querySelectorAll('input[type="button"]').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.value;
      const classList = button.classList;

      if (classList.contains('number')) {
        appendNumber(value);
      } 
      else if (classList.contains('operator')) {
        chooseOperation(value);
      } 
      else if (classList.contains('decimal')) {
        addDecimal();
      } 
      else if (classList.contains('clear')) {
        resetCalculator();
      } 
      else if (classList.contains('delete')) {
        deleteLastChar();
      } 
      else if (classList.contains('sign')) {
        changeSign();
      } 
      else if (value === '√') {
        squareRoot();
      } 
      else if (value === '=') {
        calculate();
        resetScreen = true;
      } 
      else if (classList.contains('parenthesis')) {
        appendNumber(value);
      } 
      else if (classList.contains('memory')) {
        // Handle memory functions if needed
      }

      updateDisplay();
    });
  });

  // Prevent form submission
  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
  });
});