// script.js

window.onload = function() {
    document.getElementById('startButton').addEventListener('click', runDFA);
    document.getElementById('resetButton').addEventListener('click', resetSimulator);
};

let currentState = 'q0';
let transitionsLog = [];

function runDFA() {
    const input = document.getElementById('inputString').value.trim().toLowerCase();
  
    if (!/^[ab]*$/.test(input)) {
        alert('Invalid input! Please enter a string containing only "a" and "b".');
        return;
    }

    currentState = 'q0';
    transitionsLog = [];
    updateDisplay();

    for (let i = 0; i < input.length; i++) {
        const symbol = input[i];
        const previousState = currentState;
        currentState = transition(currentState, symbol);
        transitionsLog.push(`Step ${i + 1}: On '${symbol}' → ${previousState} → ${currentState}`);
        updateDisplay();
    }

    
    if (currentState === 'q2') {
        document.getElementById('result').innerHTML = `<span class="accept">Accepted: The string contains the substring "ab".</span>`;
    } else {
        document.getElementById('result').innerHTML = `<span class="reject">Rejected: The string does not contain the substring "ab".</span>`;
    }
}

function resetSimulator() {
    currentState = 'q0';
    transitionsLog = [];
    document.getElementById('inputString').value = '';
    updateDisplay();
    document.getElementById('result').innerHTML = '';
}

function transition(state, symbol) {
    const transitionTable = {
        'q0': { 'a': 'q1', 'b': 'q0' },
        'q1': { 'a': 'q1', 'b': 'q2' },
        'q2': { 'a': 'q2', 'b': 'q2' }
    };

    return transitionTable[state][symbol] || 'q_reject';
}

function updateDisplay() {
   
    document.getElementById('currentState').innerHTML = `Current State: <span class="state">${currentState}</span>`;

    const transitionsDiv = document.getElementById('transitions');
    transitionsDiv.innerHTML = 'Transitions:<br>';
    transitionsLog.forEach(log => {
        transitionsDiv.innerHTML += `${log}<br>`;
    });
}


updateDisplay();