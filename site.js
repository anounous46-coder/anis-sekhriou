(function () {
  "use strict";

  const C = window.CONTENU;
  const $ = (id) => document.getElementById(id);
  const racine = document.documentElement;
  const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const aSouris = window.matchMedia("(pointer: fine)").matches;
  const grandEcran = window.matchMedia("(min-width: 1000px) and (pointer: fine)");
  const borne = (v, min, max) => Math.min(max, Math.max(min, v));

  function el(tag, attrs, ...enfants) {
    const noeud = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([cle, valeur]) => {
      if (cle === "classe") noeud.className = valeur;
      else noeud.setAttribute(cle, valeur);
    });
    enfants.forEach((enfant) => { if (enfant) noeud.append(enfant); });
    return noeud;
  }

  function idYoutube(lien) {
    if (!lien) return "";
    const texte = lien.trim();
    const trouve = texte.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
    if (trouve) return trouve[1];
    return /^[\w-]{11}$/.test(texte) ? texte : "";
  }

  /* Apparitions */
  const voir = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;
      entree.target.classList.add("vu");
      voir.unobserve(entree.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  // Découpe un titre en mots qui montent l'un après l'autre.
  function decouper(noeud) {
    let i = 0;
    const traiter = (parent) => {
      [...parent.childNodes].forEach((enfant) => {
        if (enfant.nodeType === 1 && enfant.id !== "compte") traiter(enfant);
        if (enfant.nodeType !== 3) return;
        const morceaux = document.createDocumentFragment();
        enfant.textContent.split(/(\s+)/).forEach((mot) => {
          if (!mot) return;
          if (/^\s+$/.test(mot)) { morceaux.append(" "); return; }
          const texte = el("span", null, mot);
          texte.style.setProperty("--i", i++);
          morceaux.append(el("span", { classe: "mot" }, texte));
        });
        parent.replaceChild(morceaux, enfant);
      });
    };
    traiter(noeud);
    noeud.classList.add("a-devoiler");
    voir.observe(noeud);
  }

  function monter(noeud, i) {
    noeud.classList.add("monte");
    noeud.style.setProperty("--i", i || 0);
    voir.observe(noeud);
  }

  /* Vidéos : elles tournent seulement quand elles sont visibles.
     L'iPhone peut refuser la lecture automatique (mode économie d'énergie, navigateur d'Instagram) :
     l'image fixe reste alors affichée et la vidéo démarre au premier toucher. */
  let lectureBloquee = false;

  function lancer(video) {
    const promesse = video.play();
    if (promesse) promesse.catch((erreur) => { if (erreur.name === "NotAllowedError") lectureBloquee = true; });
  }

  const lecture = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (entree.isIntersecting) {
        lancer(entree.target);
      } else {
        entree.target.pause();
      }
    });
  }, { threshold: 0.1 });

  function creerVideo(source, surveiller) {
    const video = el("video", { loop: "", playsinline: "", "webkit-playsinline": "", muted: "", preload: "none", "aria-hidden": "true" });
    video.muted = true;
    video.src = source;
    video.addEventListener("playing", () => video.classList.add("en-lecture"));
    if (surveiller !== false && !mouvementReduit) lecture.observe(video);
    return video;
  }

  // apercus/nom.mp4 a son image fixe dans images/nom.jpg
  const imageDe = (apercu) => apercu.replace(/^apercus\//, "images/").replace(/\.mp4$/, ".jpg");

  function creerApercu(source, surveiller) {
    const image = el("img", { src: imageDe(source), alt: "", decoding: "async", loading: surveiller === false ? "eager" : "lazy" });
    image.addEventListener("error", () => image.remove());
    return el("span", { classe: "apercu" }, image, creerVideo(source, surveiller));
  }

  /* Lecteur plein écran */
  const lecteur = $("lecteur");
  const cadre = $("lecteur-cadre");

  function ouvrirLecteur(video, titre, info) {
    const id = idYoutube(video.youtube);
    lecteur.dataset.format = video.format;
    $("lecteur-titre").textContent = titre;
    $("lecteur-info").textContent = info || "";
    if (id) {
      cadre.replaceChildren(el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1",
        title: titre,
        allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
        allowfullscreen: "",
        referrerpolicy: "strict-origin-when-cross-origin",
      }));
    } else {
      const plein = el("video", { src: video.video || video.apercu, controls: "", autoplay: "", playsinline: "", "webkit-playsinline": "" });
      if (video.apercu) plein.poster = imageDe(video.apercu);
      cadre.replaceChildren(plein);
    }
    if (!lecteur.open) lecteur.showModal();
  }

  // Dans le lecteur, on passe d'un projet à l'autre sans le fermer.
  let listeLecteur = [];
  let rangLecteur = 0;

  function ouvrirProjet(liste, rang) {
    listeLecteur = liste;
    rangLecteur = (rang + liste.length) % liste.length;
    const projet = liste[rangLecteur];
    lecteur.classList.add("avec-suite");
    $("lecteur-rang").textContent = (rangLecteur + 1) + " / " + liste.length;
    ouvrirLecteur(projet, projet.titre, [projet.client, projet.role].filter(Boolean).join(" · "));
  }

  $("lecteur-avant").addEventListener("click", () => ouvrirProjet(listeLecteur, rangLecteur - 1));
  $("lecteur-apres").addEventListener("click", () => ouvrirProjet(listeLecteur, rangLecteur + 1));
  lecteur.addEventListener("keydown", (e) => {
    if (!lecteur.classList.contains("avec-suite") || e.target.tagName === "VIDEO") return;
    if (e.key === "ArrowLeft") ouvrirProjet(listeLecteur, rangLecteur - 1);
    if (e.key === "ArrowRight") ouvrirProjet(listeLecteur, rangLecteur + 1);
  });

  $("lecteur-fermer").addEventListener("click", () => lecteur.close());
  lecteur.addEventListener("click", (e) => { if (e.target === lecteur) lecteur.close(); });
  lecteur.addEventListener("close", () => { cadre.replaceChildren(); lecteur.classList.remove("avec-suite"); });

  /* Haut de page */
  document.title = C.nom + " · " + C.metier;
  $("tete-nom").textContent = C.nom;
  $("nom-texte").textContent = C.nom;
  $("nom").classList.add("a-devoiler");
  $("metier").textContent = C.metier;
  $("accroche").textContent = C.accroche;
  $("intro-nom").textContent = C.nom;
  $("pied-nom").textContent = "© " + new Date().getFullYear() + " " + C.nom;

  const heros = $("reel");
  // Mur de vidéos : 5 sur grand écran, 3 sur téléphone pour rester léger.
  const sourcesMur = C.projets.filter((p) => p.apercu).map((p) => p.apercu);
  const nombreMur = window.matchMedia("(max-width: 760px)").matches ? 3 : 5;
  const cartesMur = sourcesMur.slice(0, nombreMur).map((source, i) => {
    const apercu = creerApercu(source, false);
    apercu.querySelector("video").preload = "auto";
    const carte = el("div", { classe: "mur-carte" }, apercu);
    carte.style.setProperty("--i", i);
    carte.dataset.decalage = i % 2 ? 7 : -5;
    carte.dataset.vitesse = 10 + ((i * 7) % 3) * 9;
    return carte;
  });
  const videosHeros = cartesMur.map((carte) => carte.querySelector("video"));
  $("heros-video").classList.add("mur");
  $("heros-video").append(...cartesMur);

  if (C.showreel.video || idYoutube(C.showreel.youtube)) {
    $("lire-reel-texte").textContent = "Regarder le showreel";
    $("lire-reel").addEventListener("click", () => ouvrirLecteur(
      { youtube: C.showreel.youtube, video: C.showreel.video, format: "horizontal" },
      "Showreel", C.nom));
  } else {
    $("lire-reel-texte").textContent = "Voir les projets";
    $("lire-reel").addEventListener("click", () => allerA($("projets").offsetTop));
  }

  // Le nom prend toute la largeur de l'écran, quelle que soit sa longueur.
  function ajusterNom() {
    const h1 = $("nom");
    const texte = $("nom-texte");
    h1.style.fontSize = "100px";
    const largeur = texte.getBoundingClientRect().width;
    const dispo = h1.getBoundingClientRect().width;
    const max = window.innerHeight * 0.5;
    h1.style.fontSize = Math.min(max, (100 * dispo) / largeur * 0.985) + "px";
  }

  /* Présentation : les mots s'allument au défilement */
  const manifeste = $("manifeste");
  C.manifeste.split(/\s+/).forEach((mot, i) => {
    if (i) manifeste.append(" ");
    manifeste.append(el("span", null, mot));
  });
  const motsManifeste = [...manifeste.children];

  /* Projets */
  const piste = $("piste");
  const galerie = $("projets");
  let cartes = [];

  function creerCarte(projet, i, liste) {
    const id = idYoutube(projet.youtube);
    const lisible = id || projet.video || projet.apercu;
    const image = el("span", { classe: "carte-image" });
    if (projet.apercu) image.append(creerApercu(projet.apercu));
    else if (id) image.append(el("img", { src: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg", alt: "", loading: "lazy" }));

    const carte = el(lisible ? "button" : "div", { classe: "carte", "data-format": projet.format }, image,
      el("span", { classe: "carte-texte" },
        el("span", { classe: "carte-numero" }, String(i + 1).padStart(2, "0")),
        el("span", { classe: "carte-titre" }, projet.titre),
        el("span", { classe: "carte-client" }, projet.client)));
    carte.style.setProperty("--i", Math.min(i, 8));
    if (lisible) {
      carte.type = "button";
      carte.dataset.curseur = "Lire";
      carte.setAttribute("aria-label", "Lire " + projet.titre + ", " + projet.client);
      carte.addEventListener("click", () => ouvrirProjet(liste, i));
    }
    return carte;
  }

  let enPiste = false;

  function mesurerGalerie() {
    enPiste = grandEcran.matches && !mouvementReduit;
    racine.classList.toggle("en-piste", enPiste);
    if (!enPiste) {
      galerie.style.height = "";
      piste.style.transform = "";
      cartes.forEach((c) => c.style.removeProperty("--largeur"));
      return;
    }
    const hauteurImage = $("galerie-fenetre").clientHeight - 62;
    cartes.forEach((c) => {
      const ratio = c.dataset.format === "vertical" ? 9 / 16 : 16 / 9;
      c.style.setProperty("--largeur", Math.round(hauteurImage * ratio) + "px");
    });
    const parcours = Math.max(0, piste.offsetWidth - window.innerWidth);
    galerie.style.height = parcours + window.innerHeight + "px";
  }

  const LOT = 12;

  function afficherProjets(filtre, tout) {
    piste.querySelectorAll("video").forEach((video) => lecture.unobserve(video));
    const projets = C.projets.filter((p) => filtre === "tous" || p.style === filtre);
    const visibles = tout || projets.length <= LOT + 2 ? projets : projets.slice(0, LOT);
    cartes = visibles.map((projet, i) => creerCarte(projet, i, projets));
    if (visibles.length < projets.length) {
      const plus = el("button", { classe: "carte carte-plus", type: "button", "data-format": "vertical", "data-curseur": "Voir" },
        el("span", { classe: "carte-image" },
          el("span", { classe: "carte-plus-nombre" }, "+" + (projets.length - visibles.length)),
          el("span", { classe: "carte-plus-texte" }, "Voir tous les projets")),
        el("span", { classe: "carte-texte" }, el("span", { classe: "carte-titre" }, "\u00a0"), el("span", { classe: "carte-client" }, "\u00a0")));
      plus.style.setProperty("--i", 8);
      plus.addEventListener("click", () => {
        afficherProjets(filtre, true);
        cartes[LOT].focus({ preventScroll: true });
      });
      cartes.push(plus);
    }
    piste.replaceChildren(...cartes);
    $("compte").textContent = "(" + projets.length + ")";
    mesurerGalerie();
    aActualiser = true;
  }

  function choisirFiltre(id) {
    document.querySelectorAll(".filtre").forEach((bouton) => {
      bouton.setAttribute("aria-pressed", String(bouton.dataset.filtre === id));
    });
    const dansGalerie = enPiste && window.scrollY > galerie.offsetTop;
    afficherProjets(id);
    if (dansGalerie) allerA(galerie.offsetTop, true);
  }

  $("filtres").append(...[{ id: "tous", nom: "Tous" }].concat(C.styles).map((f) => {
    const bouton = el("button", { classe: "filtre", type: "button", "data-filtre": f.id, "aria-pressed": String(f.id === "tous") }, f.nom,
      el("span", { classe: "filtre-nombre" }, String(C.projets.filter((p) => f.id === "tous" || p.style === f.id).length)));
    bouton.addEventListener("click", () => choisirFiltre(f.id));
    return bouton;
  }));

  /* Bande de texte */
  const bande = $("bande");
  const motsBande = C.services.map((s) => s.nom);
  for (let tour = 0; tour < 4; tour++) {
    motsBande.forEach((mot) => bande.append(el("span", null, mot)));
    if (motsBande.length % 2) bande.append(el("span", null, C.metier));
  }

  /* Comparateur */
  const A = C.avantApres;
  const comparateur = $("comparateur");
  if (A && A.rush && A.montage) {
    $("comparaison-legende").textContent = A.legende || "";
    const rush = creerVideo(A.rush);
    const montage = creerVideo(A.montage);
    $("couche-rush").prepend(rush);
    $("couche-montage").prepend(montage);
    // Les deux vidéos restent calées sur la même image.
    montage.addEventListener("timeupdate", () => {
      if (Math.abs(rush.currentTime - montage.currentTime) > 0.12) rush.currentTime = montage.currentTime;
    });
    const curseurComparateur = $("comparateur-curseur");
    const placer = (valeur) => comparateur.style.setProperty("--pos", valeur + "%");
    curseurComparateur.addEventListener("input", () => placer(curseurComparateur.value));
    // Au premier passage, la séparation glisse seule pour montrer l'effet.
    if (!mouvementReduit) {
      placer(82);
      curseurComparateur.value = 82;
      new IntersectionObserver((entrees, obs) => {
        if (!entrees[0].isIntersecting) return;
        obs.disconnect();
        const depart = performance.now();
        const glisser = (t) => {
          const p = borne((t - depart) / 1500, 0, 1);
          const valeur = 82 - 32 * (1 - Math.pow(1 - p, 4));
          placer(valeur);
          curseurComparateur.value = valeur;
          if (p < 1) requestAnimationFrame(glisser);
        };
        requestAnimationFrame(glisser);
      }, { threshold: 0.4 }).observe(comparateur);
    }
  } else {
    $("avant-apres").remove();
  }

  /* Services */
  $("mosaique").append(...C.services.map((service, i) => {
    const tuile = el("button", { classe: "tuile", type: "button", "data-curseur": "Voir" },
      service.apercu ? creerApercu(service.apercu) : null,
      el("span", { classe: "tuile-fleche", "aria-hidden": "true" }, "→"),
      el("span", { classe: "tuile-nom" }, service.nom),
      el("span", { classe: "tuile-texte" }, service.tarif ? service.description + " " + service.tarif : service.description));
    tuile.addEventListener("click", () => {
      choisirFiltre(service.style || "tous");
      allerA(galerie.offsetTop);
    });
    tuile.addEventListener("pointermove", (e) => {
      const r = tuile.getBoundingClientRect();
      tuile.style.setProperty("--mx", e.clientX - r.left + "px");
      tuile.style.setProperty("--my", e.clientY - r.top + "px");
    });
    monter(tuile, i);
    return tuile;
  }));

  /* Méthode */
  $("etapes").append(...C.methode.map((etape, i) => {
    const li = el("li", { classe: "etape" }, el("h3", null, etape.titre), el("p", null, etape.texte));
    monter(li, i);
    return li;
  }));

  /* Résultats : un bloc vide disparaît, la section aussi si tout est vide */
  const R = C.resultats;
  $("chiffres").append(...R.chiffres.map((c) => el("div", { classe: "chiffre" }, el("strong", null, c.valeur), el("span", null, c.label))));
  $("liste-avis").append(...R.avis.map((a) => el("figure", { classe: "avis" }, el("blockquote", null, a.texte), el("figcaption", null, a.auteur))));
  if (R.clients.length) {
    R.clients.concat(R.clients).forEach((nom) => $("clients").append(el("span", null, nom)));
  }
  if (!R.chiffres.length && !R.avis.length && !R.clients.length) $("resultats").remove();

  /* Contact */
  const liens = [];
  const lienWhatsapp = "https://wa.me/" + C.contact.whatsapp + "?text=" + encodeURIComponent("Bonjour, j'ai vu votre portfolio et je voudrais parler d'une vidéo.");
  if (C.contact.email) liens.push(el("a", { classe: "contact-lien", href: "mailto:" + C.contact.email, "data-aimant": "" }, C.contact.email));
  if (C.contact.whatsapp) liens.push(el("a", { classe: "contact-lien", href: lienWhatsapp, rel: "noopener", "data-aimant": "" }, "WhatsApp"));
  if (C.contact.whatsapp) {
    $("wa-flottant").href = lienWhatsapp;
    new IntersectionObserver((entrees) => {
      document.body.classList.toggle("contact-visible", entrees[0].isIntersecting);
    }).observe($("contact-liens"));
  } else {
    $("wa-flottant").remove();
  }
  if (C.contact.instagram) liens.push(el("a", { classe: "contact-lien", href: "https://www.instagram.com/" + C.contact.instagram + "/", rel: "noopener", "data-aimant": "" }, "Instagram"));
  $("contact-liens").append(...liens);

  document.querySelectorAll(".titre, .contact-titre").forEach(decouper);
  decouper($("metier"));
  monter($("accroche"), 2);

  /* Défilement fluide */
  const lisse = aSouris && !mouvementReduit;
  racine.classList.toggle("natif", !lisse);
  let cible = window.scrollY;
  let actuel = window.scrollY;
  let anime = false;

  const scrollMax = () => racine.scrollHeight - window.innerHeight;

  function allerA(y, instantane) {
    const position = borne(y, 0, scrollMax());
    if (!lisse || instantane) {
      anime = false;
      cible = actuel = position;
      window.scrollTo({ top: position, behavior: instantane ? "instant" : "smooth" });
      return;
    }
    if (!anime) actuel = window.scrollY;
    cible = position;
    anime = true;
  }

  if (lisse) {
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || lecteur.open || document.body.classList.contains("fige")) return;
      e.preventDefault();
      const unite = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      if (!anime) actuel = cible = window.scrollY;
      cible = borne(cible + e.deltaY * unite, 0, scrollMax());
      anime = true;
    }, { passive: false });
    window.addEventListener("keydown", () => { anime = false; });
    window.addEventListener("pointerdown", () => { anime = false; });
    window.addEventListener("scroll", () => { if (!anime) cible = actuel = window.scrollY; }, { passive: true });
  }

  document.addEventListener("click", (e) => {
    const lien = e.target.closest('a[href^="#"]');
    if (!lien) return;
    const section = document.querySelector(lien.getAttribute("href"));
    if (!section) return;
    e.preventDefault();
    allerA(section === heros ? 0 : section.getBoundingClientRect().top + window.scrollY);
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  });

  /* Curseur à étiquette et boutons aimantés */
  const curseur = $("curseur");
  let sourisX = 0, sourisY = 0, curseurX = 0, curseurY = 0;

  if (aSouris) {
    racine.classList.add("a-souris");
    window.addEventListener("pointermove", (e) => { sourisX = e.clientX; sourisY = e.clientY; }, { passive: true });
    document.addEventListener("pointerover", (e) => {
      const cibleCurseur = e.target.closest("[data-curseur]");
      curseur.classList.toggle("visible", Boolean(cibleCurseur));
      if (cibleCurseur) $("curseur-texte").textContent = cibleCurseur.dataset.curseur;
    });
    document.querySelectorAll("[data-aimant]").forEach((aimant) => {
      aimant.addEventListener("pointermove", (e) => {
        const r = aimant.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
        aimant.style.transform = "translate(" + x + "px," + y + "px)";
      });
      aimant.addEventListener("pointerleave", () => { aimant.style.transform = ""; });
    });
  }

  /* Tout ce qui dépend du défilement */
  const teteSite = $("tete-site");
  const pilule = $("pilule");
  const indice = $("pilule-indice");
  const liensPilule = [...pilule.querySelectorAll("a")];
  const sectionsPilule = liensPilule.map((a) => document.querySelector(a.getAttribute("href")));
  const barre = $("avancement");
  const timecode = $("timecode");
  const contenuHeros = $("heros-contenu");
  const voile = $("heros-voile");
  const deux = (n) => String(n).padStart(2, "0");
  const IMAGES = 25;
  const DUREE = 90;
  let dernierY = -1;
  let aActualiser = true;
  let actif = -2;
  let herosEnPause = true;

  function relancerVideos() {
    if (!lectureBloquee) return;
    lectureBloquee = false;
    document.querySelectorAll(".apercu video").forEach((video) => {
      if (!video.paused || (herosEnPause && video.closest(".mur-carte"))) return;
      const zone = video.getBoundingClientRect();
      if (zone.bottom > 0 && zone.top < window.innerHeight) lancer(video);
    });
  }

  if (!mouvementReduit) {
    document.addEventListener("touchend", relancerVideos, { passive: true });
    document.addEventListener("click", relancerVideos);
  }

  function majIndice() {
    const lien = liensPilule[actif];
    liensPilule.forEach((a, i) => {
      if (i === actif) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    if (!lien || lien.offsetWidth === 0) { indice.style.opacity = 0; return; }
    indice.style.opacity = 1;
    indice.style.width = lien.offsetWidth + "px";
    indice.style.transform = "translateX(" + lien.offsetLeft + "px)";
  }

  function majDefilement(y) {
    const vh = window.innerHeight;
    const max = Math.max(1, scrollMax());
    const avancement = borne(y / max, 0, 1);
    barre.style.transform = "scaleX(" + avancement + ")";

    const images = Math.round(avancement * DUREE * IMAGES);
    const secondes = Math.floor(images / IMAGES);
    timecode.textContent = "00:" + deux(Math.floor(secondes / 60)) + ":" + deux(secondes % 60) + ":" + deux(images % IMAGES);

    // Le héros recule pendant que la page passe par-dessus.
    const pHeros = borne(y / vh, 0, 1);
    if (!mouvementReduit) {
      heros.style.setProperty("--zoom", String(1 + pHeros * 0.14));
      contenuHeros.style.transform = "translateY(" + pHeros * -12 + "vh)";
      voile.style.backgroundColor = "rgba(11,11,10," + (0.42 + pHeros * 0.5) + ")";
      cartesMur.forEach((carte) => {
        const y = Number(carte.dataset.decalage) - pHeros * Number(carte.dataset.vitesse);
        carte.style.transform = "translateY(" + y + "vh)";
      });
    }
    if (!mouvementReduit) {
      if (pHeros >= 1 && !herosEnPause) {
        videosHeros.forEach((video) => video.pause());
        herosEnPause = true;
      }
      if (pHeros < 1 && herosEnPause) {
        herosEnPause = false;
        videosHeros.forEach(lancer);
      }
    }

    // Le menu se cache en descendant et revient en remontant.
    if (y > vh * 0.5 && y > dernierY + 2) teteSite.classList.add("cachee");
    else if (y < dernierY - 2 || y <= vh * 0.5) teteSite.classList.remove("cachee");

    document.body.classList.toggle("hors-heros", y > vh * 0.6);

    let nouveau = -1;
    sectionsPilule.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= vh * 0.5) nouveau = i;
    });
    if (nouveau !== actif) { actif = nouveau; majIndice(); }

    const rM = manifeste.getBoundingClientRect();
    if (rM.top < vh && rM.bottom > 0) {
      const p = borne((vh * 0.82 - rM.top) / (rM.height + vh * 0.3), 0, 1);
      const allumes = Math.round(p * motsManifeste.length);
      motsManifeste.forEach((mot, i) => mot.classList.toggle("allume", i < allumes));
    }

    if (enPiste) {
      const rG = galerie.getBoundingClientRect();
      if (rG.top < vh && rG.bottom > 0) {
        const parcours = Math.max(1, galerie.offsetHeight - vh);
        const p = borne(-rG.top / parcours, 0, 1);
        piste.style.transform = "translate3d(" + -p * Math.max(0, piste.offsetWidth - window.innerWidth) + "px,0,0)";
        $("galerie-barre").style.transform = "scaleX(" + p + ")";
        cartes.forEach((carte) => {
          const r = carte.getBoundingClientRect();
          if (r.right < 0 || r.left > window.innerWidth) return;
          const centre = (r.left + r.width / 2) / window.innerWidth - 0.5;
          carte.style.setProperty("--px", (-centre * 7).toFixed(2) + "%");
        });
      }
    }
  }

  let bandeX = 0;
  let dernierT = performance.now();

  function boucle(t) {
    const dt = Math.min(50, t - dernierT);
    dernierT = t;

    if (anime) {
      actuel += (cible - actuel) * (1 - Math.exp(-dt / 105));
      if (Math.abs(cible - actuel) < 0.4) { actuel = cible; anime = false; }
      window.scrollTo({ top: actuel, behavior: "instant" });
    }

    const y = window.scrollY;
    const vitesse = dernierY < 0 ? 0 : y - dernierY;
    if (y !== dernierY || aActualiser) {
      majDefilement(y);
      dernierY = y;
      aActualiser = false;
    }

    if (!mouvementReduit) {
      const moitie = bande.offsetWidth / 2;
      bandeX -= dt * 0.05 + Math.abs(vitesse) * 0.55;
      if (moitie && bandeX <= -moitie) bandeX += moitie;
      bande.style.transform = "translate3d(" + bandeX + "px,0,0)";
    }

    if (aSouris) {
      curseurX += (sourisX - curseurX) * (1 - Math.exp(-dt / 70));
      curseurY += (sourisY - curseurY) * (1 - Math.exp(-dt / 70));
      curseur.style.transform = "translate3d(" + curseurX + "px," + curseurY + "px,0)";
    }

    requestAnimationFrame(boucle);
  }

  /* Intro */
  function lancerHeros() {
    heros.classList.add("lance");
    voir.observe($("nom"));
    setTimeout(() => heros.classList.add("fini"), 2300);
  }

  function jouerIntro() {
    const intro = $("intro");
    const dejaVue = (() => {
      try { return sessionStorage.getItem("intro-vue"); } catch (e) { return "1"; }
    })();
    if (mouvementReduit || dejaVue || window.scrollY > 0) {
      lancerHeros();
      return;
    }
    try { sessionStorage.setItem("intro-vue", "1"); } catch (e) { /* navigation privée */ }
    intro.classList.add("actif");
    document.body.classList.add("fige");
    const depart = performance.now();
    const compter = (t) => {
      if (!intro.isConnected) return;
      const p = borne((t - depart) / 1250, 0, 1);
      const images = Math.round((1 - Math.pow(1 - p, 3)) * 8 * IMAGES);
      $("intro-tc").textContent = "00:00:" + deux(Math.floor(images / IMAGES)) + ":" + deux(images % IMAGES);
      if (p < 1) requestAnimationFrame(compter);
    };
    requestAnimationFrame(compter);
    setTimeout(() => {
      intro.classList.add("sortie");
      document.body.classList.remove("fige");
      lancerHeros();
    }, 1350);
    setTimeout(() => intro.remove(), 2500);
  }

  /* Démarrage */
  afficherProjets("tous");
  voir.observe($("galerie-entete"));
  new IntersectionObserver((entrees, obs) => {
    if (!entrees[0].isIntersecting) return;
    galerie.classList.add("vu");
    obs.disconnect();
  }, { threshold: 0.01, rootMargin: "0px 0px -20% 0px" }).observe(galerie);

  ajusterNom();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { ajusterNom(); mesurerGalerie(); aActualiser = true; });
  }
  window.addEventListener("resize", () => {
    ajusterNom();
    mesurerGalerie();
    majIndice();
    aActualiser = true;
  });
  grandEcran.addEventListener("change", mesurerGalerie);

  jouerIntro();
  requestAnimationFrame(boucle);
})();
