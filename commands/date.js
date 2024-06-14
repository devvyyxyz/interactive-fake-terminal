// commands/date.js

export const name = 'date';
export const description = 'Display current date and time';

export const execute = function() {
     return new Date().toLocaleString();
};
