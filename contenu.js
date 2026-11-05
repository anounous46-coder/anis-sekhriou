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
    { id: "sous-titres", nom: "Montage et sous-titres" },
  ],

  projets: [
    { titre: "Amine Studio", client: "Motion design, agence", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/amine.mp4", apercu: "apercus/amine.mp4" },
    { titre: "T Agency", client: "Publicité, abonnements numériques", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/t-agency.mp4", apercu: "apercus/t-agency.mp4" },
    { titre: "KZ Renova", client: "Publicité, rénovation", role: "Vertical 9:16", style: "motion", format: "vertical", video: "videos/renova.mp4", apercu: "apercus/renova.mp4" },
    { titre: "IBM", client: "Présentation, aménagement de salon", role: "Vertical 9:16", style: "sous-titres", format: "vertical", video: "videos/ibm.mp4", apercu: "apercus/ibm.mp4" },
    { titre: "Fassi7", client: "Publicité, cours d'allemand", role: "Vertical 9:16", style: "sous-titres", format: "vertical", video: "videos/fassi.mp4", apercu: "apercus/fassi.mp4" },
  ],

  // Ajoute rush et montage pour afficher le comparateur.
  avantApres: { rush: "", montage: "", legende: "Glisse pour comparer le rush et le résultat final." },

  // tarif est facultatif : laisse "" pour ne rien afficher.
  // style : le filtre appliqué aux projets quand on clique sur la carte.
  services: [
    { nom: "Publicités verticales", description: "Des vidéos courtes pour les réseaux, avec un début qui accroche et un appel à l'action clair.", tarif: "", style: "", apercu: "apercus/fassi.mp4" },
    { nom: "Motion design", description: "Des écrans et des titres animés pour présenter une offre sans tournage.", tarif: "", style: "motion", apercu: "apercus/amine.mp4" },
    { nom: "Présentation d'entreprise", description: "Vos lieux et vos réalisations mis en valeur, avec des sous-titres en arabe et en français.", tarif: "", style: "sous-titres", apercu: "apercus/ibm.mp4" },
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
