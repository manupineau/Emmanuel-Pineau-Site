// Attendre que la page soit chargée
document.addEventListener("DOMContentLoaded", () => {
    const navConteneur = document.getElementById("navigation-articles");
    const idActuel = document.body.getAttribute("data-id");

    if (!navConteneur || !idActuel) return;

    // 1. Récupérer la liste des articles depuis le fichier JSON
    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            // 2. Trouver l'index de l'article actuel dans le tableau
            const indexActuel = articles.findIndex(article => article.id === idActuel);
            
            if (indexActuel === -1) return; // Article non trouvé dans le JSON

            const articlePrecedent = articles[indexActuel - 1];
            const articleSuivant = articles[indexActuel + 1];

            // 3. Construire le HTML de navigation de manière dynamique
            let htmlNavigation = `<ul style="display: flex; justify-content: space-between; list-style: none; padding: 0;">`;

            // Si un article précédent existe, on crée le lien
            if (articlePrecedent) {
                htmlNavigation += `<li><a href="${articlePrecedent.url}">← ${articlePrecedent.titre}</a></li>`;
            } else {
                htmlNavigation += `<li></li>`; // Case vide pour maintenir l'alignement
            }

            // Si un article suivant existe, on crée le lien
            if (articleSuivant) {
                htmlNavigation += `<li><a href="${articleSuivant.url}">${articleSuivant.titre} →</a></li>`;
            } else {
                htmlNavigation += `<li></li>`;
            }

            htmlNavigation += `</ul>`;

            // 4. Injecter le résultat dans la page HTML
            navConteneur.innerHTML = htmlNavigation;
        })
        .cause(error => console.error("Erreur de chargement de la navigation :", error));
});