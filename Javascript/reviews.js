export let reviews = [
    {
        id: 1,
        profilePicture: "images/reviews/profile pictures/user1.jpg",
        text: "Отримав чудовий сервіс! Все зробили швидко та професійно. Машина після роботи виглядає й працює значно краще.",
        rating: 5
    },
    {
        id: 2,
        profilePicture: "images/reviews/profile pictures/user2.avif",
        text: "Дуже сподобався підхід до роботи. Майстри пояснили всі деталі та виконали все без зайвих затримок.",
        rating: 4
    },
    {
        id: 3,
        profilePicture: "images/reviews/profile pictures/user3.png",
        text: "Якісний сервіс і адекватні ціни. Видно, що люди знають свою справу та працюють акуратно.",
        rating: 5
    },
    {
        id: 4,
        profilePicture: "images/reviews/profile pictures/user4.jpg",
        text: "Звертався вперше й залишився повністю задоволений. Роботу виконали навіть швидше, ніж очікував.",
        rating: 5
    },
    {
        id: 5,
        profilePicture: "images/reviews/profile pictures/user5.avif",
        text: "Приємне обслуговування та професійний підхід. Після ремонту авто їде ідеально.",
        rating: 4
    },
    {
        id: 6,
        profilePicture: "images/reviews/profile pictures/user6.avif",
        text: "Все чітко: запис, діагностика та ремонт без зайвих проблем. Однозначно рекомендую.",
        rating: 5
    },
    {
        id: 7,
        profilePicture: "images/reviews/profile pictures/user7.avif",
        text: "Дуже атмосферне місце й хороші спеціалісти. Відразу видно увагу до деталей та досвід.",
        rating: 4
    },
    {
        id: 8,
        profilePicture: "images/reviews/profile pictures/user8.avif",
        text: "Роботу виконали якісно та без прихованих нюансів. Тепер тільки сюди зі своїм авто.",
        rating: 5
    },
    {
        id: 9,
        profilePicture: "images/reviews/profile pictures/user9.avif",
        text: "Швидко знайшли проблему та оперативно її вирішили. Залишився приємно вражений сервісом.",
        rating: 5
    },  
    {
        id: 10,
        profilePicture: "images/reviews/profile pictures/user10.png",
        text: "Команда працює професійно й відповідально. Відчувається, що для них важливий результат і клієнт.",
        rating: 4
    }
];

const reviewsContainer = document.querySelector('.review-container.first');
const reviewsContainerSecond = document.querySelector('.review-container.second');

function rating(rating){
    const starPath = `
            M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z
    `;
    const filledStar = `
        <svg class="review-star-filled" viewBox="0 0 1024 1024">
            <path
                d="${starPath}"
            />
        </svg>
    `;

    const unfilledStar = `
        <svg class="review-star-unfilled" viewBox="0 0 1024 1024">
            <path
                d="${starPath}"
            />
        </svg>
    `;
    return (
        filledStar.repeat(rating) +
        unfilledStar.repeat(5 - rating)
    );
}
export function renderReviews() {
    const trackFirst  = document.querySelector('.review-track.first');
    const trackSecond = document.querySelector('.review-track.second');
    const doubledReviews = [...reviews, ...reviews];

    doubledReviews.forEach((review, id) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <div class="review-box">
                <div class="author-data"><img src="${review.profilePicture}" alt="Profile Picture" class="profile-picture"><p class="review-rating">${rating(review.rating)}</p></div>
                <p class="review-text">${review.text}</p>
            </div>
        `;
        if (id % 2 === 0) {
            trackFirst.appendChild(reviewElement);
        } else {
            trackSecond.appendChild(reviewElement);
        }
    });
}