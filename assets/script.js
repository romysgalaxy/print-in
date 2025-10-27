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
    console.error("Carrousel : un élément requis est introuvable dans le DOM.");
    return;
  }

  let currentIndex = 0;

  // --- Génération des bullets ---
  const dots = slides.map((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " dot_selected" : "");
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", `Aller à la diapositive ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToSlide(i);
      }
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  // --- Affiche la slide courante + met à jour le bullet actif ---
  function renderSlide(index) {
    const { image, tagLine } = slides[index];
    bannerImg.src = `./assets/images/slideshow/${image}`; // construit le bon chemin
    bannerImg.alt = tagLine.replace(/<[^>]*>/g, "");      // alt propre (sans balises)
    bannerText.innerHTML = tagLine;                       // maj du texte
    dots.forEach((dot, i) => dot.classList.toggle("dot_selected", i === index));
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length; // wrap infini (évite les erreurs aux extrémités)
    renderSlide(currentIndex);
  }

  function changeSlide(direction) {
    goToSlide(currentIndex + direction);
  }

  // --- Navigation flèches ---
  leftBtn.addEventListener("click",  () => changeSlide(-1));
  rightBtn.addEventListener("click", () => changeSlide(1));

  // Affiche la première slide
  renderSlide(currentIndex);
});
