//Клик по объявления
document.querySelectorAll('.listing-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Проверяем, что кликнули не по сердечку
        if (!e.target.closest('.favorite-btn-small') && !e.target.closest('.book-btn')) {
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