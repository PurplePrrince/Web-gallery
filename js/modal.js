// Открытие модального окна
const cards = document.querySelectorAll('.card');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('img');
const modalTitle = modal.querySelector('h3');
const modalDescription = modal.querySelector('.full-description');
const modalTags = modal.querySelector('.tags');
const closeModalButton = modal.querySelector('.close-modal');

cards.forEach(card => {
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
});

// Закрытие модального окна
closeModalButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});