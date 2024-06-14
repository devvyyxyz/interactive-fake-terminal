// commands/index.js

let commandsPromise;

// Function to import all commands and return as a promise
async function importAllCommands() {
    if (!commandsPromise) {
        commandsPromise = fetch('/commands/config.json')
            .then(response => response.json())
            .then(config => {
                const modules = config.commands.map(command => import(`./${command}`));
                return Promise.all(modules);
            });
    }
    return commandsPromise;
}

// Function to get the commands object after they are loaded
export async function getCommands() {
    const modules = await importAllCommands();
    const commands = {};

    modules.forEach(module => {
        if (module.name && module.description && module.execute) {
            commands[module.name] = { description: module.description, execute: module.execute };
        }
    });

    return commands;
}
