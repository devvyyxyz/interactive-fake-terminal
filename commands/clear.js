// commands/clear.js

export const name = 'clear';
export const description = 'Clear the terminal output';

export async function execute() {
    try {
        // Clear the output area
        const output = document.getElementById('output');
        output.textContent = '';
    } catch (error) {
        console.error('Error clearing terminal:', error);
        return 'Error clearing terminal. Please try again later.';
    }
}
