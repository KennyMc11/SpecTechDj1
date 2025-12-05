document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const modal = document.getElementById('imageModal');
    const modalImage = document.querySelector('.modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const images = Array.from(thumbnails).map(thumb => thumb.src);
    
    // Добавляем основное фото в массив первым
    images.unshift(mainImage.src);
    
    // Клик по миниатюре
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Убираем активный класс у всех миниатюр
            thumbnails.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей
            this.classList.add('active');
            // Меняем основное фото
            mainImage.src = this.src;
            currentImageIndex = index + 1; // +1 потому что первое фото - основное
        });
    });
    
    // Открытие основного фото
    mainImage.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImage.src = this.src;
        currentImageIndex = 0;
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Клик вне изображения для закрытия
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Навигация по фото
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex];
        
        // Обновляем активную миниатюру
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex - 1);
        });
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex];
        
        // Обновляем активную миниатюру
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex - 1);
        });
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
        if (e.key === 'ArrowLeft' && modal.style.display === 'flex') {
            prevBtn.click();
        }
        if (e.key === 'ArrowRight' && modal.style.display === 'flex') {
            nextBtn.click();
        }
    });
});