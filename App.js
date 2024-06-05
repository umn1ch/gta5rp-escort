// ABOUT US SECTION
// MAKING NUMBER EXPONENTIALLY INCREASE
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function startCountAnimation() {
    var counter = document.getElementById('counter');
    var number = 0;
    var maxNumber = 3819;
    var exponentialFactor = 0.4; // Коэффициент экспоненциальной функции
    var interval = setInterval(function() {
        if (number >= maxNumber) {
            clearInterval(interval);
            return;
        }
        var exponentialValue = Math.pow(number / maxNumber, exponentialFactor);
        var increment = Math.ceil(maxNumber * exponentialValue * 0.01); // Увеличение числа с экспоненциальной функцией
        number += increment < 1 ? 1 : increment;
        counter.querySelector('span').textContent = number;
    }, 10);
}

function handleScroll() {
    var section = document.querySelector('#section-with-number');
    if (isElementInViewport(section)) {
        startCountAnimation();
        window.removeEventListener('scroll', handleScroll);
    }
}

window.addEventListener('scroll', handleScroll);
