<<<<<<< HEAD
export const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0
});
=======
const block = document.querySelector('.second-screen-block');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            block.classList.add('show');
        }
    });
}, {
    threshold: 0.3 // коли 30% блоку видно
});

observer.observe(block);
>>>>>>> 8f1b5cabb40136640e7eca2d1d1035c976f0056b
