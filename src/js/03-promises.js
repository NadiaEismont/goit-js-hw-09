import Notiflix from 'notiflix';


const refs = {
    buttonSubmit: document.querySelector('button[type="submit"]'),
    form: document.getElementsByClassName('form'),
    inputDelay: document.querySelector('[name="delay"]'),
    inputStep: document.querySelector('[name="step"]'),
    inputAmount: document.querySelector('[name="amount"]'),
}

function onSubmit(e) {
    e.preventDefault()
    const delay = Number(refs.inputDelay.value);
    const step = Number(refs.inputStep.value);

    for (let index = 1; index <= Number(refs.inputAmount.value); index++) {
        createPromise(index, delay + index * step)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
}

function createPromise(position, delay) {

    return new Promise((resolve, reject) => {
            const shouldResolve = Math.random() > 0.3;
            setTimeout(() => {
                if (shouldResolve) {
                    resolve({ position, delay });
                } else {
                    reject({ position, delay });
                }
            }, delay);
        }

    )
}

refs.buttonSubmit.addEventListener('click', onSubmit);