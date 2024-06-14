// apps/terminal/commands/index.js
import { helpCommand } from './help.js';
import { clearCommand } from './clear.js';
import { echoCommand } from './echo.js';
import { dateCommand } from './date.js';
import { historyCommand } from './history.js';
// Import other commands as needed

export async function getCommands() {
    return {
        help: helpCommand,
        clear: clearCommand,
        echo: echoCommand,
        date: dateCommand,
        history: historyCommand,
        // Add other commands here
    };
}
