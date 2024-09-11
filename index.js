// document.addEventListener('DOMContentLoaded', () => {
    // ajoute le dictionnaire stocké dans un fichier distinct
    import { dictionnaire_list } from "./dictionnaire.js"; 
        
    // choisit le nombre de lettre nécessaire
    const nbLettres = Math.floor(Math.random() * 4);
    // choisit le mot dans le dictionnnaire selon le nombre de lettres
    function choixmotparlongueur(longueur) {
        const liste = dictionnaire_list[longueur];
        const indexAleatoire = Math.floor(Math.random() * liste.length);
        return liste[indexAleatoire];
    }
    
    const mot = choixmotparlongueur(nbLettres);
    
    console.log(mot);

    // génère une grille du nombre de lettres du mot et insère la lettre
    const nbgrilleMot = mot.length;

    for (let i = 0; i < nbgrilleMot; i++) {
        const div = document.createElement("div");
        div.classList.add("lettre");
        if (i === 0) {div.textContent = mot[0]}
        else {div.textContent = "."}
        document.getElementById("tableJeu").appendChild(div);
    }

    // récupère la lettre saisie par l'utilisateur et l'insère dans la grille à partir de la 2eme div lettre
     

// });