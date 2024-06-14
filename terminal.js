// terminal.js

import { commands } from './commands/index.js';

document.addEventListener("DOMContentLoaded", function() {
    const terminalInput = document.getElementById('terminal-input');
    const output = document.getElementById('output');

    let commandHistory = [];
    let historyIndex = -1;

    function addToHistory(command) {
        commandHistory.unshift(command);
        historyIndex = -1; // Reset history index
    }

    async function executeCommand(input) {
        addToHistory(input); // Add command to history
        const args = input.split(' ');
        const commandName = args.shift().trim().toLowerCase();

        try {
            const cmds = await commands;
            if (cmds.hasOwnProperty(commandName) && typeof cmds[commandName].execute === 'function') {
                const description = cmds[commandName].description;
                const result = cmds[commandName].execute(args);
                output.textContent += `$ ${input}\n${description}\n${result}\n\n`;
            } else {
                output.textContent += `$ ${input}\nCommand not found. Type 'help' for a list of commands.\n\n`;
            }
        } catch (error) {
            console.error('Error loading or executing command:', error);
            output.textContent += `Error loading or executing command. Please try again.\n\n`;
        }

        terminalInput.value = '';
    }

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (input !== '') {
                executeCommand(input);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                historyIndex = Math.max(historyIndex - 1, -1);
                terminalInput.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
            }
        }
    });

    output.textContent = 'Welcome to the fake terminal. Type "help" to see available commands.\n\n';
});
