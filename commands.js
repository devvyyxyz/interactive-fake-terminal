const commands = {
  help: {
      description: 'Display list of available commands',
      function: function() {
          return Object.keys(commands).map(cmd => `${cmd}: ${commands[cmd].description}`).join('\n');
      }
  },
  greet: {
      description: 'Greet the user',
      function: function() {
          return 'Hello! Welcome to the fake terminal.';
      }
  },
  date: {
      description: 'Display current date and time',
      function: function() {
          return new Date().toLocaleString();
      }
  },
  clear: {
      description: 'Clear the terminal screen',
      function: function() {
          output.textContent = '';
          return '';
      }
  }
  // Add more commands here as needed
};

// Export commands object
export default commands;
