//Клик по объявления
document.querySelectorAll('.listing-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Проверяем, что кликнули не по сердечку
        if (!e.target.closest('.favorite-btn-small') && !e.target.closest('.book-btn')) {
            window.location.href = '/объявление/' + card.dataset.id;
        }
    });
});