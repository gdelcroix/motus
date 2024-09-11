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

       

// });