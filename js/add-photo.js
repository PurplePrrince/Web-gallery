// Элементы для добавления фото
const addPhotoBtn = document.querySelector('.add-photo-btn');
const addPhotoModalOverlay = document.querySelector('.add-photo-modal-overlay');
const addPhotoModal = document.querySelector('.add-photo-modal');
const addPhotoForm = document.getElementById('add-photo-form');
const closeAddModalBtn = document.querySelector('.close-add-modal');
const cardsContainer = document.querySelector('.cards-container');

// Загрузка карточек из localStorage при старте
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

    // Привязка события клика для открытия текущего модального окна
    newCard.addEventListener('click', () => {
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalImage = modalOverlay.querySelector('img');
        const modalTitle = modalOverlay.querySelector('h3');
        const modalDescription = modalOverlay.querySelector('.full-description');
        const modalTags = modalOverlay.querySelector('.tags');

        modalImage.src = imageUrl;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalTags.textContent = `Теги: ${tags}`;

        modalOverlay.style.display = 'flex';
    });

    cardsContainer.prepend(newCard);
}

// Сохранение карточек в localStorage
function saveCardToStorage(imageUrl, title, description, tags) {
    const savedCards = JSON.parse(localStorage.getItem('swampCards')) || [];
    const newCardData = { imageUrl, title, description, tags };
    savedCards.push(newCardData);
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

    // Получение данных из формы
    const fileInput = document.getElementById('photo-upload');
    const title = document.getElementById('photo-title').value;
    const description = document.getElementById('photo-description').value;
    const tags = document.getElementById('photo-tags').value || 'Без тегов';

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result; // Base64 строка изображения

            // Создание и добавление карточки
            const cardData = { imageUrl, title, description, tags };
            createCard(cardData);

            // Сохранение в localStorage
            saveCardToStorage(imageUrl, title, description, tags);

            // Закрытие модального окна и очистка формы
            addPhotoModalOverlay.style.display = 'none';
            addPhotoForm.reset();
        };

        reader.readAsDataURL(file); // Преобразование файла в Base64
    }
});

// Загрузка сохранённых карточек при старте страницы
document.addEventListener('DOMContentLoaded', loadCardsFromStorage);