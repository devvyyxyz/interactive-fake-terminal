// apps/terminal/terminal.js

import { getCommands } from './commands/index.js';
import { addToHistory } from './commands/history.js'; // Import addToHistory function

document.addEventListener("DOMContentLoaded", async function() {
    const terminalInput = document.getElementById('terminal-input');
    const output = document.getElementById('output');

    let commandHistory = [];
    let historyIndex = -1;

    async function executeCommand(input) {
        addToHistory(input); // Add command to history
        const trimmedInput = input.trim();
        const spaceIndex = trimmedInput.indexOf(' ');
        const commandName = spaceIndex === -1 ? trimmedInput.toLowerCase() : trimmedInput.slice(0, spaceIndex).toLowerCase();
        const args = spaceIndex === -1 ? [] : trimmedInput.slice(spaceIndex + 1).split(' ');

        try {
            const commands = await getCommands(); // Retrieve commands object

            // Handle different commands
            switch (commandName) {
                case 'help':
                case 'clear':
                case 'echo':
                case 'date':
                case 'history':
                case 'man':
                case 'ping':
                case 'top':
                case 'curl':
                case 'theme':
                    if (commands[commandName] && typeof commands[commandName].execute === 'function') {
                        const result = await commands[commandName].execute(args);
                        output.textContent += `$ ${input}\n${result}\n\n`;
                    } else {
                        output.textContent += `$ ${input}\nCommand "${commandName}" is not available or does not have an execute method.\n\n`;
                    }
                    break;
                default:
                    output.textContent += `$ ${input}\nCommand not found. Type 'help' for a list of commands.\n\n`;
                    break;
            }
        } catch (error) {
            console.error('Error loading or executing command:', error);
            output.textContent += `Error loading or executing command. Please try again.\n\n`;
        }

        terminalInput.value = ''; // Clear input after execution
    }

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (input !== '') {
                executeCommand(input);
                commandHistory.unshift(input); // Add command to history
                historyIndex = -1; // Reset history index
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex >= 0) {
                historyIndex--;
                terminalInput.value = historyIndex >= 0 ? commandHistory[historyIndex] : '';
            }
        }
    });

    output.textContent = 'Welcome to the terminal. Type "help" to see available commands.\n\n';
});
