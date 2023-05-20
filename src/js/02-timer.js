import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMins = document.querySelector('[data-minutes]');
const dataSecs = document.querySelector('[data-seconds]');
const dataInput = document.querySelector('#datetime-picker');

let timer;

startBtn.disabled = true;

function addLeadZero(value) {
  return value.toString().padStart(2, '0');
}

const start = () => {
  startBtn.disabled = true;
  timer = setInterval(() => {
    const selectedDate = new Date(dataInput.value).getTime();
    const currentTime = new Date().getTime();
    const countDown = selectedDate - currentTime;
    const countDownMath = convertMs(countDown);
    dataDays.textContent = addLeadZero(countDownMath.days);
    dataHours.textContent = addLeadZero(countDownMath.hours);
    dataMins.textContent = addLeadZero(countDownMath.minutes);
    dataSecs.textContent = addLeadZero(countDownMath.seconds);
    if (countDown < 1000) {
      clearInterval(timer);
      startBtn.disabled = false;
    }
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date();
    if (selectedDates[0] < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', start);
    }
  },
};

flatpickr(dataInput, options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}