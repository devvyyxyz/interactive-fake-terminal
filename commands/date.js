// commands/date.js

export const name = 'date';
export const description = 'Display the current date and time';

export async function execute() {
    try {
        const now = new Date();
        return now.toLocaleString();
    } catch (error) {
        console.error('Error executing date command:', error);
        return 'Error executing date command. Please try again later.';
    }
}
