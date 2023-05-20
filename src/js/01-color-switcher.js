const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let timer;

startButton.addEventListener('click', () => {
    timer = setInterval(() => {
       document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    startButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);

    startButton.disabled = false;
});


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

