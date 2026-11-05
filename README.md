# Portfolio de montage vidéo

Site statique pour GitHub Pages, sans étape de compilation.

- `contenu.js` : tous les textes et toutes les vidéos. C'est le seul fichier à modifier pour remplir le site.
- `videos/` : les vidéos complètes avec le son. GitHub refuse les fichiers de plus de 100 Mo.
- `apercus/` : les extraits courts et sans son. Vise moins de 10 Mo par fichier.
- Une vidéo peut aussi venir de YouTube : renseigne alors son lien dans `contenu.js`.

Pour voir le site en local : `node .claude/serveur.js`, puis http://localhost:4173.
