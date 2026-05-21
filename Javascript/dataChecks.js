export function checkEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
        document.querySelector('.email').value = "";
        document.querySelector('.email').placeholder = "Пошта некоректна";
        document.querySelector('.email').classList.add('text-incorrect');
        return false;
    }
    return true;
}
export function checkName(name) {
    const namePattern = /^[A-Za-zА-Яа-яІіЇїЄє\s-]+$/;
    if (!namePattern.test(name)) {
        document.querySelector('.name').value = "";
        document.querySelector('.name').placeholder = "Ім'я некоректне";
        document.querySelector('.name').classList.add('text-incorrect');
        return false;
    }
    return true;
}
export function checkBirthYear(birthYear) {
    const currentYear = new Date().getFullYear();
    const yearValue = parseInt(birthYear, 10);
    
    const isFormatValid = /^[0-9]{4}$/.test(birthYear);
    const isRangeValid = yearValue >= 1900 && yearValue <= currentYear;

    if (!isFormatValid || !isRangeValid) {
        const inputField = document.querySelector('.birth-year');
        inputField.value = "";
        inputField.placeholder = "Рік некоректний";
        inputField.classList.add('text-incorrect');
        return false;
    }
    
    document.querySelector('.birth-year').classList.remove('text-incorrect');
    return true;
}
// export function checkPhone(phone) {
//     phoneInput = document.querySelector('.phone');
//     if (!phonePattern.test(phone)) {
//         phoneInput.value = "";
//         phoneInput.placeholder = "Телефон некоректний";
//         phoneInput.classList.add('text-incorrect');
//         return false;
//     }
//     phoneInput.classList.remove('text-incorrect');
//     return true;
// }