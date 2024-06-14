import commands from './commands.js'; // Adjust path as necessary

document.addEventListener("DOMContentLoaded", function() {
    const terminalInput = document.getElementById('terminal-input');
    const output = document.getElementById('output');

    // Function to execute commands
    function executeCommand(input) {
        const args = input.split(' ');
        const command = args.shift().trim().toLowerCase();

        if (commands.hasOwnProperty(command)) {
            const cmd = commands[command];
            const result = cmd.function(args);
            output.textContent += `$ ${input}\n${result}\n\n`;
        } else {
            output.textContent += `$ ${input}\nCommand not found. Type 'help' for a list of commands.\n\n`;
        }
        terminalInput.value = '';
    }

    // Handle user input
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (input !== '') {
                executeCommand(input);
            }
        }
    });

    // Initial greeting message
    output.textContent = 'Welcome to the fake terminal. Type "help" to see available commands.\n\n';
});
