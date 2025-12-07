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
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="m10 14.99-4.92 3.26a.55.55 0 0 1-.83-.6l1.58-5.7L1.2 8.29a.55.55 0 0 1 .31-.98l5.9-.25 2.07-5.53a.55.55 0 0 1 1.02 0l2.07 5.53 5.9.25a.55.55 0 0 1 .31.98l-4.62 3.68 1.58 5.69a.55.55 0 0 1-.83.6z" 
                          fill="var(--primary)"/>
                </svg>
            `;
        } else if (rating > i - 1) {
            // Половина звезды
            star.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20">
            <!-- Левая половина - желтая -->
            <path d="m10 14.99-4.92 3.26a.55.55 0 0 1-.83-.6l1.58-5.7L1.2 8.29a.55.55 0 0 1 .31-.98l5.9-.25 2.07-5.53a.55.55 0 0 1 1.02 0l2.07 5.53 5.9.25a.55.55 0 0 1 .31.98l-4.62 3.68 1.58 5.69a.55.55 0 0 1-.83.6z" 
                  fill="var(--primary)"
                  clip-path="inset(0 50% 0 0)"/>
            <!-- Правая половина - серая -->
            <path d="m10 14.99-4.92 3.26a.55.55 0 0 1-.83-.6l1.58-5.7L1.2 8.29a.55.55 0 0 1 .31-.98l5.9-.25 2.07-5.53a.55.55 0 0 1 1.02 0l2.07 5.53 5.9.25a.55.55 0 0 1 .31.98l-4.62 3.68 1.58 5.69a.55.55 0 0 1-.83.6z" 
                  fill="#ddd"
                  clip-path="inset(0 0 0 50%)"/>
        </svg>
    `;
        } else {
            // Пустая звезда
            star.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="m10 14.99-4.92 3.26a.55.55 0 0 1-.83-.6l1.58-5.7L1.2 8.29a.55.55 0 0 1 .31-.98l5.9-.25 2.07-5.53a.55.55 0 0 1 1.02 0l2.07 5.53 5.9.25a.55.55 0 0 1 .31.98l-4.62 3.68 1.58 5.69a.55.55 0 0 1-.83.6z" 
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
    document.querySelectorAll('.stars-rating').forEach(createStars);
});



// Заливка Для маленьких сердечек
document.querySelectorAll('.favorite-btn-small').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('active');

        // Анимация
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
});


// Модальное окно 
document.querySelectorAll('.switch-form').forEach(button => {
    button.addEventListener('click', function() {
        const formToShow = this.dataset.form;
        document.querySelector('.login-form').classList.toggle('active', formToShow === 'login');
        document.querySelector('.register-form').classList.toggle('active', formToShow === 'register');
    });
});