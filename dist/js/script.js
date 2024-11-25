document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const close = document.getElementById('close');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let images = [];
  let currentIndex = 0;
  let currentGallery = '';

  // Función para abrir la galería de acuerdo al proyecto seleccionado
  function openGallery(project) {
    // Ocultar todas las galerías
    document.querySelectorAll('.gallery').forEach(gallery => {
      gallery.style.display = 'none';
    });

    // Mostrar la galería del proyecto seleccionado
    const gallery = document.querySelector(`.${project}-gallery`);
    // gallery.style.display = 'block';

    // Guardar las imágenes de la galería seleccionada
    images = Array.from(gallery.querySelectorAll('img'));
    currentIndex = 0;
    lightboxImg.src = images[currentIndex].src;

    lightbox.style.display = 'flex';
    document.addEventListener('keydown', handleKeydown);
  }

  // Función para cerrar el lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.removeEventListener('keydown', handleKeydown);

    // Ocultar la galería asociada cuando se cierra el lightbox
    document.querySelectorAll('.gallery').forEach(gallery => {
      gallery.style.display = 'none';
    });
  }

  // Función para mostrar la imagen anterior
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  // Función para mostrar la imagen siguiente
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  // Función para manejar las teclas del teclado (para la navegación)
  function handleKeydown(event) {
    if (event.key === 'ArrowLeft') {
      showPrevImage();
    } else if (event.key === 'ArrowRight') {
      showNextImage();
    }
  }

  // Event listener para las imágenes de los proyectos
  const projectImages = document.querySelectorAll('.project-img');
  projectImages.forEach(img => {
    img.addEventListener('click', () => {
      const project = img.getAttribute('data-project');
      openGallery(project);
    });
  });

  // Event listeners para las flechas de navegación en el lightbox
  close.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  prev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
  });
  next.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });
});