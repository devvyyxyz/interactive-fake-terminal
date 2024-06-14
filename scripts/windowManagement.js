document.addEventListener("DOMContentLoaded", function() {
    attachEventHandlers();
});
function makeWindowDraggableAndResizable(windowElement) {
    // Add dragging functionality
    const titleBar = windowElement.querySelector('.window-titlebar');
    titleBar.addEventListener('mousedown', (e) => {
        let offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        let offsetY = e.clientY - windowElement.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    // Add resizing functionality
    const resizeHandles = windowElement.querySelectorAll('.resize-handle');
    resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            const handleType = handle.classList[1];

            const rect = windowElement.getBoundingClientRect();
            const originalWidth = rect.width;
            const originalHeight = rect.height;
            const originalX = rect.left;
            const originalY = rect.top;
            const originalMouseX = e.clientX;
            const originalMouseY = e.clientY;

            function mouseMoveHandler(e) {
                if (handleType.includes('right')) {
                    windowElement.style.width = `${originalWidth + (e.clientX - originalMouseX)}px`;
                }
                if (handleType.includes('bottom')) {
                    windowElement.style.height = `${originalHeight + (e.clientY - originalMouseY)}px`;
                }
                if (handleType.includes('left')) {
                    const newWidth = originalWidth - (e.clientX - originalMouseX);
                    if (newWidth > 0) {
                        windowElement.style.width = `${newWidth}px`;
                        windowElement.style.left = `${originalX + (e.clientX - originalMouseX)}px`;
                    }
                }
                if (handleType.includes('top')) {
                    const newHeight = originalHeight - (e.clientY - originalMouseY);
                    if (newHeight > 0) {
                        windowElement.style.height = `${newHeight}px`;
                        windowElement.style.top = `${originalY + (e.clientY - originalMouseY)}px`;
                    }
                }
            }

            function mouseUpHandler() {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    });
}

export { makeWindowDraggableAndResizable };


function attachEventHandlers() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        const titleBar = window.querySelector('.window-titlebar');
        const resizeHandles = window.querySelectorAll('.resize-handle');

        // Attach event listeners for dragging
        titleBar.addEventListener('mousedown', startDrag);

        // Attach event listeners for resizing
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', startResize);
        });
    });

    // Handle mousemove and mouseup events globally
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
}

let draggingWindow = null;
let resizingWindow = null;
let initialX = 0;
let initialY = 0;
let initialResizeX = 0;
let initialResizeY = 0;

function startDrag(event) {
    draggingWindow = this.closest('.window');
    initialX = event.clientX - draggingWindow.offsetLeft;
    initialY = event.clientY - draggingWindow.offsetTop;
    draggingWindow.style.zIndex = '1000'; // Bring window to front
}

function handleDrag(event) {
    if (!draggingWindow) return;
    draggingWindow.style.left = `${event.clientX - initialX}px`;
    draggingWindow.style.top = `${event.clientY - initialY}px`;
}

function stopDrag() {
    if (!draggingWindow) return;
    draggingWindow.style.zIndex = ''; // Reset window z-index
    draggingWindow = null;
}

function startResize(event) {
    resizingWindow = this.closest('.window');
    initialResizeX = event.clientX;
    initialResizeY = event.clientY;
    resizingWindow.style.zIndex = '1000'; // Bring window to front
    event.preventDefault(); // Prevent text selection during resize
}

function handleResize(event) {
    if (!resizingWindow) return;

    const deltaX = event.clientX - initialResizeX;
    const deltaY = event.clientY - initialResizeY;

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

    initialResizeX = event.clientX;
    initialResizeY = event.clientY;
}

function stopResize() {
    if (!resizingWindow) return;
    resizingWindow.style.zIndex = ''; // Reset window z-index
    resizingWindow = null;
}
