// Ждем полной загрузки DOM-дерева перед выполнением скрипта
document.addEventListener("DOMContentLoaded", function () {
  // === ОБРАБОТКА МОДАЛЬНОГО ОКНА ВИДЕО ===

  // Получаем элементы
  const bagpipe = document.getElementById("bagpipe");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  // Функция для закрытия модального окна
  function closeModal() {
    modal.style.display = "none";
    document.removeEventListener("keydown", handleKeyDown); // Удаляем обработчик
  }

  // Обработчик нажатия клавиш
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  // Открытие модального окна
  bagpipe.addEventListener("click", function () {
    modal.style.display = "block";
    document.addEventListener("keydown", handleKeyDown); // Добавляем обработчик
  });

  // Закрытие по кнопке
  closeBtn.addEventListener("click", closeModal);

  // Закрытие по клику вне окна
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// === ОБРАБОТКА ГАЛЕРЕИ ИЗОБРАЖЕНИЙ ===

// Получаем все изображения галереи
const galleryImages = document.querySelectorAll(".gallery-img");
// Модальное окно галереи
const modalGallery = document.getElementById("modal-gallery");
// Элемент для увеличенного изображения
const expandedImg = document.getElementById("expanded-img");
// Кнопка закрытия галереи
const closeGallery = document.querySelector(".close-gallery");
// Кнопка "назад" в галерее
const prevBtn = document.querySelector(".gallery-nav.prev");
// Кнопка "вперед" в галерее
const nextBtn = document.querySelector(".gallery-nav.next");

// Текущий индекс просматриваемого изображения
let currentIndex = 0;
// Преобразуем коллекцию изображений в массив
const imagesArray = Array.from(galleryImages);

// Добавляем обработчики клика для каждого изображения галереи
galleryImages.forEach(function (img, index) {
  img.addEventListener("click", function () {
    // Показываем модальное окно галереи
    modalGallery.style.display = "flex";
    // Устанавливаем источник увеличенного изображения
    expandedImg.src = this.src;
    // Копируем alt-текст
    expandedImg.alt = this.alt;
    // Запоминаем индекс текущего изображения
    currentIndex = index;
  });
});

// Функция для отображения конкретного изображения в галерее
function showImage(index) {
  // Проверяем, что индекс в допустимых пределах
  if (index >= 0 && index < imagesArray.length) {
    // Устанавливаем новое изображение
    expandedImg.src = imagesArray[index].src;
    // Обновляем alt-текст
    expandedImg.alt = imagesArray[index].alt;
    // Сохраняем текущий индекс
    currentIndex = index;
  }
}

// Обработчик кнопки "назад" в галерее
prevBtn.addEventListener("click", function () {
  // Вычисляем индекс предыдущего изображения с зацикливанием
  showImage((currentIndex - 1 + imagesArray.length) % imagesArray.length);
});

// Обработчик кнопки "вперед" в галерее
nextBtn.addEventListener("click", function () {
  // Вычисляем индекс следующего изображения с зацикливанием
  showImage((currentIndex + 1) % imagesArray.length);
});

// Обработчик закрытия галереи по кнопке
closeGallery.addEventListener("click", function () {
  // Скрываем модальное окно галереи
  modalGallery.style.display = "none";
});

// Обработчик клика по затемненной области вокруг галереи
window.addEventListener("click", function (event) {
  // Если кликнули на фон модального окна
  if (event.target === modalGallery) {
    // Закрываем галерею
    modalGallery.style.display = "none";
  }
});

// === УПРАВЛЕНИЕ ГАЛЕРЕЕЙ С КЛАВИАТУРЫ ===

// Обработчик нажатия клавиш
document.addEventListener("keydown", function (event) {
  // Проверяем, открыта ли галерея
  if (modalGallery.style.display === "flex") {
    // Обработка стрелки влево
    if (event.key === "ArrowLeft") {
      showImage((currentIndex - 1 + imagesArray.length) % imagesArray.length);
    }
    // Обработка стрелки вправо
    else if (event.key === "ArrowRight") {
      showImage((currentIndex + 1) % imagesArray.length);
    }
    // Обработка клавиши Escape
    else if (event.key === "Escape") {
      modalGallery.style.display = "none";
    }
  }
});
