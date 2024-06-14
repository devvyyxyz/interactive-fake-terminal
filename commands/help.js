// commands/help.js

export const name = 'help';
export const description = 'Display list of available commands';

export function execute() {
    const commands = [
        { command: 'help', description: 'Display list of available commands' },
        { command: 'greet', description: 'Greet the user' },
        { command: 'date', description: 'Display current date and time' },
        { command: 'clear', description: 'Clear the terminal screen' },
        { command: 'style', description: 'Change terminal style (Available presets: default, dark, light)' }
        // Add more commands as needed
    ];

    // Format the list of commands
    const commandList = commands.map(cmd => `${cmd.command}: ${cmd.description}`).join('\n');

    return commandList;
}
