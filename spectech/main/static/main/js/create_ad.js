document.addEventListener('DOMContentLoaded', function () {
    // Навигация по шагам
    const stRentSteps = document.querySelectorAll('.st-rent-step');
    const stRentProgressSteps = document.querySelectorAll('.st-rent-progress-step');

    // Функция для перехода к следующему шагу
    document.querySelectorAll('.st-rent-next-step').forEach(button => {
        button.addEventListener('click', function () {
            const currentStep = document.querySelector('.st-rent-step.active');
            const nextStepId = this.getAttribute('data-next');

            if (stRentValidateStep(currentStep.id)) {
                currentStep.classList.remove('active');
                document.getElementById(`st-rent-step${nextStepId}`).classList.add('active');

                // Обновление прогресс-бара
                stRentUpdateProgressBar(nextStepId);
            }
        });
    });

    // Функция для возврата к предыдущему шагу
    document.querySelectorAll('.st-rent-prev-step').forEach(button => {
        button.addEventListener('click', function () {
            const currentStep = document.querySelector('.st-rent-step.active');
            const prevStepId = this.getAttribute('data-prev');

            currentStep.classList.remove('active');
            document.getElementById(`st-rent-step${prevStepId}`).classList.add('active');

            // Обновление прогресс-бара
            stRentUpdateProgressBar(prevStepId);
        });
    });

    // Функция обновления прогресс-бара
    function stRentUpdateProgressBar(activeStepId) {
        stRentProgressSteps.forEach(step => {
            const stepNumber = step.getAttribute('data-step');
            step.classList.remove('active', 'completed');

            if (stepNumber < activeStepId) {
                step.classList.add('completed');
            } else if (stepNumber === activeStepId) {
                step.classList.add('active');
            }
        });
    }

    // Валидация шага
    function stRentValidateStep(stepId) {
        let isValid = true;

        if (stepId === 'st-rent-step1') {
            const category = document.getElementById('st-rent-category').value;
            const title = document.getElementById('st-rent-title').value;

            if (!category) {
                alert('Пожалуйста, выберите категорию техники');
                isValid = false;
            } else if (!title.trim()) {
                alert('Пожалуйста, введите название объявления');
                isValid = false;
            }
        }

        // Можно добавить валидацию для других шагов

        return isValid;
    }

    // Загрузка изображений
    const stRentUploadArea = document.getElementById('st-rent-upload-area');
    const stRentFileInput = document.getElementById('st-rent-file-input');
    const stRentPreviewContainer = document.getElementById('st-rent-preview-container');

    stRentUploadArea.addEventListener('click', () => {
        stRentFileInput.click();
    });

    stRentUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        stRentUploadArea.style.borderColor = 'var(--st-rent-primary)';
        stRentUploadArea.style.backgroundColor = 'rgba(244, 210, 33, 0.1)';
    });

    stRentUploadArea.addEventListener('dragleave', () => {
        stRentUploadArea.style.borderColor = '#ddd';
        stRentUploadArea.style.backgroundColor = 'transparent';
    });

    stRentUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        stRentUploadArea.style.borderColor = '#ddd';
        stRentUploadArea.style.backgroundColor = 'transparent';

        if (e.dataTransfer.files.length) {
            stRentHandleFiles(e.dataTransfer.files);
        }
    });

    stRentFileInput.addEventListener('change', () => {
        if (stRentFileInput.files.length) {
            stRentHandleFiles(stRentFileInput.files);
        }
    });

    function stRentHandleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.match('image.*')) continue;

            const reader = new FileReader();

            reader.onload = function (e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'st-rent-preview-item';

                const img = document.createElement('img');
                img.src = e.target.result;

                const removeBtn = document.createElement('div');
                removeBtn.className = 'st-rent-remove';
                removeBtn.innerHTML = '×';
                removeBtn.addEventListener('click', function () {
                    stRentPreviewContainer.removeChild(previewItem);
                });

                previewItem.appendChild(img);
                previewItem.appendChild(removeBtn);
                stRentPreviewContainer.appendChild(previewItem);
            }

            reader.readAsDataURL(file);
        }
    }

    // Отправка формы
    document.getElementById('st-rent-submit-form').addEventListener('click', function () {
        if (stRentValidateStep('st-rent-step4')) {
            // Здесь будет код для отправки данных формы
            alert('Объявление успешно размещено!');
            // В реальном приложении здесь будет отправка данных на сервер
        }
    });
});