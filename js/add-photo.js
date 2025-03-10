// Элементы для добавления фото
const addPhotoBtn = document.querySelector('.add-photo-btn');
const addPhotoModalOverlay = document.querySelector('.add-photo-modal-overlay');
const addPhotoModal = document.querySelector('.add-photo-modal');
const addPhotoForm = document.getElementById('add-photo-form');
const closeAddModalBtn = document.querySelector('.close-add-modal');
const cardsContainer = document.querySelector('.cards-container');

// Открытие модального окна
addPhotoBtn.addEventListener('click', () => {
    addPhotoModalOverlay.style.display = 'flex';
});

// Закрытие модального окна
closeAddModalBtn.addEventListener('click', () => {
    addPhotoModalOverlay.style.display = 'none';
    addPhotoForm.reset(); // Очистка формы
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

    // Проверка, что файл выбран
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const imageUrl = URL.createObjectURL(file); // Создаём временный URL для изображения

        // Создание новой карточки
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.setAttribute('data-description', description);
        newCard.setAttribute('data-tags', tags);

        newCard.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
            <p class="description">${description}</p>
        `;

        // Добавление карточки в контейнер
        cardsContainer.prepend(newCard); // Добавляем в начало

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

        // Закрытие модального окна и очистка формы
        addPhotoModalOverlay.style.display = 'none';
        addPhotoForm.reset();
    }
});