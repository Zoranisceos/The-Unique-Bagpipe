document.addEventListener("DOMContentLoaded", function () {

  const bagpipe = document.getElementById("bagpipe");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  function closeModal() {
    modal.style.display = "none";
    document.removeEventListener("keydown", handleKeyDown); 
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  bagpipe.addEventListener("click", function () {
    modal.style.display = "block";
    document.addEventListener("keydown", handleKeyDown); 
  });

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

const galleryImages = document.querySelectorAll(".gallery-img");
const modalGallery = document.getElementById("modal-gallery");
const expandedImg = document.getElementById("expanded-img");
const closeGallery = document.querySelector(".close-gallery");
const prevBtn = document.querySelector(".gallery-nav.prev");
const nextBtn = document.querySelector(".gallery-nav.next");

let currentIndex = 0;
const imagesArray = Array.from(galleryImages);

galleryImages.forEach(function (img, index) {
  img.addEventListener("click", function () {
    modalGallery.style.display = "flex";
    expandedImg.src = this.src;
    expandedImg.alt = this.alt;
    currentIndex = index;
  });
});

function showImage(index) {
  if (index >= 0 && index < imagesArray.length) {
    expandedImg.src = imagesArray[index].src;
    expandedImg.alt = imagesArray[index].alt;
    currentIndex = index;
  }
}

prevBtn.addEventListener("click", function () {
  showImage((currentIndex - 1 + imagesArray.length) % imagesArray.length);
});

nextBtn.addEventListener("click", function () {
  showImage((currentIndex + 1) % imagesArray.length);
});

closeGallery.addEventListener("click", function () {
  modalGallery.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modalGallery) {
    modalGallery.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  if (modalGallery.style.display === "flex") {
    if (event.key === "ArrowLeft") {
      showImage((currentIndex - 1 + imagesArray.length) % imagesArray.length);
    }
    else if (event.key === "ArrowRight") {
      showImage((currentIndex + 1) % imagesArray.length);
    }
    else if (event.key === "Escape") {
      modalGallery.style.display = "none";
    }
  }
});
