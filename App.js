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
    var exponentialFactor = 0.4; 
    var interval = setInterval(function() {
        if (number >= maxNumber) {
            clearInterval(interval);
            return;
        }
        var exponentialValue = Math.pow(number / maxNumber, exponentialFactor);
        var increment = Math.ceil(maxNumber * exponentialValue * 0.01); 
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

// TO CATALOG ANIMATION
document.addEventListener('DOMContentLoaded', function() {
    const catalogSection = document.querySelector('.catalog');
  
    gsap.registerPlugin(ScrollTrigger);
  
    
    gsap.set(catalogSection, {
      background: 'black'
    });
  
    ScrollTrigger.create({
      trigger: catalogSection,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: () => animateBackground(catalogSection, true),
      onLeave: () => animateBackground(catalogSection, false),
      onEnterBack: () => animateBackground(catalogSection, true),
      onLeaveBack: () => animateBackground(catalogSection, false),
    });
  
    function animateBackground(element, isEntering) {
      if (isEntering) {
        gsap.to(element, {
          background: 'radial-gradient(circle, oklch(65% 0.18 15) 0%, rgba(0,0,0,1) 100%)',
          duration: 2
        });
      } else {
        gsap.to(element, {
          background: 'black',
          duration: 2
        });
      }
    }
  });

  // GIRL APPLICANT FORM
  document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var message = "Имя: " + formData.get("name") + "\nВозраст: " + formData.get("age") + "\nНомер телефона: " + formData.get("phone");
    var chatId = "-4247224800";
    var telegramApiUrl = "https://api.telegram.org/bot7337563124:AAEwsrsQaYJWoWntT8sdR4wO9ukNUhbJUCY/sendMessage";
    var jsonData = {
      chat_id: chatId,
      text: message
    };
    axios.post(telegramApiUrl, jsonData)
      .then(function (response) {
        console.log('Сообщение успешно отправлено:', response);
      })
      .catch(function (error) {
        console.error('Ошибка при отправке сообщения:', error);
      });
  });

  // CLOSE FORM + POP-UP
  document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('girlApplicant').close();

    var popup = document.getElementById('popup');
    popup.classList.add('show');
    setTimeout(function() {
      popup.classList.remove('show');
    }, 3000);

    event.target.reset();
  });

  // CLIENT FORM
  document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');
    var dialog = document.getElementById('clientFormDialog');
    var girlInput = document.getElementById('girl');
    var priceInput = document.getElementById('price');

    cards.forEach(function(card) {
      card.addEventListener('click', function(event) {
        event.preventDefault();
        var title = card.querySelector('.card__title').textContent;
        var price = card.querySelector('.card__description').textContent.split(': $')[1].split('/')[0];

        girlInput.value = title;
        priceInput.value = price;

        dialog.showModal();
      });
    });

    document.getElementById('clientForm').addEventListener('submit', function(event) {
      event.preventDefault();

      var formData = new FormData(this);
      var girl = formData.get('girl');
      var price = formData.get('price');
      var message =
        "Имя: " + formData.get("name") +
        "\nНомер телефона: " + formData.get("phone") +
        "\nВремя: " + formData.get("time") +
        "\nДевушка: " + girl +
        "\nКомментарий: " + formData.get("comment") +
        "\nЦена: " + price;

      var chatId = "-4247224800";
      var telegramApiUrl = "https://api.telegram.org/bot7337563124:AAEwsrsQaYJWoWntT8sdR4wO9ukNUhbJUCY/sendMessage";
      var jsonData = {
        chat_id: chatId,
        text: message
      };

      axios.post(telegramApiUrl, jsonData)
        .then(function(response) {
          console.log('Сообщение успешно отправлено:', response);

          dialog.close();

          var popup = document.getElementById('popup');
          popup.classList.add('show');
          setTimeout(function() {
            popup.classList.remove('show');
          }, 3000);

          event.target.reset();
        })
        .catch(function(error) {
          console.error('Ошибка при отправке сообщения:', error);
        });
    });
  });
