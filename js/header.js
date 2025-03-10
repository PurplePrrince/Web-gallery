// Уменьшение шапки при скролле
function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 200,
        headerEl = document.getElementById('js-header');
  
  if (distanceY > shrinkOn) {
      headerEl.classList.add("smaller");
  } else {
      headerEl.classList.remove("smaller");
  }
}

// Элементы поиска
const searchInput = document.querySelector('.input');

// Функция фильтрации карточек по символам в тегах
function filterCardsByTags(searchTerm) {
    const cards = document.querySelectorAll('.card');
    const searchTags = searchTerm.toLowerCase().split(',').map(tag => tag.trim()).filter(tag => tag);

    cards.forEach(card => {
        const cardTags = card.getAttribute('data-tags').toLowerCase();
        
        // Если поле пустое, показываем все карточки
        if (searchTags.length === 0) {
            card.classList.remove('hidden');
            return;
        }

        // Проверяем, содержится ли хотя бы одна подстрока из searchTags в cardTags
        const matches = searchTags.some(searchTag => cardTags.includes(searchTag));
        
        if (matches) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Обработка ввода в search-bar
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    filterCardsByTags(searchTerm);
});

// Убираем blur, фильтр остаётся активным, пока текст не изменён

// Привязка событий
window.addEventListener('scroll', resizeHeaderOnScroll);

searchInput.addEventListener('input', (e) => {
  filterCardsByTags(e.target.value);
});

