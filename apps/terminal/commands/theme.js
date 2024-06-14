// commands/theme.js

export const name = 'theme';
export const description = 'Change the terminal theme';
export const themes = {
    light: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    dark: {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
    },
    ocean: {
        backgroundColor: '#007acc',
        color: '#ffffff',
    },
    forest: {
        backgroundColor: '#228b22',
        color: '#ffffff',
    },
};

export async function execute(args) {
    try {
        const themeName = args[0]?.toLowerCase();
        const theme = themes[themeName];

        if (!theme) {
            return `Theme '${themeName}' not found. Available themes: ${Object.keys(themes).join(', ')}`;
        }

        applyTheme(theme); // Apply selected theme
        return `Theme '${themeName}' applied successfully.`;
    } catch (error) {
        console.error('Error executing theme command:', error);
        return 'Error executing theme command. Please try again later.';
    }
}

function applyTheme(theme) {
    const terminal = document.getElementById('terminal');
    terminal.style.backgroundColor = theme.backgroundColor;
    terminal.style.color = theme.color;
}
