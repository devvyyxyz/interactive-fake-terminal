// commands/index.js

// Function to dynamically import all command modules
async function importAllCommands() {
    const modules = await Promise.all([
        import('./help.js'),
        import('./greet.js'),
        import('./date.js'),
        import('./clear.js'),
        import('./style.js'),
        // Add more commands as needed
    ]);

    const commands = modules.reduce((acc, module) => {
        const { name, description, execute } = module;
        if (name && description && execute) {
            acc[name] = { description, execute };
        }
        return acc;
    }, {});

    return commands;
}

// Export all commands
export const commands = importAllCommands();
