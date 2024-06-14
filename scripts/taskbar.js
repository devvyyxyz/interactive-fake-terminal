import { appsConfig } from './appsConfig.js';
import { makeWindowDraggableAndResizable } from './windowManagement.js';

document.addEventListener("DOMContentLoaded", function() {
    const taskbar = document.getElementById('taskbar');

    appsConfig.forEach(app => {
        const button = document.createElement('button');
        button.classList.add('taskbar-app');
        button.id = `${app.id}-icon`;
        button.innerHTML = `<img src="${app.icon}" alt="${app.name}">`;
        button.addEventListener('click', () => openApp(app));
        taskbar.appendChild(button);
    });

    const clock = document.createElement('div');
    clock.classList.add('taskbar-clock');
    taskbar.appendChild(clock);
    updateClock(clock);
    setInterval(() => updateClock(clock), 1000);
});

function openApp(app) {
    // Check if window already exists
    let appWindow = document.getElementById(`${app.id}-window`);
    if (appWindow) {
        appWindow.style.display = 'block';
        return;
    }

    // Create a new window
    appWindow = document.createElement('div');
    appWindow.classList.add('window');
    appWindow.id = `${app.id}-window`;

    const titleBar = document.createElement('div');
    titleBar.classList.add('window-titlebar');
    titleBar.innerHTML = `
        <span class="window-title">${app.name}</span>
        <div class="window-controls">
            <button class="window-control-btn" onclick="minimizeWindow('${app.id}-window')">-</button>
            <button class="window-control-btn" onclick="closeWindow('${app.id}-window')">x</button>
        </div>
    `;

    const content = document.createElement('div');
    content.classList.add('window-content');

    appWindow.appendChild(titleBar);
    appWindow.appendChild(content);

    // Add resize handles
    ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(position => {
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle', `resize-${position}`);
        appWindow.appendChild(resizeHandle);
    });

    document.getElementById('desktop').appendChild(appWindow);

    // Make the window draggable and resizable
    makeWindowDraggableAndResizable(appWindow);

    // Load the app script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = app.script;
    document.body.appendChild(script);
}

function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = 'none';
    }
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.remove();
    }
}

function updateClock(clock) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString();
    clock.innerHTML = `<time>${time}</time><date>${date}</date>`;
}
