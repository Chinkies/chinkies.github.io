const PROJECTS = [
  {
    title: "Mosaïque & Traitement d'Image",
    context: "Projet_Compression_Traitement_Image · Imagerie",
    repo: "https://github.com/Chinkies",
    tags: ["Traitement d'image", "Mosaïque", "Compression / Analyse"],
    description:
      "Projet de traitement d'image axé sur la composition de mosaïques : analyse des zones d'une image cible et sélection d'images sources pour reconstruire l'ensemble tout en gardant la lisibilité.",
    highlights: [
      "Découpage et comparaison colorimétrique / structurelle entre tuiles et images sources.",
      "Génération de la mosaïque finale et ajustement des rendus (à compléter avec ta stack exacte)."
    ],
    images: [
      {
        src: "https://placehold.co/1400x900/222733/FAFAFA?text=Mosaique+Image+-+Visuel+1",
        caption: "Placeholder : aperçu d'une mosaïque générée depuis une image source."
      },
      {
        src: "https://placehold.co/1400x900/2E3545/FAFAFA?text=Mosaique+Image+-+Visuel+2",
        caption: "Placeholder : détail ou comparaison de traitement d'image."
      }
    ]
  },
  {
    title: "Projet Minecraft (HAI819I)",
    context: "Master · Rendu 3D & Voxels",
    repo: "https://github.com/JeremNcl/HAI819I_projet_minecraft",
    tags: ["Rendu 3D", "Voxels", "Temps réel"],
    description:
      "Projet de cours HAI819I autour d'un environnement voxel inspiré de Minecraft : génération et affichage d'un monde découpé en blocs, navigation en 3D et rendu interactif.",
    highlights: [
      "Organisation spatiale des chunks / blocs et rendu de scènes voxelisées.",
      "Interaction caméra et exploration en temps réel (à compléter avec tes modules précis)."
    ],
    images: [
      {
        src: "https://placehold.co/1400x900/2E3545/FAFAFA?text=Projet+Minecraft+-+Visuel+1",
        caption: "Placeholder : vue d'ensemble du monde voxel en 3D."
      },
      {
        src: "https://placehold.co/1400x900/222733/FAFAFA?text=Projet+Minecraft+-+Visuel+2",
        caption: "Placeholder : détail des blocs, éclairage ou interface."
      }
    ]
  },
  {
    title: "Simulation d'Érosion",
    context: "Master · Simulation & Terrain 3D",
    repo: "https://github.com/CesarCharbey/ErosionSimulation",
    tags: ["Simulation", "Terrain 3D", "Physique / Algorithmes"],
    description:
      "Simulation d'érosion appliquée au relief afin de sculpter et faire évoluer un terrain au fil d'itérations inspirées des processus naturels (ruissellement, transport et dépôt de matière).",
    highlights: [
      "Modélisation itérative de l'évolution du relief et visualisation du terrain.",
      "Observation de l'impact des paramètres de simulation sur la morphologie finale."
    ],
    images: [
      {
        src: "https://placehold.co/1400x900/222733/FAFAFA?text=Simulation+Erosion+-+Visuel+1",
        caption: "Placeholder : terrain sculpté par la simulation d'érosion."
      },
      {
        src: "https://placehold.co/1400x900/2E3545/FAFAFA?text=Simulation+Erosion+-+Visuel+2",
        caption: "Placeholder : évolution entre différentes étapes de simulation."
      }
    ]
  },
  {
    title: "Network Nightmare",
    context: "Projet · Réseau & Système",
    repo: "https://github.com/Chinkies",
    tags: ["Réseau", "Architecture", "Développement"],
    description:
      "Projet axé sur les échanges réseau et la gestion d'interactions/états entre composants, conçu pour expérimenter les contraintes et comportements d'une application connectée.",
    highlights: [
      "Structuration de la communication et gestion des états côté client/serveur ou nœuds.",
      "Mise au point et tests de scénarios (à compléter avec ton langage et cadre exact)."
    ],
    images: [
      {
        src: "https://placehold.co/1400x900/2E3545/FAFAFA?text=Network+Nightmare+-+Visuel+1",
        caption: "Placeholder : capture ou schéma d'exécution de Network Nightmare."
      },
      {
        src: "https://placehold.co/1400x900/222733/FAFAFA?text=Network+Nightmare+-+Visuel+2",
        caption: "Placeholder : vue secondaire ou état du système."
      }
    ]
  }
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
const viewerTags = document.getElementById("viewer-tags");
const viewerDesc = document.getElementById("viewer-desc");
const viewerHighlights = document.getElementById("viewer-highlights");
const btnPrevImg = document.getElementById("btn-prev-img");
const btnNextImg = document.getElementById("btn-next-img");

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
  viewerDesc.textContent = project.description;

  viewerTags.innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  viewerHighlights.innerHTML = project.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  renderImage();
}

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