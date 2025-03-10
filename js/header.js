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
      const matches = searchTags.length === 0 || searchTags.some(searchTag => cardTags.includes(searchTag));
      
      if (matches) {
          card.classList.remove('hidden');
          card.style.display = 'block'; // Показываем карточку
      } else {
          card.classList.add('hidden');
          // Даём анимации завершиться, затем скрываем
          setTimeout(() => {
              if (card.classList.contains('hidden')) {
                  card.style.display = 'none';
              }
          }, 300); // 300мс соответствует времени transition
      }
  });
}

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

