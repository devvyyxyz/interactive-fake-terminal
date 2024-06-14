export const description = 'Change terminal style (Available presets: default, dark, light)';
export function execute(args) {
    const styles = {
          default: {
              backgroundColor: '#1e1f1c',
              color: '#f8f8f2',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          },
          dark: {
              backgroundColor: '#272822',
              color: '#f8f8f2',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
          },
          light: {
              backgroundColor: '#f8f8f2',
              color: '#272822',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }
          // Add more styles as needed
      };

      const styleName = args[0];

      if (styles.hasOwnProperty(styleName)) {
          const style = styles[styleName];
          document.getElementById('terminal').style.backgroundColor = style.backgroundColor;
          document.getElementById('terminal').style.color = style.color;
          document.getElementById('terminal').style.boxShadow = style.boxShadow;
          return `Changed style to "${styleName}"`;
      } else {
          return 'Invalid style preset. Available presets: default, dark, light';
      }
}
