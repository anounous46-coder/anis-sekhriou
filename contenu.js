// TOUT LE TEXTE ET LES VIDÉOS DU SITE SONT ICI.
//
// Pour une vidéo :
//   video   : le fichier complet avec le son, rangé dans videos/
//   youtube : ou bien le lien YouTube (il remplace alors le fichier)
//   apercu  : un extrait court et sans son, rangé dans apercus/
//   format  : "horizontal" (16:9) ou "vertical" (9:16)
//   style   : l'id d'un des styles ci-dessous

window.CONTENU = {
  nom: "Anis Sekhriou",
  metier: "Montage vidéo",
  accroche: "Des vidéos qu'on regarde jusqu'à la dernière seconde.",
  manifeste: "Je transforme vos rushes en vidéos qui retiennent l'attention. Le bon rythme, la bonne coupe, le bon silence, jusqu'à la dernière image.",

  // Ajoute video ou youtube pour que le bouton du haut lance ton showreel.
  showreel: { youtube: "", video: "" },

  styles: [
    { id: "motion", nom: "Motion design" },
    { id: "produit", nom: "Produit" },
    { id: "ugc", nom: "Face caméra et UGC" },
    { id: "montage", nom: "B-roll et sous-titres" },
  ],

  projets: [
    { titre: "Amine Studio", client: "Motion design, agence", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/amine.mp4", apercu: "apercus/amine.mp4" },
    { titre: "T Agency", client: "Publicité, abonnements numériques", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/t-agency.mp4", apercu: "apercus/t-agency.mp4" },
    { titre: "KZ Renova", client: "Publicité, rénovation", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/renova.mp4", apercu: "apercus/renova.mp4" },
    { titre: "Amine Studio B-roll", client: "Motion design et B-roll, agence", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/amine-broll.mp4", apercu: "apercus/amine-broll.mp4" },
    { titre: "IBM", client: "Présentation, aménagement de salon", role: "Vertical 9:16", style: "montage", format: "vertical", video: "videos/ibm.mp4", apercu: "apercus/ibm.mp4" },
    { titre: "Fassi7", client: "Publicité, cours d'allemand", role: "Vertical 9:16", style: "montage", format: "vertical", video: "videos/fassi.mp4", apercu: "apercus/fassi.mp4" },
    { titre: "Oasera 3D", client: "Publicité, compléments beauté", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/oasera-3d.mp4", apercu: "apercus/oasera-3d.mp4" },
    { titre: "Shahin Digital Store", client: "Motion design 3D, produits numériques", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/shahin.mp4", apercu: "apercus/shahin.mp4" },
    { titre: "Alma Pura", client: "Présentation de la collection, parfums", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/alma-redouane.mp4", apercu: "apercus/alma-redouane.mp4" },
    { titre: "Canne Magique", client: "Publicité, canne médicale", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/canne.mp4", apercu: "apercus/canne.mp4" },
    { titre: "Honey Luxe", client: "Publicité, miel", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/chebab.mp4", apercu: "apercus/chebab.mp4" },
    { titre: "Formation Chine", client: "Publicité, voyage et formation", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/chine.mp4", apercu: "apercus/chine.mp4" },
    { titre: "Alma Pura, l'accroche", client: "Publicité, parfums", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/alma-choc.mp4", apercu: "apercus/alma-choc.mp4" },
    { titre: "MM Clean, avant et après", client: "Publicité, nettoyage", role: "Vertical 9:16", style: "montage", format: "vertical", video: "videos/mm-clean-2.mp4", apercu: "apercus/mm-clean-2.mp4" },
    { titre: "Élégance Inox et Verre", client: "Publicité, rampes et garde-corps", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/elegance.mp4", apercu: "apercus/elegance.mp4" },
    { titre: "Oasera Flash", client: "Publicité, compléments beauté", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/oasera-flash.mp4", apercu: "apercus/oasera-flash.mp4" },
    { titre: "Abonnement Claude", client: "Publicité, abonnement IA", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/cloud-claude.mp4", apercu: "apercus/cloud-claude.mp4" },
    { titre: "Elhalla", client: "Publicité, sérum", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/elhalla.mp4", apercu: "apercus/elhalla.mp4" },
    { titre: "Formation digitale 1", client: "Publicité, formation", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/formation-1.mp4", apercu: "apercus/formation-1.mp4" },
    { titre: "Formation digitale 2", client: "Publicité, formation", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/formation-2.mp4", apercu: "apercus/formation-2.mp4" },
    { titre: "SwingMed", client: "Motion design, stérilisateur de biberons", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/swingmed.mp4", apercu: "apercus/swingmed.mp4" },
    { titre: "Alma Pura, la journée", client: "Mise en scène, parfums", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/alma-journee.mp4", apercu: "apercus/alma-journee.mp4" },
    { titre: "Alma Pura, les notes", client: "Publicité, parfums", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/alma-notes.mp4", apercu: "apercus/alma-notes.mp4" },
    { titre: "Alma Pura, choisis ton parfum", client: "Publicité, parfums", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/alma-choisis.mp4", apercu: "apercus/alma-choisis.mp4" },
    { titre: "Alma Pura, les combos", client: "Publicité, parfums", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/alma-combo.mp4", apercu: "apercus/alma-combo.mp4" },
    { titre: "Alma Pura, teaser", client: "Publicité, parfums", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/alma-teaser.mp4", apercu: "apercus/alma-teaser.mp4" },
    { titre: "Oasera Éditorial", client: "Publicité, compléments beauté", role: "Vertical 9:16", style: "ugc", format: "vertical", video: "videos/oasera-creme.mp4", apercu: "apercus/oasera-creme.mp4" },
    { titre: "Shooting Agency", client: "Publicité, agence de production", role: "Vertical 9:16", style: "montage", format: "vertical", video: "videos/shooting.mp4", apercu: "apercus/shooting.mp4" },
    { titre: "Boutique Kanzi", client: "Publicité, vêtements", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/bk-lock.mp4", apercu: "apercus/bk-lock.mp4" },
    { titre: "Atelier Meta Ads", client: "Motion design 3D, formation", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/amine-3d.mp4", apercu: "apercus/amine-3d.mp4" },
    { titre: "Zamakan", client: "Publicité, formation", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/dawra.mp4", apercu: "apercus/dawra.mp4" },
    { titre: "Psychologue", client: "Présentation, psychologue", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/psy.mp4", apercu: "apercus/psy.mp4" },
    { titre: "Formation psy", client: "Motion design, formation en psychologie", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/psy-2.mp4", apercu: "apercus/psy-2.mp4" },
    { titre: "Gâteaux Moula", client: "Publicité, formation pâtisserie", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/gateaux.mp4", apercu: "apercus/gateaux.mp4" },
    { titre: "LuxShopverse", client: "Publicité, semelles orthopédiques", role: "Vertical 9:16", style: "produit", format: "vertical", video: "videos/kossal.mp4", apercu: "apercus/kossal.mp4" },
    { titre: "MM Clean", client: "Publicité, nettoyage", role: "Vertical 9:16", style: "montage", format: "vertical", video: "videos/mm-clean.mp4", apercu: "apercus/mm-clean.mp4" },
    { titre: "El Matine PVC", client: "Publicité, portes et fenêtres", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/zr-matin.mp4", apercu: "apercus/zr-matin.mp4" },
    { titre: "El Matine PVC 2", client: "Publicité, portes et fenêtres", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/zr-matine.mp4", apercu: "apercus/zr-matine.mp4" },
    { titre: "Fassi7, version 2", client: "Publicité, cours d'allemand", role: "Vertical 9:16", style: "montage", format: "vertical", video: "videos/fassi-2.mp4", apercu: "apercus/fassi-2.mp4" },
  ],

  // Ajoute rush et montage pour afficher le comparateur.
  avantApres: { rush: "", montage: "", legende: "Glisse pour comparer le rush et le résultat final." },

  // tarif est facultatif : laisse "" pour ne rien afficher.
  // style : le filtre appliqué aux projets quand on clique sur la carte.
  services: [
    { nom: "Publicités verticales", description: "Des vidéos courtes pour les réseaux, avec un début qui accroche et un appel à l'action clair.", tarif: "", style: "produit", apercu: "apercus/oasera-3d.mp4" },
    { nom: "Motion design", description: "Des écrans et des titres animés pour présenter une offre sans tournage.", tarif: "", style: "motion", apercu: "apercus/shahin.mp4" },
    { nom: "Présentation d'entreprise", description: "Vos lieux et vos réalisations mis en valeur, avec des sous-titres en arabe et en français.", tarif: "", style: "montage", apercu: "apercus/ibm.mp4" },
  ],

  methode: [
    { titre: "Brief", texte: "Vous me dites à qui s'adresse la vidéo et ce qu'elle doit provoquer." },
    { titre: "Rushes", texte: "J'écoute tout et je sélectionne les meilleurs moments." },
    { titre: "Montage", texte: "Je construis le rythme, le son, les sous-titres et les animations." },
    { titre: "Livraison", texte: "Après vos retours, vous recevez la vidéo prête à publier." },
  ],

  // Mets seulement de vrais résultats. Une liste vide [] fait disparaître son bloc.
  resultats: {
    chiffres: [],  // exemple : { valeur: "1,2 M", label: "vues sur un Reel" }
    avis: [],      // exemple : { texte: "...", auteur: "..." }
    clients: [],   // exemple : "Nom du client"
  },

  contact: {
    email: "anissekhriou2022@gmail.com",
    whatsapp: "213781417081",  // numéro international sans le + ni espaces
    instagram: "", // pseudo sans le @
  },
};
