import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const inputDelay = document.querySelector('input[name="delay"]');
const radios = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayValue = Number(inputDelay.value);
  const radioValue = document.querySelector(
    'input[name="state"]:checked'
  )?.value;

  if (isNaN(delayValue) || delayValue <= 0) {
    iziToast.error({
      icon: '',
      position: 'topRight',
      title: '❌ Error',
      message: 'Please enter a valid positive delay value',
    });
    return;
  }

  createPromise(radioValue, delayValue)
    .then(delay => {
      iziToast.success({
        icon: '',
        position: 'topRight',
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        icon: '',
        position: 'topRight',
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
      });
    });

  form.reset();
});

function createPromise(selectedRadio, selectedDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadio === 'fulfilled') {
        resolve(selectedDelay);
      } else {
        reject(selectedDelay);
      }
    }, selectedDelay);
  });
}
