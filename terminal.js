// terminal.js

import { getCommands } from './commands/index.js';
import { addToHistory } from './commands/history.js'; // Import addToHistory function
import { attachWindowEventHandlers } from './windowManagement.js'; // Import window management functions

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

            if (commandName === 'help') {
                const helpCommand = commands['help'];
                if (helpCommand && typeof helpCommand.execute === 'function') {
                    const result = await helpCommand.execute(); // Call execute method of help command
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nHelp command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'clear') {
                const clearCommand = commands['clear'];
                if (clearCommand && typeof clearCommand.execute === 'function') {
                    const result = await clearCommand.execute(); // Call execute method of clear command
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nClear command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'echo') {
                const echoCommand = commands['echo'];
                if (echoCommand && typeof echoCommand.execute === 'function') {
                    const result = await echoCommand.execute(args); // Call execute method of echo command with arguments
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nEcho command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'date') {
                const dateCommand = commands['date'];
                if (dateCommand && typeof dateCommand.execute === 'function') {
                    const result = await dateCommand.execute(); // Call execute method of date command
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nDate command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'history') {
                const historyCommand = commands['history'];
                if (historyCommand && typeof historyCommand.execute === 'function') {
                    const result = await historyCommand.execute(); // Call execute method of history command
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nHistory command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'man') {
                const manCommand = commands['man'];
                if (manCommand && typeof manCommand.execute === 'function') {
                    const result = await manCommand.execute(args); // Call execute method of man command with arguments
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nMan command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'ping') {
                const pingCommand = commands['ping'];
                if (pingCommand && typeof pingCommand.execute === 'function') {
                    const result = await pingCommand.execute(args); // Call execute method of ping command with arguments
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nPing command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'top') {
                const topCommand = commands['top'];
                if (topCommand && typeof topCommand.execute === 'function') {
                    const result = await topCommand.execute(); // Call execute method of top command
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nTop command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'curl') {
                const curlCommand = commands['curl'];
                if (curlCommand && typeof curlCommand.execute === 'function') {
                    const result = await curlCommand.execute(args); // Call execute method of curl command with arguments
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nCurl command is not available or does not have an execute method.\n\n`;
                }
            } else if (commandName === 'theme') {
                const themeCommand = commands['theme'];
                if (themeCommand && typeof themeCommand.execute === 'function') {
                    const result = await themeCommand.execute(args); // Call execute method of theme command with arguments
                    output.textContent += `$ ${input}\n${result}\n\n`;
                } else {
                    output.textContent += `$ ${input}\nTheme command is not available or does not have an execute method.\n\n`;
                }
            } else {
                output.textContent += `$ ${input}\nCommand not found. Type 'help' for a list of commands.\n\n`;
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
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }
    });

    output.textContent = 'Welcome to the fake terminal. Type "help" to see available commands.\n\n';
});
