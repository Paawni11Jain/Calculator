let display = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let buttonsArray = Array.from(buttons);
let string = '';

// Function to add animation classes
function addAnimation(element, className) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, 200);
}

// Function to scroll input to the end
function scrollInputToEnd() {
    display.scrollLeft = display.scrollWidth;
}

buttonsArray.forEach(function(btn) {
    btn.addEventListener('click', (e) => {
        // Add button press animation
        addAnimation(e.target, 'button-press');
        
        if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length-1);
            display.value = string;
            addAnimation(display, 'input-update');
        } else if (e.target.innerHTML == 'AC') {
            string = '';
            display.value = string;
            addAnimation(display, 'input-update');
        } else if (e.target.innerHTML == '=') {
            try {
                const result = calculatePercentage(string);
                display.value = result;
                string = result.toString();
                addAnimation(display, 'input-update');
            } catch (error) {
                display.value = 'Error';
                string = '';
                addAnimation(display, 'input-update');
            }
        } else {
            string += e.target.innerHTML;
            display.value = string;
            addAnimation(display, 'input-update');
        }
        
        // Scroll to the end after each input
        scrollInputToEnd();
    });
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    // Numbers 0-9
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        string += e.key;
        display.value = string;
        addAnimation(display, 'input-update');
        
        // Find and animate the corresponding button
        const button = Array.from(buttons).find(btn => btn.textContent === e.key);
        if (button) addAnimation(button, 'button-press');
        
        scrollInputToEnd();
    }
    
    // Operators
    else if (['+', '-', '*', '/'].includes(e.key)) {
        string += e.key;
        display.value = string;
        addAnimation(display, 'input-update');
        
        // Find and animate the corresponding button
        const button = Array.from(buttons).find(btn => btn.textContent === e.key);
        if (button) addAnimation(button, 'button-press');
        
        scrollInputToEnd();
    }
    
    // Enter key as equals
    else if (e.key === 'Enter') {
        try {
            const result = calculatePercentage(string);
            display.value = result;
            string = result.toString();
            addAnimation(display, 'input-update');
            
            // Animate equals button
            const equalsButton = document.querySelector('.equalBtn');
            addAnimation(equalsButton, 'button-press');
            
            scrollInputToEnd();
        } catch (error) {
            display.value = 'Error';
            string = '';
            addAnimation(display, 'input-update');
        }
    }
    
    // Backspace as DEL
    else if (e.key === 'Backspace') {
        string = string.substring(0, string.length-1);
        display.value = string;
        addAnimation(display, 'input-update');
        
        // Animate DEL button
        const delButton = document.querySelector('.del');
        addAnimation(delButton, 'button-press');
        
        scrollInputToEnd();
    }
    
    // Escape as AC
    else if (e.key === 'Escape') {
        string = '';
        display.value = string;
        addAnimation(display, 'input-update');
        
        // Animate AC button
        const acButton = document.querySelector('.ac');
        addAnimation(acButton, 'button-press');
        
        scrollInputToEnd();
    }
});

// Handle percentage calculations
function calculatePercentage(expression) {
    // If the expression ends with %, remove it and divide by 100
    if (expression.endsWith('%')) {
        return eval(expression.slice(0, -1)) / 100;
    }
    
    // Handle expressions like "100 * 50%"
    const parts = expression.split(/([+\-*/])/);
    if (parts.length >= 3 && parts[parts.length - 1].endsWith('%')) {
        const operator = parts[parts.length - 2];
        const percentage = parseFloat(parts[parts.length - 1]) / 100;
        const base = eval(parts.slice(0, -2).join(''));
        
        switch(operator) {
            case '*':
                return base * percentage;
            case '/':
                return base / percentage;
            case '+':
                return base + (base * percentage);
            case '-':
                return base - (base * percentage);
            default:
                return eval(expression);
        }
    }
    
    return eval(expression);
}

// Initialize display
window.addEventListener('load', () => {
    display.value = '';
});