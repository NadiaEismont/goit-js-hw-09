const refs = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]')
}

// const colorInterval = 1000;
let IntervalId = null;

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

function onButtonStart() {
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;


    IntervalId = setInterval(
        function() {
            let getRandomHexColor = Math.floor(Math.random() * 16777215).toString(16);
            document.body.style.backgroundColor = "#" + getRandomHexColor;
        }, 1000);
}



function onButtonStop() {
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
    clearInterval(IntervalId)
}
refs.buttonStart.addEventListener('click', onButtonStart);
refs.buttonStop.addEventListener('click', onButtonStop);