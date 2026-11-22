const PROJECTS = [
  {
    title: "Mosaïque & Traitement d'Image",
    context: "2026 - Master 1",
    repo: "https://github.com/Chinkies/Projet_Compression_Traitement_Image/tree/main",
    tags: ["C++"],
    description:
      "Mosaïque d'images en C++ proposant trois répartitions (grille classique, adaptive tiling basé sur la variance et super-pixels SNIC en espace LAB) associées à la base CIFAR-10 avec seconde passe et rotation des imagettes.",
    highlights: [
      "Trois modes de découpage : grille régulière, quadtree/adaptive tiling (seuil de variance & taille min) et segmentation en super-pixels via SNIC.",
      "Sélection des imagettes : filtrage via distance entre la moyenne RGB des imagettes et de la région cible sur un top-K de candidats avec rotations (0°, 90°, 180°, 270°) suivie d'une seconde passe testant des échanges entre les imagettes placées puis d'une nouvelle rotation.",
      "Évaluation quantitative & qualitative : calcul PSNR/SSIM entre l'image originale et les différentes mosaïques produites.",
      "Pistes d'évolution identifiées : affiner l'adaptive tiling, accélérer le temps de calcul, élargir les angles de rotation, explorer d'autres espaces colorimétriques, améliorer l'heuristique de seconde passe."
    ],
    images: [
      {
        src: "assets/img/Mosaique_1.png",
        caption: "Mosaïque avec grille classique."
      },
      {
        src: "assets/img/Mosaique_2.png",
        caption: "Comparaison entre grille classique et super-pixels SNIC."
      },
    ]
  },
  {
    title: "Moteur de jeu Voxel (Minecraft-like)",
    context: "2026 - Master 1",
    repo: "https://github.com/JeremNcl/HAI819I_projet_minecraft",
    tags: ["C++", "OpenGL", "GLSL", "Physique 3D", "Pathfinding A*", "ECS"],
    description:
      "Prototype d'un moteur de jeu 3D voxel développé à deux en C++ et OpenGL, sur lequel j'ai pris en charge le moteur physique, les interactions joueur et le pathfinding. Il repose sur un ECS mis en place avec mon binôme",
    highlights: [
      "Architecture ECS : mise en place et maintenance d'un système Entity-Component-System pour structurer entités et comportements.",
      "Moteur physique : gestion des collisions AABB, gravité, sauts et déplacements dans le monde voxel.",
      "Interactions joueur : raycasting 3D pour poser et casser des blocs.",
      "IA & navigation : algorithme de pathfinding A* en 3D pour guider les entités sur le terrain."
    ],
    images: [
      {
        src: "assets/img/Moteur_Voxel_1.png",
        caption: "Vue générale du monde voxel et du rendu 3D."
      },
      {
        src: "assets/img/Moteur_Voxel_2.png",
        caption: "Visualisation du Greedy Meshing."
      },
      {
        src: "assets/img/Moteur_Voxel_3.png",
        caption: "Cassage de blocs."
      },
      {
        src: "assets/img/Moteur_Voxel_4.png",
        caption: "Placement de blocs."
      }
    ]
  },
  {
    title: "Network Nightmare",
    context: "2026 - Master 2",
    repo: "https://github.com/Chinkies/network_nightmare",
    itchio: "https://chinkies.itch.io/network-nightmare",
    tags: ["Godot", "Puzzle Game"],
    description:
      "Puzzle game d'architecture réseau développé à deux sur Godot et jouable directement dans le navigateur sur itch.io : le joueur achemine des paquets vers les bons serveurs tout en gérant le routage et les contraintes réseau.",
    highlights: [
      "Concept & gameplay : puzzle game orienté logique et architecture réseau où l'on traite et redirige des paquets vers les serveurs cibles.",
      "Réalisation sur Godot : développement de l'ensemble de l'UI, des interactions avec les devices et de 3 puzzles jouables.",
      "Livrable web : export et publication sur itch.io accessibles directement dans le navigateur."
    ],
    images: [
      {
        src: "assets/img/network-nightmare_1.png",
        caption: "Arrivée sur le premier puzzle."
      },
      {
        src: "assets/img/network-nightmare_2.png",
        caption: "Puzzle 2 en wiring mode."
      },
      {
        src: "assets/img/network-nightmare_3.png",
        caption: "Simulation sur le puzzle 3."
      }
    ]
  },
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

const selectorButtons = document.querySelectorAll(".selector-item");
const viewerImage = document.getElementById("viewer-image");
const viewerCaption = document.getElementById("viewer-caption");
const viewerCounter = document.getElementById("viewer-counter");
const viewerContext = document.getElementById("viewer-context");
const viewerTitle = document.getElementById("viewer-title");
const viewerRepo = document.getElementById("viewer-repo");
const viewerItchio = document.getElementById("viewer-itchio");
const viewerTags = document.getElementById("viewer-tags");
const viewerDesc = document.getElementById("viewer-desc");
const viewerHighlights = document.getElementById("viewer-highlights");
const btnPrevImg = document.getElementById("btn-prev-img");
const btnNextImg = document.getElementById("btn-next-img");
const heroScrollHint = document.querySelector(".hero-scroll-hint");

function renderImage() {
  const project = PROJECTS[currentProjectIndex];
  const total = project.images.length;
  const media = project.images[currentImageIndex];

  viewerImage.src = media.src;
  viewerImage.alt = `${project.title} — visuel ${currentImageIndex + 1}`;
  viewerCaption.textContent = media.caption;
  viewerCounter.textContent = `${currentImageIndex + 1} / ${total}`;

  const showNav = total > 1;
  btnPrevImg.style.display = showNav ? "flex" : "none";
  btnNextImg.style.display = showNav ? "flex" : "none";
}

function renderProject(index) {
  currentProjectIndex = index;
  currentImageIndex = 0;
  const project = PROJECTS[currentProjectIndex];

  selectorButtons.forEach((btn, idx) => {
    const active = idx === currentProjectIndex;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });

  viewerContext.textContent = project.context;
  viewerTitle.textContent = project.title;
  viewerRepo.href = project.repo;
  if (viewerItchio) {
    if (project.itchio) {
      viewerItchio.href = project.itchio;
      viewerItchio.style.display = "";
    } else {
      viewerItchio.style.display = "none";
    }
  }

  viewerDesc.textContent = project.description;

  viewerTags.innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  viewerHighlights.innerHTML = project.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  renderImage();
}

function updateScrollHintOpacity() {
  if (!heroScrollHint) return;
  const maxFadeDistance = 220; // Distance en pixels pour passer de 1 à 0
  const progress = Math.min(Math.max(window.scrollY / maxFadeDistance, 0), 1);
  const opacity = 1 - progress;

  heroScrollHint.style.opacity = opacity.toFixed(3);
  heroScrollHint.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
}

window.addEventListener("scroll", updateScrollHintOpacity, { passive: true });
updateScrollHintOpacity();

selectorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = Number(btn.dataset.project);
    renderProject(index);
  });
});

btnPrevImg.addEventListener("click", () => {
  const total = PROJECTS[currentProjectIndex].images.length;
  currentImageIndex = (currentImageIndex - 1 + total) % total;
  renderImage();
});

btnNextImg.addEventListener("click", () => {
  const total = PROJECTS[currentProjectIndex].images.length;
  currentImageIndex = (currentImageIndex + 1) % total;
  renderImage();
});

renderProject(0);