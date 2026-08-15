import {observer} from "./animations.js";
import {services} from "./services.js";
import {checkEmail, checkName, checkBirthYear} from "./dataChecks.js";
import {renderRating, reviews} from "./reviews.js";
import Inputmask from "https://cdn.jsdelivr.net/npm/inputmask@5.0.8/dist/inputmask.es6.js";

const button = document.querySelector('.header-button');
const servicesScreen = document.querySelector('.services-screen');
const contactsScreen = document.querySelector('.contacts');
button.addEventListener('click', function() {
    smoothScrollTo(servicesScreen);
}); 
const hamburger = document.getElementById('hamburger-menu');
const dropdown = document.getElementById('hamburger-dropdown');
const dropdownMobile = document.getElementById('hamburger-dropdown-mobile');
const locationButton = document.querySelector('.location-button');
locationButton.addEventListener('click', (e) => {
    e.stopPropagation();
    smoothScrollTo(contactsScreen);
});
hamburger.addEventListener('click', (e) => {
    if (window.innerWidth > 430) {
        e.stopPropagation();
        const isOpen = hamburger.classList.toggle('open');
        dropdown.classList.toggle('open', isOpen);
    } else {
        e.stopPropagation();
        const isOpen = hamburger.classList.toggle('open');
        dropdownMobile.classList.toggle('open', isOpen);
    }
});



// Close when clicking anywhere outside
document.addEventListener('click', () => {
    if (window.innerWidth > 430) {
        dropdown.classList.remove('open');
    } else {
        dropdownMobile.classList.remove('open');
    }
    hamburger.classList.remove('open');
    dropdown.classList.remove('open');
});

function smoothScrollTo(target, duration = 800) {
    const headerHeight = header.classList.contains('sticky') ? header.offsetHeight : 0;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOut(progress));
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}
// Scroll to section on link click
dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('open');
        dropdown.classList.remove('open');
        const target = document.querySelector('.' + link.dataset.target);
        if (target) smoothScrollTo(target);
    });
});
dropdownMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('open');
        dropdownMobile.classList.remove('open');
        const target = document.querySelector('.' + link.dataset.target);
        if (target) smoothScrollTo(target);
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
function showModal(Title, Message) {
    const modalTitle = document.querySelector('.modal-title');
    const modalMessage = document.querySelector('.modal-message');
    modalTitle.textContent = Title;
    modalMessage.textContent = Message;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal-content').innerHTML = '';
}
function hideModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}
submitButton.addEventListener('click', function(e) {

    const name = document.querySelector('.name').value;
    const phone = document.querySelector('.phone').value;
    const email = document.querySelector('.email').value;
    const birthYear = document.querySelector('.birth-year').value;

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
    showModal("Дякуємо!", "Наші менеджери зв'яжуться з вами.");
});
closeBtn.addEventListener('click', () => {
  hideModal();
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

const buttonConfigs = [
    { image: "images/Second Screen/film-coating.jpg",    service: services.protectionFilm,    descClass: 'first'  },
    { image: "images/Second Screen/tint.jpg",            service: services.tint,              descClass: 'second' },
    { image: "images/Second Screen/protective-film.jpg", service: services.wrapping,          descClass: 'third'  },
    { image: "images/Second Screen/detailing.jpg",       service: services.detailing,         descClass: 'fourth' },
    { image: "images/Second Screen/powder-painting.jpg", service: services.powderPainting,    descClass: 'fifth'  },
    { image: "images/Second Screen/support-painting.jpg",service: services.supportsPainting,  descClass: 'sixth'  },
];

servicesScreenButtons.forEach((button, i) => {
    const { image, service, descClass } = buttonConfigs[i];

    button.addEventListener('click', function () {
        if (window.innerWidth > 430) {
            changeImage(image);
            changeText(service.title, service.description);
            servicesScreenButtons.forEach(btn => btn.classList.remove('clicked'));
            button.classList.add('clicked');
        } else {
            const thisDesc = document.querySelector(`.services-description.${descClass}`);
            thisDesc.classList.toggle('clicked');

            if (thisDesc.innerHTML === "") {
                thisDesc.innerHTML = service.description;
                document.querySelectorAll(`.services-description:not(.${descClass})`).forEach(desc => {
                    desc.classList.remove('clicked');
                    desc.innerHTML = "";
                });
                return;
            }

            document.querySelectorAll('.services-description').forEach(desc => {
                desc.classList.remove('clicked');
                desc.innerHTML = "";
            });
        }
    });
});

//---------------ANIMATION-------------------------------------

const block = document.querySelector('.second-screen-block');
const rect1 = document.querySelector('.rectangle1');
const rect2 = document.querySelector('.rectangle2');

if (block) observer.observe(block);
if (rect1) observer.observe(rect1);
if (rect2) observer.observe(rect2);

//---------------ANIMATION-------------------------------------

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

// ----------Reviews-------------
let reviewsLength = reviews.length;
let reviewNumber = 0;
let review = document.querySelector('.review');
let reviewProfileImage = document.querySelector('.review-profile-image');
function renderReview(review) {
    if (window.innerWidth <= 430) {
            review.innerHTML = `
                <p class="review-rating"><img class="profile-icon" src="${reviews[reviewNumber].profilePicture}"> ${renderRating(reviews[reviewNumber].rating)}</p>
                <p class="review-name">${reviews[reviewNumber].name}</p>
                <p class="review-text">${reviews[reviewNumber].text}</p>
                <div class="review-buttons">
                    <button class="review-button-prev"><</button>
                    <button class="review-button-next">></button>
                </div>
            `;
            reviewProfileImage.innerHTML = `
                <img src="${reviews[reviewNumber].profilePicture}" alt="Profile Picture">
            `;
        }
     
    else {
            review.innerHTML = `
                <p class="review-rating">${renderRating(reviews[reviewNumber].rating)}</p>
                <p class="review-name">${reviews[reviewNumber].name}</p>
                <p class="review-text">${reviews[reviewNumber].text}</p>
                <div class="review-buttons">
                    <button class="review-button-prev"><</button>
                    <button class="review-button-next">></button>
                </div>
            `;
            reviewProfileImage.innerHTML = `
                <img src="${reviews[reviewNumber].profilePicture}" alt="Profile Picture">
            `;
        }
    }
function attachEvents() {
    document.querySelector('.review-button-prev')
        .addEventListener('click', () => {
            reviewNumber = (reviewNumber - 1 + reviewsLength) % reviewsLength;
            renderReview(review);
            attachEvents();
        });

    document.querySelector('.review-button-next')
        .addEventListener('click', () => {
            reviewNumber = (reviewNumber + 1) % reviewsLength;
            renderReview(review);
            attachEvents();
        });
}

renderReview(review);
attachEvents();
let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        renderReview(review);
        attachEvents();
    }, 200);
});

const reminderButton = document.querySelector('.set-reminder-button');
reminderButton.addEventListener('click', () => {
    showInputModal('Нагадування!', 'Укажіть номер телефону для нагадування.');
});
function showInputModal(title, message) {
    showModal(title, message);
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <input type="tel" placeholder="Телефон" class="search phone modal-input">
    `;
    const modalInput = modalContent.querySelector('.modal-input');

    const im = new Inputmask("+380 (99) 999-99-99");
    im.mask(modalInput);
}
const servicesScreenBlockButton = document.querySelector('.services-screen-block-button');
servicesScreenBlockButton.addEventListener('click', () => {
    showInputModal('Нагадування', 'Вкажіть ваш номер телефону для запису:');
});
