// commands/help.js

import { getCommands } from './index.js';

export const name = 'help';
export const description = 'Display list of available commands';

export async function execute() {
    try {
        const commands = await getCommands();
        let output = 'Available commands:\n\n';
        for (const command in commands) {
            output += `${command}: ${commands[command].description}\n`;
        }
        return output.trim();
    } catch (error) {
        console.error('Error retrieving commands:', error);
        return 'Error retrieving commands. Please try again later.';
    }
}
