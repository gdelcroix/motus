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

    const clavier = document.getElementsByClassName("key"); 
    const tableGame=document.getElementById("tableJeu");

    document.body.addEventListener("keydown", (ev) => {
        tableGame.innerText += ev.key;
        console.log(ev.key);
        });

    for( let i=0; i< clavier.length; i++) {
        clavier[i].addEventListener('click', () => {
            tableGame.innerText += clavier[i].innerText;
            console.log(clavier[i].innerText);
        });
    };

