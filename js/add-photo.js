// Элементы для добавления фото
const addPhotoBtn = document.querySelector('.add-photo-btn');
const addPhotoModalOverlay = document.querySelector('.add-photo-modal-overlay');
const addPhotoForm = document.getElementById('add-photo-form');
const closeAddModalBtn = document.querySelector('.close-add-modal');
const cardsContainer = document.querySelector('.cards-container'); // Единственное объявление здесь

// Загрузка карточек из localStorage
function loadCardsFromStorage() {
    const savedCards = JSON.parse(localStorage.getItem('swampCards')) || [];
    savedCards.forEach(cardData => createCard(cardData));
}

// Создание карточки
function createCard(cardData) {
    const { imageUrl, title, description, tags } = cardData;

    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-description', description);
    newCard.setAttribute('data-tags', tags);

    newCard.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p class="description">${description}</p>
    `;

    cardsContainer.prepend(newCard);
    bindCardEvents(newCard); // Используем функцию из modal.js
}

// Сохранение в localStorage
function saveCardToStorage(imageUrl, title, description, tags) {
    const savedCards = JSON.parse(localStorage.getItem('swampCards')) || [];
    savedCards.push({ imageUrl, title, description, tags });
    localStorage.setItem('swampCards', JSON.stringify(savedCards));
}

// Открытие модального окна
addPhotoBtn.addEventListener('click', () => {
    addPhotoModalOverlay.style.display = 'flex';
});

// Закрытие модального окна
closeAddModalBtn.addEventListener('click', () => {
    addPhotoModalOverlay.style.display = 'none';
    addPhotoForm.reset();
});

addPhotoModalOverlay.addEventListener('click', (e) => {
    if (e.target === addPhotoModalOverlay) {
        addPhotoModalOverlay.style.display = 'none';
        addPhotoForm.reset();
    }
});

// Обработка отправки формы
addPhotoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('photo-upload');
    const title = document.getElementById('photo-title').value;
    const description = document.getElementById('photo-description').value;
    const tags = document.getElementById('photo-tags').value || 'Без тегов';

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const cardData = { imageUrl, title, description, tags };

            createCard(cardData);
            saveCardToStorage(imageUrl, title, description, tags);

            addPhotoModalOverlay.style.display = 'none';
            addPhotoForm.reset();
        };

        reader.readAsDataURL(file);
    }
});

// Загрузка при старте
document.addEventListener('DOMContentLoaded', loadCardsFromStorage);