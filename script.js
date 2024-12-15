const timeText = document.getElementById('time-text');
const dateText = document.getElementById('date-text');
const themeToggleButton = document.getElementById('theme-toggle-btn');
const fullscreenToggleButton = document.getElementById('fullscreen-btn');
const logContent = document.getElementById('log-content');
const geoBox = document.getElementById('log-box');
const heroTitle = document.getElementById('hero-title');
let buttonsVisible = true;

function updateTime(){
    const currentTime = new Date();
    const date = currentTime.toDateString();
    dateText.innerText = date;
    let hours = currentTime.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    let minutes = currentTime.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = currentTime.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timeText.innerText = `${hours}:${minutes}:${seconds}`;
}

updateTime();
setInterval(updateTime, 500);

const fullScreenIcon = document.getElementById('full-screen-icon');
const exitFullScreenIcon = document.getElementById('normal-screen-icon');

function toggleFullScreen(){
    if (fullScreenIcon.classList.contains('hidden')) {
        fullScreenIcon.classList.remove('hidden');
        exitFullScreenIcon.classList.add('hidden');
        document.exitFullscreen();
    }else{
        fullScreenIcon.classList.add('hidden');
        exitFullScreenIcon.classList.remove('hidden');
        document.documentElement.requestFullscreen();
    }
}

function toggleButtonsVisibility(){
  if (buttonsVisible) {
      themeToggleButton.classList.add('hidden');
      fullscreenToggleButton.classList.add('hidden');
  }else{
    themeToggleButton.classList.remove('hidden');
    fullscreenToggleButton.classList.remove('hidden');
  }
  buttonsVisible = !buttonsVisible;
}

function toggleTheme(){
  document.body.classList.toggle('light-theme');
  if (!isLightTheme()) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
  }else{
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
  }
  configureParticleJs();
}

function showKeyboardShortcutsInfo(){
  const alertForMobile = isMobileDevice() ? "On Mobile: Double tap to toggle fullscreen, Single tap to toggle buttons visibility.\n\n" : "";
  alert(
    alertForMobile +
    "Supported Keyboard Shortcuts:\n\n" +
    "f - Toggle Full Screen\n" +
    "h - Toggle Buttons Visibility\n" +
    "t - Toggle Theme\n" +
    "l - Log current date and time\n" +
    "L - Toggle Logs visibility\n" +
    "Q - Set a new title for the clock\n" +
    "i - To show this message\n"
  );
}

fullscreenToggleButton.addEventListener('click', toggleFullScreen);

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'f') {
        toggleFullScreen();
    }
    if (event.key == 'h') {
        // Toggle buttons visibility
        toggleButtonsVisibility();
    }
    if (event.key == 't') {
        // Toggle buttons visibility
        toggleTheme();
    }
    if (event.key === 'l') {
      if (geoBox.classList.contains('hidden')) geoBox.classList.remove('hidden');
      const currentTime = new Date().toLocaleString();
      const logEntry = document.createElement('p');
      logEntry.textContent = currentTime;
      logContent.appendChild(logEntry);
      logContent.scrollTop = logContent.scrollHeight;
    }
    if (event.key === 'L') {
      geoBox.classList.toggle('hidden');
    }
    if (event.key === 'Q') {
      // Ask user to enter a new title
      const newTitle = prompt("Enter a title for the clock (Leave empty to clear title):");
      if (newTitle) {
          heroTitle.textContent = newTitle;
          heroTitle.classList.remove('hidden');
      }else{
        heroTitle.classList.add('hidden');
      }
    }
    if (event.key === 'i' || event.key === 'I') {
      // Show an alert with keyboard shortcuts info
      showKeyboardShortcutsInfo();
    }
});

function isLightTheme(){
    return document.body.classList.contains('light-theme');
}

const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

themeToggleButton.addEventListener('click', () => {toggleTheme();});

function configureParticleJs(){
    const backgroundColor = isLightTheme() ? '#000000' : '#ffffff';
    particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: backgroundColor },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: backgroundColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
}

configureParticleJs();

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  document.body.addEventListener('click', () => {
    toggleButtonsVisibility();
  });
  // double click to toggle fullscreen
  document.body.addEventListener('dblclick', () => {
    toggleFullScreen();
  });
}

document.getElementById('info-btn').addEventListener('click', () => {
  showKeyboardShortcutsInfo();
});


setInterval(() => {
  document.getElementById('btm-warn-text').classList.add('hidden');
}, 4000);