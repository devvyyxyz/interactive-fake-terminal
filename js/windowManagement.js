// windowManagement.js

let draggingWindow = null;
let resizingWindow = null;
let initialX = 0;
let initialY = 0;
let initialResizeX = 0;
let initialResizeY = 0;

// Function to start dragging a window
function startDrag(event) {
    draggingWindow = this.closest('.window');
    initialX = event.clientX - draggingWindow.offsetLeft;
    initialY = event.clientY - draggingWindow.offsetTop;
    draggingWindow.style.zIndex = '1000'; // Bring window to front
}

// Function to handle window dragging
function handleDrag(event) {
    if (!draggingWindow) return;
    draggingWindow.style.left = `${event.clientX - initialX}px`;
    draggingWindow.style.top = `${event.clientY - initialY}px`;
}

// Function to stop dragging a window
function stopDrag() {
    if (!draggingWindow) return;
    draggingWindow.style.zIndex = ''; // Reset window z-index
    draggingWindow = null;
}

// Function to start resizing a window
function startResize(event) {
    resizingWindow = this.closest('.window');
    initialResizeX = event.clientX;
    initialResizeY = event.clientY;
    resizingWindow.style.zIndex = '1000'; // Bring window to front
}

// Function to handle window resizing
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

// Function to stop resizing a window
function stopResize() {
    if (!resizingWindow) return;
    resizingWindow.style.zIndex = ''; // Reset window z-index
    resizingWindow = null;
}

// Event listeners for dragging and resizing
document.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('window-titlebar')) {
        startDrag(event);
    } else if (event.target.classList.contains('resize-handle')) {
        startResize(event);
    }
});

document.addEventListener('mousemove', handleDrag);
document.addEventListener('mousemove', handleResize);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mouseup', stopResize);
