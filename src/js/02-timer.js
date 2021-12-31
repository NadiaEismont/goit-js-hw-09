import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    timerPicker: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('button[data-start]'),
    spanDays: document.querySelector('span[data-days]'),
    spanHours: document.querySelector('span[data-hours]'),
    spanMins: document.querySelector('span[data-minutes]'),
    spanSecs: document.querySelector('span[data-seconds]'),
}
let chosenDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        chosenDate = selectedDates[0];
        if (chosenDate < Date.now()) {
            Notiflix.Notify.warning("Please choose a date in the future");
            refs.buttonStart.disabled = true;
        } else {
            refs.buttonStart.disabled = false;
        }
    },
};
refs.buttonStart.disabled = true;
flatpickr(refs.timerPicker, options);

const zeroPad = (num, places) => String(num).padStart(places, '0')

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function countdownTimer() {
    let timerID = null;
    const isActive = false;

    const defaultDate = Date.now();

    timerID = setInterval(() => {
        const currentTime = Date.now();
        const reversTime = chosenDate - currentTime;
        if (reversTime > 0) {
            const { days, hours, minutes, seconds } = convertMs(reversTime);
            refs.spanDays.textContent = zeroPad(days, 2);
            refs.spanHours.textContent = zeroPad(hours, 2);
            refs.spanMins.textContent = zeroPad(minutes, 2);
            refs.spanSecs.textContent = zeroPad(seconds, 2);
        } else {
            refs.spanDays.textContent = '00';
            refs.spanHours.textContent = '00';
            refs.spanMins.textContent = '00';
            refs.spanSecs.textContent = '00';
            clearInterval(timerID);
        }

    }, 1000);
}



refs.buttonStart.addEventListener('click', countdownTimer);