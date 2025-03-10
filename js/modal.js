// Элементы для просмотра карточек
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = modalOverlay.querySelector('img');
const modalTitle = modalOverlay.querySelector('h3');
const modalDescription = modalOverlay.querySelector('.full-description');
const modalTags = modalOverlay.querySelector('.tags');
const closeModalButton = modalOverlay.querySelector('.close-modal');

// Функция для привязки событий к карточкам
function bindCardEvents(card) {
    card.addEventListener('click', () => {
        const imageSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const fullDescription = card.getAttribute('data-description');
        const tags = card.getAttribute('data-tags');

        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = fullDescription;
        modalTags.textContent = `Теги: ${tags}`;

        modalOverlay.style.display = 'flex';
    });
}

// Привязка событий к существующим карточкам
document.querySelectorAll('.card').forEach(card => bindCardEvents(card));

// Закрытие модального окна
closeModalButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        modalOverlay.style.display = 'none';
    }
});