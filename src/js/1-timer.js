import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function startTimer() {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      convertMs(0);
      iziToast.success({
        title: "Time's up!",
        message: 'The time is over. Would you like to start over?',
        position: 'topRight',
      });
      dateTimePicker.disabled = false;
      return;
    }
    convertMs(timeLeft);
  }, 1000);
}

startBtn.addEventListener('click', startTimer);
