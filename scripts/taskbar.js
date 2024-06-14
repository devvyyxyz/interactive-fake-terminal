import { appsConfig } from './appsConfig.js';
import { openApp, focusWindow, minimizeWindow, closeWindow } from './windowManagement.js';

document.addEventListener("DOMContentLoaded", function() {
    const taskbar = document.getElementById('taskbar');

    appsConfig.forEach(app => {
        const button = document.createElement('button');
        button.classList.add('taskbar-app');
        button.id = `${app.id}-icon`;
        button.innerHTML = `<img src="${app.icon}" alt="${app.name}">`;
        button.addEventListener('click', () => toggleAppWindow(app));
        taskbar.appendChild(button);
    });

    const clock = document.createElement('div');
    clock.classList.add('taskbar-clock');
    taskbar.appendChild(clock);
    updateClock(clock);
    setInterval(() => updateClock(clock), 1000);
});

function toggleAppWindow(app) {
    let appWindow = document.getElementById(`${app.id}-window`);
    if (appWindow) {
        if (appWindow.style.display === 'none') {
            appWindow.style.display = 'block';
            focusWindow(appWindow);
            document.getElementById(`${app.id}-icon`).classList.add('active');
        } else {
            appWindow.style.display = 'none';
            document.getElementById(`${app.id}-icon`).classList.remove('active');
        }
    } else {
        openApp(app.id, app.name);
    }
}

function updateClock(clock) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString();
    clock.innerHTML = `<time>${time}</time><date>${date}</date>`;
}
