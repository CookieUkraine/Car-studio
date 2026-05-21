// import {} from "/animations.js";
import {services} from "./services.js";
import {checkEmail, checkName, checkBirthYear} from "./dataChecks.js";
import { reviews, renderReviews} from "./reviews.js";

const button = document.querySelector('.header-button');
const servicesScreen = document.querySelector('.services-screen');
button.addEventListener('click', function() {
    servicesScreen.scrollIntoView({behavior: 'smooth'});
});
const hamburger = document.getElementById('hamburger-menu');
const dropdown = document.getElementById('hamburger-dropdown');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = hamburger.classList.toggle('open');
    dropdown.classList.toggle('open', isOpen);
});

// Close when clicking anywhere outside
document.addEventListener('click', () => {
    hamburger.classList.remove('open');
    dropdown.classList.remove('open');
});

// Scroll to section on link click
dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('open');
        dropdown.classList.remove('open');
        const target = document.querySelector('.' + link.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

const header = document.querySelector('header');
const firstScreen = document.querySelector('.Title-screen');

window.addEventListener('scroll', () => {
    const firstScreenBottom = firstScreen.offsetHeight;

    if (window.scrollY >= firstScreenBottom) {
        header.classList.remove('sticky-leave');
        header.classList.add('sticky');
    } else {
        if (header.classList.contains('sticky')) {
            header.classList.add('sticky-leave');
            header.classList.remove('sticky');

            // removing leave class after animation finishes
            header.addEventListener('animationend', () => {
                header.classList.remove('sticky-leave');
            }, { once: true });
        }
    }
});

//------------------------------------------------REGISTRATION-----------------------------------------------------

const submitButton = document.querySelector('.submit-button');
const overlay = document.querySelector('.sending-overlay');
const closeBtn = document.querySelector('.close-btn');

submitButton.addEventListener('click', function(e) {

    const name = document.querySelector('.name').value;
    const phone = document.querySelector('.phone').value;
    const email = document.querySelector('.email').value;
    const birthYear = document.querySelector('.birth-year').value;

    const overlay = document.querySelector('.sending-overlay');

    localStorage.setItem('name', name);
    localStorage.setItem('phone', phone);
    localStorage.setItem('email', email);
    localStorage.setItem('birthYear', birthYear);

    let isValid = true;

    // Пошта
    if (!checkEmail(email)) {
        isValid = false;
    } else {
        document.querySelector('.email')
            .classList.remove('text-incorrect');
    }

    // Ім'я
    if (!checkName(name)) {
        isValid = false;
    } else {
        document.querySelector('.name')
            .classList.remove('text-incorrect');
    }

    // Рік народження
    if (!checkBirthYear(birthYear)) {
        isValid = false;
    } else {
        document.querySelector('.birth-year')
            .classList.remove('text-incorrect');
    }

    // Перевірка помилок
    if (!isValid) {
        e.preventDefault();
        return;
    }

    // Показ overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
    document.body.style.overflow = '';
});
function loadUserData() {
    const name = localStorage.getItem('name');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');
    const birthYear = localStorage.getItem('birthYear');

    if (name && !document.querySelector('.name').classList.contains('text-incorrect')) {
        document.querySelector('.name').value = name;
    }
    if (phone) {
        document.querySelector('.phone').value = phone;
    }
    if (email && !document.querySelector('.email').classList.contains('text-incorrect')) {
        document.querySelector('.email').value = email;
    }
    if (birthYear && !document.querySelector('.birth-year').classList.contains('text-incorrect')) {
        document.querySelector('.birth-year').value = birthYear;
    }
}
loadUserData();



//--------------------------------------------SECOND SCREEN--------------------------------------------
let servicesScreenButtons = document.querySelectorAll('.services-screen-button');
const servicesScreenImage = document.querySelector('.background-block-image');
let blockTitle = document.querySelector('.services-screen-block-text1');
let blockDescription = document.querySelector('.services-screen-block-text2');
let currentImage = "";
let currentTitle = "";
let currentDescription = "";
function changeImage(newSrc) {
    if (currentImage === newSrc) {
        return;
    }
    currentImage = newSrc;
    servicesScreenImage.classList.add('fade-out');
    
    setTimeout(() => {
        servicesScreenImage.src = newSrc;
        servicesScreenImage.classList.remove('fade-out');
    }, 200);
}
let typingSpeed = 30;

let typingState = {
    timeout: null,
    sessionId: 0
};

function clearTyping() {
    if (typingState.timeout) {
        clearTimeout(typingState.timeout);
        typingState.timeout = null;
    }
}

function typeText(element, text, sessionId, callback) {
    element.textContent = "";
    let i = 0;

    function type() {
        //Зупинка при новій сесії
        if (sessionId !== typingState.sessionId) return;
        
        //друкування
        if (i < text.length) {
            element.textContent += text[i];
            i++;

            typingState.timeout = setTimeout(type, typingSpeed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

function changeText(newTitle, newDescription) {
    if (currentTitle === newTitle && currentDescription === newDescription) {
        return;
    }

    currentTitle = newTitle;
    currentDescription = newDescription;

    // Зупиняємо попередню анімацію
    clearTyping();
    typingState.sessionId++;

    const currentSession = typingState.sessionId;

    // fade-out (опціонально)
    blockTitle.classList.add('fade-out');
    blockDescription.classList.add('fade-out');

    setTimeout(() => {
        // якщо вже прийшов новий виклик — не продовжуємо
        if (currentSession !== typingState.sessionId) return;

        blockTitle.classList.remove('fade-out');
        blockDescription.classList.remove('fade-out');

        // очищаємо текст
        blockTitle.textContent = "";
        blockDescription.textContent = "";

        // друк
        typeText(blockTitle, newTitle, currentSession, () => {
            typeText(blockDescription, newDescription, currentSession);
        });

    }, 200);
}

const servicesScreenButton1 = document.getElementById('services-screen-button-1');
const servicesScreenButton2 = document.getElementById('services-screen-button-2');
const servicesScreenButton3 = document.getElementById('services-screen-button-3');
const servicesScreenButton4 = document.getElementById('services-screen-button-4');
const servicesScreenButton5 = document.getElementById('services-screen-button-5');
const servicesScreenButton6 = document.getElementById('services-screen-button-6');

servicesScreenButton1.addEventListener('click', function(e) {
    changeImage("../images/Second Screen/Плівкове покриття.jpg");
    changeText(services.protectionFilm.title, services.protectionFilm.description);
    servicesScreenButtons.forEach(button => button.classList.remove('clicked'));
    servicesScreenButton1.classList.add('clicked');
});
servicesScreenButton2.addEventListener('click', function(e) {
    changeImage("../images/Second Screen/Тонування.jpg");
    changeText(services.tint.title, services.tint.description);
    servicesScreenButtons.forEach(button => button.classList.remove('clicked'));
    servicesScreenButton2.classList.add('clicked');
});
servicesScreenButton3.addEventListener('click', function(e) {
    changeImage("../images/Second Screen/Захисна плівка.jpg");
    changeText(services.wrapping.title, services.wrapping.description);
    servicesScreenButtons.forEach(button => button.classList.remove('clicked'));
    servicesScreenButton3.classList.add('clicked');
});
servicesScreenButton4.addEventListener('click', function(e) {
    changeImage("../images/Second Screen/Детейлінг.jpg");
    changeText(services.detailing.title, services.detailing.description);
    servicesScreenButtons.forEach(button => button.classList.remove('clicked'));
    servicesScreenButton4.classList.add('clicked');   
});
servicesScreenButton5.addEventListener('click', function(e) {
    changeImage("../images/Second Screen/Порошкове фарбування.jpg");
    changeText(services.powderPainting.title, services.powderPainting.description);
    servicesScreenButtons.forEach(button => button.classList.remove('clicked'));
    servicesScreenButton5.classList.add('clicked');
});
servicesScreenButton6.addEventListener('click', function(e) {
    changeImage("../images/Second Screen/Фарбування супортів.jpg");
    changeText(services.supportsPainting.title, services.supportsPainting.description);
    servicesScreenButtons.forEach(button => button.classList.remove('clicked'));
    servicesScreenButton6.classList.add('clicked');
});

const slides = [...document.querySelectorAll('.gallery-slide')];

const slidesCount = slides.length;
const ANIMATION_DURATION = 520;

let currentSlide = 0;
let isAnimating = false;

function getSlidePosition(index) {
    const difference = (index - currentSlide + slidesCount) % slidesCount;

    if (difference === 0) return 'slot-center';
    if (difference === 1) return 'slot-right';
    if (difference === slidesCount - 1) return 'slot-left';

    return difference <= Math.floor(slidesCount / 2)
        ? 'slot-hidden-right'
        : 'slot-hidden-left';
}

function renderSlides() {
    slides.forEach((slide, index) => {
        slide.className = `gallery-slide ${getSlidePosition(index)}`;
    });
}

function changeSlide(direction) {
    if (isAnimating) return;

    isAnimating = true;

    currentSlide =
        (currentSlide + direction + slidesCount) % slidesCount;

    renderSlides();

    setTimeout(() => {
        isAnimating = false;
    }, ANIMATION_DURATION);
}

slides.forEach(slide => {
    slide.style.transition = 'none';
});

renderSlides();

requestAnimationFrame(() => {
    slides.forEach(slide => {
        slide.style.transition = '';
    });
});

document
    .querySelector('.gallery-btn-prev')
    .addEventListener('click', () => changeSlide(-1));

document
    .querySelector('.gallery-btn-next')
    .addEventListener('click', () => changeSlide(1));

// REVIEWS SCREEN
renderReviews();