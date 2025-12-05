//Клик по объявления
document.querySelectorAll('.listing-card, .ad-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Проверяем, что кликнули не по сердечку
        if (!e.target.closest('.favorite-btn-small') && !e.target.closest('.book-btn') && !e.target.closest('.btn-message') && !e.target.closest('.btn-book')) {
            window.location.href = '/объявление/' + card.dataset.id;
        }
    });
});

//Select Все категории
document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select__trigger');
    const options = select.querySelector('.custom-options');
    const nativeSelect = select.querySelector('.native-select');
    const selectedText = select.querySelector('.selected-text');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        select.classList.toggle('open');
    });

    select.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            const text = option.textContent;

            // Обновляем текст
            selectedText.textContent = text;

            // Обновляем нативный селект
            nativeSelect.value = value;

            // Снимаем выделение со всех
            select.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Выделяем текущий
            option.classList.add('selected');

            // Закрываем
            select.classList.remove('open');

            // Триггерим событие изменения
            nativeSelect.dispatchEvent(new Event('change'));
        });
    });
});

// Закрытие при клике вне селекта
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(select => {
        select.classList.remove('open');
    });
});


// Функция для создания звезд
function createStars(ratingElement) {
    const rating = parseFloat(ratingElement.dataset.rating);
    const reviews = ratingElement.dataset.reviews;
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';

    // Создаем 5 звезд
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        if (rating >= i) {
            // Полная звезда
            star.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                          fill="var(--primary)"/>
                </svg>
            `;
        } else if (rating > i - 1) {
            // Половина звезды
            star.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24">
            <!-- Левая половина - желтая -->
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                  fill="var(--primary)"
                  clip-path="inset(0 50% 0 0)"/>
            <!-- Правая половина - серая -->
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                  fill="#ddd"
                  clip-path="inset(0 0 0 50%)"/>
        </svg>
    `;
        } else {
            // Пустая звезда
            star.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                          fill="#ddd"/>
                </svg>
            `;
        }

        starsContainer.appendChild(star);
    }

    // Добавляем рейтинг и количество отзывов
    starsContainer.innerHTML += `
        <span class="rating-value">${rating}</span>
        <span class="reviews-count">(${reviews})</span>
    `;

    ratingElement.appendChild(starsContainer);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.listing-rating').forEach(createStars);
});