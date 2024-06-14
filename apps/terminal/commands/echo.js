// commands/echo.js

export const name = 'echo';
export const description = 'Print text or variables to the terminal';

export async function execute(args) {
    try {
        // Join all arguments into a single string separated by spaces
        const output = args.join(' ');
        return output;
    } catch (error) {
        console.error('Error executing echo command:', error);
        return 'Error executing echo command. Please try again later.';
    }
}
