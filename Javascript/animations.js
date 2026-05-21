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