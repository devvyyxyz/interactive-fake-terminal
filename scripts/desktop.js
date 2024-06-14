// desktop.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to open a new window
    function openWindow(title) {
        const desktop = document.getElementById('desktop');
        const newWindowButton = document.getElementById('open-new-window');

        if (newWindowButton) {
            newWindowButton.addEventListener('click', () => {
                // Code to open a new window
            });
        } else {
            console.error('Element with id "open-new-window" not found.');
        }

        // Create window elements
        const window = document.createElement('div');
        window.className = 'window';
        window.style.left = '50px'; // Example initial position
        window.style.top = '50px'; // Example initial position

        const titlebar = document.createElement('div');
        titlebar.className = 'window-titlebar';

        const titleText = document.createElement('div');
        titleText.className = 'window-title';
        titleText.textContent = title || 'Window';

        const controls = document.createElement('div');
        controls.className = 'window-controls';

        const minimizeBtn = document.createElement('button');
        minimizeBtn.className = 'window-control-btn';
        minimizeBtn.textContent = '_';
        minimizeBtn.addEventListener('click', function() {
            // Minimize window logic here
        });

        const closeBtn = document.createElement('button');
        closeBtn.className = 'window-control-btn';
        closeBtn.textContent = 'X';
        closeBtn.addEventListener('click', function() {
            desktop.removeChild(window); // Remove window from desktop
        });

        controls.appendChild(minimizeBtn);
        controls.appendChild(closeBtn);

        titlebar.appendChild(titleText);
        titlebar.appendChild(controls);

        window.appendChild(titlebar);

        // Add resize handles (adjust as needed)
        const resizeHandles = ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left'];
        resizeHandles.forEach(handle => {
            const resizeHandle = document.createElement('div');
            resizeHandle.className = `resize-handle resize-${handle}`;
            window.appendChild(resizeHandle);
        });

        desktop.appendChild(window);
    }

    // Example: Open a new window when clicking terminal icon
    const terminalIcon = document.getElementById('terminal-icon');
    terminalIcon.addEventListener('click', function() {
        openWindow('Terminal');
    });
});
