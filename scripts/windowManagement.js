let zIndexCounter = 1;

export function openApp(appId, appName) {
    let appWindow = document.getElementById(`${appId}-window`);

    if (!appWindow) {
        appWindow = document.createElement('div');
        appWindow.id = `${appId}-window`;
        appWindow.classList.add('window');
        document.body.appendChild(appWindow);

        fetch(`apps/${appId}/index.html`)
            .then(response => response.text())
            .then(data => {
                appWindow.innerHTML = data;
                initializeWindow(appWindow); // Initialize window after content is loaded
            })
            .catch(error => {
                console.error(`Error loading HTML for ${appName}:`, error);
                appWindow.innerHTML = `<p>Error loading ${appName}. Please try again later.</p>`;
            });
    } else {
        focusWindow(appWindow); // Focus existing window
    }
}

function initializeWindow(appWindow) {
    const titleBar = appWindow.querySelector('.window-titlebar');

    if (!titleBar) {
        console.error("Title bar not found in the window element.");
        return;
    }

    titleBar.addEventListener('mousedown', startDrag);
    appWindow.addEventListener('mousedown', () => focusWindow(appWindow));

    makeWindowDraggableAndResizable(appWindow); // Initialize drag and resize functionality
    centerWindow(appWindow); // Center the window
    focusWindow(appWindow); // Bring the window to the front
}

export function makeWindowDraggableAndResizable(windowElement) {
    const titleBar = windowElement.querySelector('.window-titlebar');
    const resizeHandles = windowElement.querySelectorAll('.resize-handle');

    if (!titleBar) {
        console.error("Title bar not found in the window element.");
        return;
    }

    titleBar.addEventListener('mousedown', startDrag);
    windowElement.addEventListener('mousedown', () => focusWindow(windowElement));

    resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', startResize);
    });
}

export function focusWindow(windowElement) {
    zIndexCounter++;
    windowElement.style.zIndex = zIndexCounter;
}

export function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = 'none';
        const iconId = `${windowId.replace('-window', '')}-icon`;
        document.getElementById(iconId).classList.remove('active');
    }
}

export function closeWindow(windowId, iconId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.remove();
        document.getElementById(iconId).classList.remove('active');
    }
}

export function centerWindow(windowElement) {
    const rect = windowElement.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    windowElement.style.left = `${(winWidth - rect.width) / 2}px`;
    windowElement.style.top = `${(winHeight - rect.height) / 2}px`;
}

function startDrag(e) {
    const windowElement = e.target.closest('.window');
    if (!windowElement) return;

    let isDragging = true;
    let startX = e.clientX - windowElement.getBoundingClientRect().left;
    let startY = e.clientY - windowElement.getBoundingClientRect().top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    function drag(e) {
        if (!isDragging) return;
        windowElement.style.left = `${e.clientX - startX}px`;
        windowElement.style.top = `${e.clientY - startY}px`;
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

function startResize(e) {
    const windowElement = e.target.closest('.window');
    if (!windowElement) return;

    let isResizing = true;
    let startX = e.clientX;
    let startY = e.clientY;
    let startWidth = windowElement.clientWidth;
    let startHeight = windowElement.clientHeight;

    const resizeHandle = e.target;
    const handleType = resizeHandle.classList[1];

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);

    function resize(e) {
        if (!isResizing) return;

        if (handleType.includes('right')) {
            windowElement.style.width = `${startWidth + (e.clientX - startX)}px`;
        }
        if (handleType.includes('bottom')) {
            windowElement.style.height = `${startHeight + (e.clientY - startY)}px`;
        }
        if (handleType.includes('left')) {
            const widthChange = startX - e.clientX;
            windowElement.style.width = `${startWidth + widthChange}px`;
            windowElement.style.left = `${windowElement.getBoundingClientRect().left - widthChange}px`;
        }
        if (handleType.includes('top')) {
            const heightChange = startY - e.clientY;
            windowElement.style.height = `${startHeight + heightChange}px`;
            windowElement.style.top = `${windowElement.getBoundingClientRect().top - heightChange}px`;
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
}
