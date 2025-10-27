const slides = [
  { image: "slide1.jpg", tagLine: "Impressions tous formats <span>en boutique et en ligne</span>" },
  { image: "slide2.jpg", tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>" },
  { image: "slide3.jpg", tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>" },
  { image: "slide4.png", tagLine: "Autocollants <span>avec découpe laser sur mesure</span>" }
];

document.addEventListener("DOMContentLoaded", () => {
  const leftBtn       = document.querySelector("#banner .arrow_left");
  const rightBtn      = document.querySelector("#banner .arrow_right");
  const bannerImg     = document.querySelector("#banner .banner-img");
  const bannerText    = document.querySelector("#banner p");
  const dotsContainer = document.querySelector("#banner .dots");

  if (!leftBtn || !rightBtn || !bannerImg || !bannerText || !dotsContainer) {
    console.error("Carrousel : élément requis introuvable.");
    return;
  }

  let currentIndex = 0;

  // --- Génère les bullets ---
  const dots = slides.map((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " dot_selected" : "");
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", `Aller à la diapositive ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        goToSlide(i);
      }
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function setActiveDot(index) {
    dots.forEach((dot, i) => dot.classList.toggle("dot_selected", i === index));
  }

  function renderSlide(index) {
    const { image, tagLine } = slides[index];
    bannerImg.src = `./assets/images/slideshow/${image}`; // bon chemin construit
    bannerImg.alt = tagLine.replace(/<[^>]*>/g, "");      // alt sans balises
    bannerText.innerHTML = tagLine;                       // met à jour le texte
    setActiveDot(index);                                  // met à jour le bullet
  }

  function goToSlide(index) {
    currentIndex = index;
    renderSlide(currentIndex);
  }

  // --- Conditions pour boucler indéfiniment ---
  function changeSlide(direction) {
    if (direction === 1) {
      // à droite
      if (currentIndex === slides.length - 1) {
        currentIndex = 0; // dernière -> première
      } else {
        currentIndex += 1;
      }
    } else if (direction === -1) {
      // à gauche
      if (currentIndex === 0) {
        currentIndex = slides.length - 1; // première -> dernière
      } else {
        currentIndex -= 1;
      }
    }
    renderSlide(currentIndex);
  }

  // --- Écouteurs flèches (on retire les alertes) ---
  leftBtn.addEventListener("click",  () => changeSlide(-1));
  rightBtn.addEventListener("click", () => changeSlide(1));

  // Affiche la première slide au chargement
  renderSlide(currentIndex);
});
