// script.js
let lastScrollTop = 0; // Variable pour suivre la position de défilement précédente
const header = document.getElementById('header'); // Sélectionne l'en-tête

window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop; // Obtient la position actuelle de défilement

    if (currentScroll > lastScrollTop) {
        // Défilement vers le bas
        header.style.transform = 'translateY(-100%)'; // Cache l'en-tête en le déplaçant vers le haut
    } else {
        // Défilement vers le haut
        header.style.transform = 'translateY(0)'; // Affiche l'en-tête en le ramenant à sa position d'origine
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Met à jour la position précédente du défilement
});

function ajouterAuPanier(nom, prix) {
    let panier = getPanier(); // Obtient le panier actuel
    let article = panier.find(item => item.nom === nom); // Vérifie si l'article est déjà dans le panier
    if (article) {
        article.quantité += 1; // Si l'article existe, augmente la quantité
    } else {
        panier.push({ nom: nom, prix: prix, quantité: 1 }); // Sinon, ajoute l'article avec une quantité de 1
    }
    savePanier(panier); // Sauvegarde le panier mis à jour
    afficherPanier(); // Met à jour l'affichage

    // Afficher le feedback
    afficherFeedback(); // Appel de la fonction pour afficher le feedback
}

// Fonction pour afficher le feedback
function afficherFeedback() {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.style.display = "block"; // Affiche le message
    setTimeout(() => {
        feedbackElement.style.display = "none"; // Cache le message après 3 secondes
    }, 3000);
}

// Fonction pour obtenir le panier à partir du localStorage
function getPanier() {
    const panier = localStorage.getItem("panier");
    return panier ? JSON.parse(panier) : []; // Retourne le panier ou un tableau vide
}

// Fonction pour sauvegarder le panier dans le localStorage
function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier)); // Sauvegarde le panier
}

// Fonction pour afficher le contenu du panier
function afficherPanier() {
    const listePanier = document.getElementById("liste-panier");
    const totalElement = document.getElementById("total");
    const panier = getPanier(); // Obtient le panier
    listePanier.innerHTML = ""; // Vide la liste avant d'afficher
    let total = 0; // Initialisation du total

    // Parcours chaque article du panier
    panier.forEach(article => {
        let li = document.createElement("li"); // Crée un nouvel élément de liste
        // Définit le contenu de l'élément de liste
        li.innerHTML = `
            ${article.nom} - 
            <input type="number" value="${article.quantité}" min="1" onchange="modifierQuantite('${article.nom}', this.value)"> x 
            ${article.prix} FCFA 
            <button onclick="supprimerArticle('${article.nom}')">Supprimer</button>
        `;
        listePanier.appendChild(li); // Ajoute l'élément à la liste
        total += article.prix * article.quantité; // Calcule le total
    });

    totalElement.textContent = total; // Met à jour l'affichage du total
}

// Fonction pour modifier la quantité d'un article dans le panier
function modifierQuantite(nom, nouvelleQuantite) {
    let panier = getPanier(); // Obtient le panier
    let article = panier.find(item => item.nom === nom); // Trouve l'article par son nom
    if (article) {
        article.quantité = parseInt(nouvelleQuantite); // Met à jour la quantité
        savePanier(panier); // Sauvegarde le panier mis à jour
        afficherPanier(); // Met à jour l'affichage
    }
}

// Fonction pour supprimer un article du panier
function supprimerArticle(nom) {
    let panier = getPanier(); // Obtient le panier
    panier = panier.filter(item => item.nom !== nom); // Filtre l'article à supprimer
    savePanier(panier); // Sauvegarde le panier mis à jour
    afficherPanier(); // Met à jour l'affichage
}

// Fonction pour vider le panier
function viderPanier() {
    localStorage.removeItem("panier"); // Supprime le panier du localStorage
    afficherPanier(); // Met à jour l'affichage
}

// Appeler afficherPanier au chargement de la page pour afficher le contenu initial
document.addEventListener("DOMContentLoaded", afficherPanier);
