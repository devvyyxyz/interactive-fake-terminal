// apps/terminal/commands/echo.js
export const echoCommand = {
    execute: async (args) => {
        return args.join(' ');
    }
};
