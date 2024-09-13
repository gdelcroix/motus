// ajoute le dictionnaire stocké dans un fichier distinct
//import dictionnaire_list from './dictionnaire.js';

	// on recupère les touches clavier
	let clavier = document.getElementsByClassName("key");
	// on récupère les div lettres de la grille
	let rangee = 0;
	let tableJeu = document.getElementById("tableJeu");
	// on initialise le nombre de lettres de la saisie utilisateur
	let saisie = 1;
	let score = document.getElementById("score");
	score.innerText = 0;
	let coupsRestants = document.getElementById("coupsRestants");
	coupsRestants.innerText = 5;
	let nbParties = document.getElementById("nbParties");
	nbParties.innerText = 0;
	let nbRounds = document.getElementById("nbRounds");
	nbRounds.innerText = 0;
	let nbMotsTrouves = document.getElementById("nbMotsTrouves");
	nbMotsTrouves.innerText = 0;
	let nbEssais = document.getElementById("nbEssais");
	nbEssais.innerText = 0;

	const dictionnaire_list = [
		"ABACA",
		"PRIMO",
		"FINALES",
		"RESTENT",
		"HEAUME",
		"MARBRE",
		"SIXTIES",
		"MABOULE",
		"BASSISTE",
		"PASTRAMI",
	];

	// fonction de choix du mot dans le dictionnnaire selon le nombre de lettres
	function unMotRandom() {
		/*const longueur = Math.floor(Math.random() * 4);*/
		const liste = dictionnaire_list/*[longueur]*/;
		const indexAleatoire = Math.floor(Math.random() * liste.length);
		return liste[indexAleatoire];
	}
	// on lance le 1er mot + on récupère sa longueur
	let mot = unMotRandom();
	let nbgrilleMot = mot.length;

    // fonction qui rentre les lettres deja trouvées dans la grille
    function majGrid() {
      let i = rangee - 1;
console.log("rangee " + rangee);
console.log("i " + i)
      if (i >= 0) {
        let lettres = majligne();
        for (let j = i; j >= 0; j--) {
            const lignePrecedente = tableJeu.children[j];
            const elementsLP = lignePrecedente.children;
            for (let k = 1; k < nbgrilleMot; k++) {
                const element = elementsLP[k];
                if (element.classList.contains("rouge")) {
                    lettres[k].textContent = element.textContent;
                    lettres[k].classList.add("rouge"); // maj nouvelle ligne
                    }
                }
            }
        for (let j = 1; j < nbgrilleMot; j++) {
            if (!lettres[j].classList.contains("rouge")) {
                lettres[j].textContent = ".";
                }
            }
        }
    }

	// fonction de remplissage de la grille par ligne
	function ligneGrille(solution, longueur, etage) {
		// on génère une ligne
		const ligne = document.createElement("div");
		ligne.classList.add("ligne");
		ligne.id = etage;
		// génère une grille du nombre de lettres du mot et insère la 1ere lettre
		for (let i = 0; i < longueur; i++) {
			const div = document.createElement("div");
			div.classList.add("lettre");
			if (i === 0) {
				div.textContent = solution[0];
				div.classList.add("rouge");
			} else {
				div.textContent = ".";
			}
			ligne.appendChild(div);
		}
		document.getElementById("tableJeu").appendChild(ligne);
		// on incremente le compteur d'etage
		rangee += 1;
	}
	// on met d'office la première ligne si le compteur d'essais est au max.
	if (rangee === 0) {
		ligneGrille(mot, nbgrilleMot, rangee);
	}

	// récupération du contenu de la dernière ligne à la demande
	function majligne() {
		let proposition = tableJeu.lastChild;
		let lettres = proposition.children;
		return lettres;
	}

	// écoute des saisies clavier physique
	document.body.addEventListener("keydown", (ev) => {
		if (ev.defaultPrevented){return;}
        const key = ev.key;
console.log(key);
        let lettres = majligne();
        if (/^[a-zA-Z]$/.test(key)){
                if (saisie < nbgrilleMot && saisie >= 1) {
                    // on ajoute la nouvelle lettre dans la case + on augmente le compteur d'un
                    lettres[saisie].innerText = ev.key.toUpperCase();
                    bidule();
                    saisie++;
                    }
                ev.preventDefault();
                return;
            }
        switch (key) {
            case "Enter":
                // en cas de fin de mot + appui entrée
                if (saisie == nbgrilleMot) {
                    compareMot();
                    break;
                } 
                if (saisie < nbgrilleMot) {
                    return;
                }
                break;
            case "Backspace":
            if (saisie == 1) {
					return;
				} else {
					// on remet un point sur la case et on réduit le compteur d'un
					lettres[saisie - 1].innerText = ".";
					saisie--;
					return;
				}
            default:
                return;
        }
        ev.preventDefault();},true,);

	// écoute des evenements clavier virtuel
	for (let i = 0; i < clavier.length; i++) {
		clavier[i].addEventListener("click", (ev) => {
			let lettres = majligne();
			// en cas de saisie du bouton supprimer
			if (ev.target.classList.contains("fa-backspace")) {
				// si c'est la première case on ne fait rien
				if (saisie == 1) {
					return;
				} else {
					// sinonon remet un point sur la case et on réduit le compteur d'un
					lettres[saisie - 1].innerText = ".";
					saisie--;
					return;
				}
			}

			// en cas de clic sur valider
			if (ev.target.classList.contains("fa-sign-in-alt")) {
				if (saisie < nbgrilleMot) {
					return;
				}
				if (saisie == nbgrilleMot) {
					compareMot();
					return;
				}
			}
			// en cas de saisie d'une lettre
			if (saisie < nbgrilleMot) {
				bidule();
				// on ajoute la nouvelle lettre dans la case et on augmente le compteur d'un
				lettres[saisie].innerText = ev.target.innerText;
				saisie++;
			}
		});
	}

	function bidule() {
		let lettres = majligne();
		let bidule = "";
		for (let i = 0; i < lettres.length; i++) {
			bidule += lettres[i].textContent;
		}
		console.log("rangee " + rangee);
		console.log("saisie " + saisie);
		console.log(bidule);
		console.log(mot);
	}

	// on compare le mot saisi avec le mot du dictionnaire
	function compareMot() {
		bidule();
		let lettres = majligne();
		// on concatène pour comparer les lettres de la grille et le mot du dictionnaire
		let motSaisi = "";
		for (let i = 0; i < lettres.length; i++) {
			motSaisi += lettres[i].textContent;
		}
		if (mot == motSaisi) {
			// on colore toutes les cases en rouge
			for (let i = 0; i < nbgrilleMot; i++) {
				lettres[i].classList.add("rouge");
                lettres[i].classList.remove("orange");
                }
				alert("Victoire ! Vous avez trouvé le mot.");

    
           
function startConfetti () {
const duration = 60 * 60 * 1000
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };


function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

const interval = setInterval(function () {
	const timeLeft = animationEnd - Date.now();

	if (timeLeft <= 0) {
		return clearInterval(interval);
	}

	const particleCount = 20 * (timeLeft / duration);

	// since particles fall down, start a bit higher than random
	confetti(
		Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
		})
	);
	confetti(
		Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
		})
	);
}, 250);
}

