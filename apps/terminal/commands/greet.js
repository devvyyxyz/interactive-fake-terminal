// commands/greet.js

export const name = 'greet';
export const description = 'Greet the user with a personalized message';

export function execute(args) {
    if (args.length === 0) {
        return 'Usage: greet [name]';
    }
    const name = args.join(' ');
    return `Hello, ${name}!`;
}
