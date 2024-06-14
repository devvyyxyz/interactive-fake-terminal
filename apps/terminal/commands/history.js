// commands/history.js

export const name = 'history';
export const description = 'Display command history';

let commandHistory = []; // Initialize command history array

export async function execute() {
    try {
        if (commandHistory.length === 0) {
            return 'Command history is empty.';
        }
        return commandHistory.reverse().join('\n');
    } catch (error) {
        console.error('Error executing history command:', error);
        return 'Error executing history command. Please try again later.';
    }
}

// Function to add commands to history
export function addToHistory(command) {
    commandHistory.unshift(command);
}
