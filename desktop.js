// desktop.js

document.addEventListener("DOMContentLoaded", function() {
    attachEventHandlers();
});

function attachEventHandlers() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        const titleBar = window.querySelector('.title-bar');
        if (titleBar) { // Check if titleBar exists
            titleBar.addEventListener('mousedown', startDrag);
        }

        const resizeHandles = window.querySelectorAll('.resize-handle');
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', startResize);
        });
    });

    // Handle mousemove and mouseup events globally for drag and resize
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', stopInteraction);
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

function handleMove(event) {
    if (draggingWindow) {
        draggingWindow.style.left = `${event.clientX - initialX}px`;
        draggingWindow.style.top = `${event.clientY - initialY}px`;
    }
    if (resizingWindow) {
        handleResize(event);
    }
}

function stopInteraction() {
    if (draggingWindow) {
        draggingWindow.style.zIndex = ''; // Reset window z-index
        draggingWindow = null;
    }
    if (resizingWindow) {
        resizingWindow.style.zIndex = ''; // Reset window z-index
        resizingWindow = null;
    }
}

function startResize(event) {
    resizingWindow = this.closest('.window');
    initialResizeX = event.clientX;
    initialResizeY = event.clientY;
    resizingWindow.style.zIndex = '1000'; // Bring window to front
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
