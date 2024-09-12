// ajoute le dictionnaire stocké dans un fichier distinct
import { dictionnaire_list } from "./dictionnaire.js";

document.addEventListener("DOMContentLoaded", () => {
	// on recupère les touches clavier
	let clavier = document.getElementsByClassName("key");
	// on récupère les div lettres de la grille
	let tableGame = document.getElementsByClassName("lettre");
	// on initialise le nombre de lettres de la saisie utilisateur
	let saisie = 1;
    let score = document.getElementById("score");
    score = 0;
    let motActuel = document.getElementById("motActuel") 
    motActuel = 1;
    let coupsRestants = document.getElementById("coupsRestants")
    coupsRestants = 5;
    let nbParties = document.getElementById("nbParties");
    nbParties = 1;
    let nbRounds = document.getElementById("nbRounds");
    nbRounds = 0;
    let nbMotsTrouves = document.getElementById("nbMotsTrouves");
    nbMotsTrouves = 0;
    let nbEssais = document.getElementById("nbEssais");
    nbEssais = 0;
    let proposition = "";

	// fonction de choix du mot dans le dictionnnaire selon le nombre de lettres
	function unMotRandom() {
		const longueur = Math.floor(Math.random() * 4);
		const liste = dictionnaire_list[longueur];
		const indexAleatoire = Math.floor(Math.random() * liste.length);
		return liste[indexAleatoire];
	}
    // on lance le 1er mot + on récupère sa longueur
	let mot = unMotRandom();
	let nbgrilleMot = mot.length;
    let coup = 1;

    console.log(mot);
    

    // fonction de remplissage de la grille par ligne
    function ligneGrille(mot, nbgrilleMot, rangee) {
        // on génère une ligne
        const ligne = document.createElement("div");
        ligne.classList.add("ligne");
        ligne.id = rangee
    	// génère une grille du nombre de lettres du mot et insère la 1ere lettre
	    for (let i = 0; i < nbgrilleMot; i++) {
		    const div = document.createElement("div");
		    div.classList.add("lettre");
	    	if (i === 0) {
		    	div.textContent = mot[0];
                div.classList.add("rouge");
		    } else {
			    div.textContent = ".";
		    }
            ligne.appendChild(div);
        }
		document.getElementById("tableJeu").appendChild(ligne);
    }
    // on met d'office la première ligne si le compteur d'essais est au max.
    if (coupsRestants === 5) {
        ligneGrille(mot, nbgrilleMot, coup);
        };

	// écoute des saisies clavier physique
	document.body.addEventListener("keydown", (ev) => {
		// en cas de saisie de touches non autorisées
		if (ev.key === "Ctrl" || ev.key === "Alt" || ev.key === "Shift" ||
             ev.key === "Space" || ev.key === "ArrowLeft" || ev.key === "ArrowRight" ||
              ev.key === "ArrowUp" || ev.key === "ArrowDown" || ev.key === "AltGraph" || ev.key == [0-9]) {
            
console.log("filtré : " + ev.key);
                return;
            }
        let key = ev.key;

console.log(key);

        const majuscule = key >= "A" && key <= "Z";
        const minuscule = key >= "a" && key <= "z";
        if (minuscule) {
            key = key.toUpperCase();}
        const Enter = key === "Enter";
        const supprimer = key === "Backspace";
        
        console.log("maj " + majuscule," min " + minuscule, " enter " + Enter, "suppr " + supprimer + " key " + key);
        // on ne tient compte que des éléments souhaités au clavier
        if (majuscule || minuscule || Enter || supprimer) {
            if (supprimer) {
			// si c'est la première case on ne fait rien
			    if (saisie == 1) {
			    	return;
			    } else {
				// on remet un point sur la case et on réduit le compteur d'un
				tableGame[saisie - 1].innerText = ".";
				saisie--;
				return;
			    }
		        }
		    // en cas de saisie d'une lettre et que le mot n'est pas fini
		    if (saisie < nbgrilleMot && saisie >= 1) {
		    	// on ajoute la nouvelle lettre dans la case + on augmente le compteur d'un
		    	tableGame[saisie].innerText = key;
		    	saisie++;
		        }
            // en cas de fin de mot + appui entrée
            if (saisie == nbgrilleMot && Enter) {
                compareMot();
                }
            }
        });

	// ajout des evenements clavier virtuel
	for (let i = 0; i < clavier.length; i++) {
		clavier[i].addEventListener("click", (ev) => {

            console.log(ev.target.innerText);
            
            // en cas de saisie du bouton supprimer
            if (ev.target.classList.contains("fa-backspace")) {
                // si c'est la première case on ne fait rien
                if (saisie == 1) {
                    return;
                } else {
                    // sinonon remet un point sur la case et on réduit le compteur d'un
                	tableGame[saisie - 1].innerText = ".";
				    saisie--;
    				return;
    			}};

            // en cas de saisie d'une lettre
            if (saisie < nbgrilleMot) {

                // on ajoute la nouvelle lettre dans la case et on augmente le compteur d'un
				tableGame[saisie].innerText = ev.target.innerText;
				saisie++;
			}
            // en cas de clic sur valider
            if(ev.target.classList.contains("fas fa-sign-in-alt")) {
                compareMot();
            }
		});
	}

    // on compare le mot saisi avec le mot du dictionnaire
    function compareMot() {
        // on compare le mot saisi en dernière ligne avec le mot du dictionnaire
        const proposition = document.getElementById("tableJeu").lastChild;

        console.log(proposition.children);
        const lettres = proposition.children;

        if (mot == proposition.innerText) {
            // on colore toutes les cases en rouge
            for (let i = 0; i < nbgrilleMot; i++) {
                lettres[i].class += "rouge";
            }
            // et on relance un nouveau mot en augmentant le score et le mot actuel de 1
            mot = unMotRandom();
            nbgrilleMot = mot.length;
            score = score + 1;
            motActuel = motActuel + 1;
            coupsRestants = 5;
            coup = 1;
            ligneGrille(mot, nbgrilleMot, coup);
        } else {
            // sinon on enleve un point de coups et on affiche le nb de coups restants
            coupsRestants = coupsRestants - 1;
            // on affiche en rouge les lettres bien placées
            for (let i = 0; i < nbgrilleMot; i++) {
                if (mot[i] == lettres[i].innerText) {
                    lettres[i].classList.add("rouge");
                } else
                    // on affiche en orange les lettres mal placées 
                    if (mot.includes(lettres[i].innerText)) {
                    lettres[i].classList.add("orange");
                }
            }

            // et on relance la saisie sur une nouvelle ligne
            coup++;
            ligneGrille(mot, nbgrilleMot, coup);
        }
    }

}); // fermeture du dom contentloaded(FIN)
