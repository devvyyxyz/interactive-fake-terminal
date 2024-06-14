// desktop.js

document.addEventListener('DOMContentLoaded', function() {
    let zIndexCounter = 1; // Initialize zIndexCounter globally for managing z-index

    // Function to open a new window
    function openWindow(title, content) {
        const desktop = document.getElementById('desktop');

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
        minimizeBtn.className = 'window-control-btn minimize-btn';
        minimizeBtn.textContent = '_';
        minimizeBtn.addEventListener('click', function() {
            minimizeWindow(window);
        });

        const closeBtn = document.createElement('button');
        closeBtn.className = 'window-control-btn close-btn';
        closeBtn.textContent = 'X';
        closeBtn.addEventListener('click', function() {
            closeWindow(window);
        });

        // Create content element (example using innerHTML)
        const contentElement = document.createElement('div');
        contentElement.className = 'window-content';
        contentElement.innerHTML = content;

        window.appendChild(contentElement);

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

        // Event listeners for focusing, dragging, and resizing
        window.addEventListener('mousedown', function() {
            focusWindow(this);
        });

        const resizeHandlesArray = Array.from(window.querySelectorAll('.resize-handle'));
        resizeHandlesArray.forEach(handle => {
            handle.addEventListener('mousedown', startResize);
        });

        makeDraggable(window);
    }

    // Function to focus on a window (bring to front)
    function focusWindow(windowElement) {
        zIndexCounter++;
        windowElement.style.zIndex = zIndexCounter;
    }

    // Function to make a window draggable
    function makeDraggable(windowElement) {
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        const titlebar = windowElement.querySelector('.window-titlebar');

        titlebar.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            windowElement.style.zIndex = zIndexCounter; // Bring window to front
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                windowElement.style.left = `${e.clientX - offsetX}px`;
                windowElement.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }

    // Function to start window resizing
    let resizingWindow = null;
    let initialX = 0;
    let initialY = 0;

    function startResize(event) {
        resizingWindow = this.closest('.window');
        initialX = event.clientX;
        initialY = event.clientY;
        resizingWindow.style.zIndex = zIndexCounter; // Bring window to front
    }

    // Function to handle window resizing
    function handleResize(event) {
        if (!resizingWindow) return;

        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;

        if (resizingWindow.classList.contains('resize-right')) {
            resizingWindow.style.width = `${resizingWindow.offsetWidth + deltaX}px`;
        }
        if (resizingWindow.classList.contains('resize-bottom')) {
            resizingWindow.style.height = `${resizingWindow.offsetHeight + deltaY}px`;
        }
        if (resizingWindow.classList.contains('resize-left')) {
            resizingWindow.style.width = `${resizingWindow.offsetWidth - deltaX}px`;
            resizingWindow.style.left = `${resizingWindow.offsetLeft + deltaX}px`;
        }
        if (resizingWindow.classList.contains('resize-top')) {
            resizingWindow.style.height = `${resizingWindow.offsetHeight - deltaY}px`;
            resizingWindow.style.top = `${resizingWindow.offsetTop + deltaY}px`;
        }

        initialX = event.clientX;
        initialY = event.clientY;
    }

    document.addEventListener('mousemove', handleResize);

    document.addEventListener('mouseup', function() {
        resizingWindow = null;
    });

    // Function to minimize a window (toggle visibility)
    function minimizeWindow(windowElement) {
        windowElement.style.display = 'none'; // Example: Hide the window
        // Implement logic to minimize the window as per your requirements
    }

    // Function to close a window
    function closeWindow(windowElement) {
        const desktop = document.getElementById('desktop');
        desktop.removeChild(windowElement); // Remove window from desktop
    }
});
