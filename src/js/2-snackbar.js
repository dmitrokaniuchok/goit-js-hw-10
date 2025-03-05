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
      position: 'topRight',
      title: '❌ Error',
      message: 'Please enter a valid positive delay value',
    });
    return;
  }
  createPromise(radioValue, delayValue);

  form.reset();
});

function createPromise(selectedRadio, selectedDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadio === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${selectedDelay}ms`);
      } else {
        reject(`❌ Rejected promise in ${selectedDelay}ms`);
      }
    }, selectedDelay);
  })
    .then(message => {
      iziToast.success({
        position: 'topRight',
        title: 'Success',
        message: message,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: error,
      });
    });
}
