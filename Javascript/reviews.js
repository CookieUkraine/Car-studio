const reviewsContainer = document.querySelector('.review-container');

export function renderRating(rating){
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
    const reviewsArray = [...reviews];

    reviewsArray.forEach((review, id) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <div class="review-box">
                <div class="author-data"><img src="${review.profilePicture}" alt="Profile Picture" class="profile-picture"><p class="review-rating">${rating(review.rating)}</p></div>
                <p class="review-text">${review.text}</p>
            </div>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}