{
    location.reload();

}


startConfetti ();
				// et on relance un nouveau mot en augmentant le score de 1
			setTimeout(() => {
                console.log("pause 3s apres le bon mot");
                resetjeu(true);
            },3000);
            
			return;
		} else {
			// sinon on enleve un point de coups et on affiche le nb de coups restants
			coupsRestants.innerText = parseInt(coupsRestants.innerText) - 1;
			// on colore les lettres selon la règle
			for (let i = 0; i < nbgrilleMot; i++) {
				if (mot[i] == lettres[i].innerText) {
					lettres[i].classList.add("rouge");
                    lettres[i].classList.remove("orange");
				} else if (mot.includes(lettres[i].innerText)) {
					lettres[i].classList.add("orange");
                    lettres[i].classList.remove("rouge");
				}
			}
			// si le nombre de chances est fini :
			if (coupsRestants.innerText == 0) {
				console.log("perdu");
				// on affiche le bon mot
				for (let i = 0; i < nbgrilleMot; i++) {
					lettres[i].innerText = mot[i];
					lettres[i].classList.add("rouge");
				}
				// et on relance une nouvelle partie avec un nouveau mot + stats de moyennes a jour
				resetjeu(false);
				return;
			} else {
				console.log("un tour pas bon " + rangee);
				// et on relance la saisie sur une nouvelle ligne
				ligneGrille(mot, nbgrilleMot, rangee);
				saisie = 1;
                majGrid();
                console.log("nouvelle rangée ? " + rangee);
			}
		}
	}

function resetjeu(gagne){
    if (gagne == true){
        // actions spécifiques gagné
        score.innerText = parseInt(score.innerText) + 1;
console.log("gagné ");
        nbRounds.innerText = parseInt(nbRounds.innerText) + 1;
        nbMotsTrouves.innerText = parseInt(nbMotsTrouves.innerText) + 1;
        nbEssais.innerText = parseInt(nbEssais.innerText) + (saisie - 1);
        coupsRestants.innerText = 5;
    }
    else if (gagne == false){
        // actions spécifiques perdu
console.log("perdu ");
    }
    // actions qui ont lieu toujours pour un nouveau mot
console.log("resetjeu globales");
    tableJeu.innerHTML = "";
    mot = unMotRandom();
    nbgrilleMot = mot.length;
    rangee = 0;
    saisie = 1;
    ligneGrille(mot, nbgrilleMot, rangee);
    bidule();
    }

