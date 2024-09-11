// ajoute le dictionnaire stocké dans un fichier distinct
import { dictionnaire_list } from "./dictionnaire.js";

document.addEventListener('DOMContentLoaded', () => {
    // choisit le nombre de lettre nécessaire
    let nbLettres = Math.floor(Math.random() * 4);
    // clavier
    let clavier = document.getElementsByClassName("key");
    // on récupère les div lettres 
    let tableGame = document.getElementsByClassName("lettre");
    console.log(Array.from(tableGame));
    
    let saisie = 0;
    
    // choisit le mot dans le dictionnnaire selon le nombre de lettres
    function choixmotparlongueur(longueur) {
        const liste = dictionnaire_list[longueur];
        const indexAleatoire = Math.floor(Math.random() * liste.length);
        return liste[indexAleatoire];
    }
    
    let mot = choixmotparlongueur(nbLettres);
    let nbgrilleMot = mot.length;

    console.log(mot + " " + nbgrilleMot + " caractères");
    
    // génère une grille du nombre de lettres du mot et insère la 1ere lettre
    
    for (let i = 0; i < nbgrilleMot; i++) {
        const div = document.createElement("div");
        div.classList.add("lettre");
        if (i === 0) {div.textContent = mot[0]}
        else {div.textContent = "."}
        document.getElementById("tableJeu").appendChild(div);
    }

    
    document.body.addEventListener("keydown", (ev) => {
        
        console.log("s " + saisie + " nbl " + nbgrilleMot);
        if(saisie > 0){
        // if(ev.key = "Backspace"){
        //     console.log(ev.key + "suppression ! " + saisie);
                
        //     tableGame[saisie-1].innerText = ".";
        //     saisie--;
        //     console.log(saisie);
        //     }

        if(saisie < nbgrilleMot) {
            console.log("actuel " + tableGame[saisie].innerText + " saisie " + ev.key);

            tableGame[saisie].innerText = ev.key.toUpperCase();;
            
            console.log("résultat " + tableGame[saisie].innerText);
            
            saisie++;
        };}
        else{saisie++};
    });

    for( let i=0; i< clavier.length; i++) {
        clavier[i].addEventListener("click", (ev) => {
            
            console.log("s " + saisie + " nbl " + nbgrilleMot);
            if(saisie > 0){
            
            if( saisie < nbgrilleMot) {
                
                console.log("actuel " + tableGame[saisie].innerText + " saisie " + ev.target.innerText);
                
                tableGame[saisie].innerText = ev.target.innerText;
                
                console.log("résultat " + tableGame[saisie].innerText);
                
                saisie++;
                }}
            else {saisie++;
                };
            });
        };

        const deleteBoutons = document.getElementsByClassName("fa-backspace");
        if (deleteBoutons.length > 0) {
            deleteBoutons[0].addEventListener('click', () => {
                // Supprime la dernière lettre
                tableGame[saisie].innerText = ".";
                saisie--;
            });
        }
        
}); // fermeture du dom contentloaded(FIN)