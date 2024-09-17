// ajoute le dictionnaire stocké dans un fichier distinct
//import dictionnaire_list from './dictionnaire.js';
function setDefaultLocale(key, defaultVal) {
	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, defaultVal);
	}
};
	// on recupère les touches clavier
let clavier = document.getElementsByClassName("key");
	// on récupère les div lettres de la grille
let tableJeu = document.getElementById("tableJeu");
	// on initialise le nombre de lettres de la saisie utilisateur
let score = document.getElementById("score");
score.innerText = 0;
let coupsRestants = document.getElementById("coupsRestants");
coupsRestants.innerText = 5;
setDefaultLocale("nbParties", 0);
let nbParties = document.getElementById("nbParties");
nbParties.innerText = localStorage.getItem("nbParties");
setDefaultLocale("nbRounds", 0);
let nbRounds = document.getElementById("nbRounds");
nbRounds.innerText = parseInt(localStorage.getItem("nbRounds"));
setDefaultLocale("nbMotsTrouves", 0);
let nbMotsTrouves = document.getElementById("nbMotsTrouves");
nbMotsTrouves.innerText = localStorage.getItem("nbMotsTrouves");
setDefaultLocale("nbEssais", 0);
let nbEssais = document.getElementById("nbEssais");
nbEssais.innerText = localStorage.getItem("nbEssais");
let donneesTransverses = {
	mot: null,
	nbgrilleMot: null,
	rangee: 0,
	saisie: 1,
	nbRounds: parseInt(localStorage.getItem("nbRounds")),
}

nbRounds.innerText = donneesTransverses.nbRounds;
console.log("nb rounds " + donneesTransverses.nbRounds);

setDefaultLocale("totalCoups", 0);
let totalCoups = localStorage.getItem("totalCoups");
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

function nouvellePartie(zero) {
	if (zero) {
		score.innerText = 0;
		nbRounds.innerText = 0;
	};
	tableJeu.innerHTML = "";
	donneesTransverses.mot = unMotRandom();
console.log(donneesTransverses.mot);
    donneesTransverses.nbgrilleMot = donneesTransverses.mot.length;
    donneesTransverses.rangee = 0;
    donneesTransverses.saisie = 1;
    ligneGrille(donneesTransverses.mot, donneesTransverses.nbgrilleMot, donneesTransverses.rangee);
	coupsRestants.innerText = 5;
	return; 
}

    // fonction qui rentre les lettres deja trouvées dans la grille
function majGrid() {
    let i = donneesTransverses.rangee - 1;
    if (i >= 0) {
        let lettres = majligne();
        for (let j = i; j >= 0; j--) {
            const lignePrecedente = tableJeu.children[j];
            const elementsLP = lignePrecedente.children;
            for (let k = 1; k < donneesTransverses.nbgrilleMot; k++) {
                const element = elementsLP[k];
                if (element.classList.contains("rouge")) {
                    lettres[k].textContent = element.textContent;
                    lettres[k].classList.add("rouge"); // maj nouvelle ligne
                }
            }
        }
        for (let j = 1; j < donneesTransverses.nbgrilleMot; j++) {
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
		}
		else {
			div.textContent = ".";
		}
		ligne.appendChild(div);
	}
	document.getElementById("tableJeu").appendChild(ligne);
		// on incremente le compteur d'etage
	donneesTransverses.rangee += 1;
}

// on met d'office la première ligne si le compteur d'essais est au max.
if (donneesTransverses.rangee === 0) {
	bidule();
	nouvellePartie(true);}

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
    let lettres = majligne();
    if (/^[a-zA-Z]$/.test(key)){
        if (donneesTransverses.saisie < donneesTransverses.nbgrilleMot && donneesTransverses.saisie >= 1) {
            // on ajoute la nouvelle lettre dans la case + on augmente le compteur d'un
            lettres[donneesTransverses.saisie].innerText = ev.key.toUpperCase();
            bidule();
            donneesTransverses.saisie++;
        }
        ev.preventDefault();
        return;
    }
    switch (key) {
        case "Enter":
            // en cas de fin de mot + appui entrée
            if (donneesTransverses.saisie == donneesTransverses.nbgrilleMot) {
                compareMot();
                break;
            } 
            if (donneesTransverses.saisie < donneesTransverses.nbgrilleMot) {
                return;
            }
            break;
        case "Backspace":
            if (donneesTransverses.saisie == 1) {
				return;
			}
			else {
				// on remet un point sur la case et on réduit le compteur d'un
				lettres[donneesTransverses.saisie - 1].innerText = ".";
				donneesTransverses.saisie--;
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
			if (donneesTransverses.saisie == 1) {
				return;
			}
			else {
				// sinonon remet un point sur la case et on réduit le compteur d'un
				lettres[donneesTransverses.saisie - 1].innerText = ".";
				donneesTransverses.saisie--;
				return;
			}
		}
		// en cas de clic sur valider
		if (ev.target.classList.contains("fa-sign-in-alt")) {
			if (donneesTransverses.saisie < donneesTransverses.nbgrilleMot) {
				return;
			}
			if (donneesTransverses.saisie == donneesTransverses.nbgrilleMot) {
				compareMot();
				return;
			}
		}
			// en cas de saisie d'une lettre
		if (donneesTransverses.saisie < donneesTransverses.nbgrilleMot) {
			bidule();
			// on ajoute la nouvelle lettre dans la case et on augmente le compteur d'un
			lettres[donneesTransverses.saisie].innerText = ev.target.innerText;
			donneesTransverses.saisie++;
		}
	});
}

function bidule() {
	let lettres = majligne();
	let bidule = "";
	if (donneesTransverses.rangee >= 1) {
		for (let i = 0; i < lettres.length; i++) {
			bidule += lettres[i].textContent;
		}
		console.log(bidule);
		console.log(donneesTransverses.mot);
	}
	console.log("rangee " + donneesTransverses.rangee);
	console.log("saisie " + donneesTransverses.saisie);
}

	// on compare le mot saisi avec le mot du dictionnaire
function compareMot() {
	let lettres = majligne();
		// on concatène pour comparer les lettres de la grille et le mot du dictionnaire
	let motSaisi = "";
	for (let i = 0; i < lettres.length; i++) {
		motSaisi += lettres[i].textContent;
	}
	if (donneesTransverses.mot == motSaisi) {
		// on colore toutes les cases en rouge
		for (let i = 0; i < donneesTransverses.nbgrilleMot; i++) {
			lettres[i].classList.add("rouge");
            lettres[i].classList.remove("orange");
        }
		resetjeu(true)
		// et on relance un nouveau mot en augmentant le score de 1
		return;
	}
	else {
		// sinon on enleve un point de coups et on affiche le nb de coups restants
		coupsRestants.innerText = parseInt(coupsRestants.innerText) - 1;
		// on colore les lettres selon la règle
		for (let i = 0; i < donneesTransverses.nbgrilleMot; i++) {
			if (donneesTransverses.mot[i] == lettres[i].innerText) {
				lettres[i].classList.add("rouge");
                lettres[i].classList.remove("orange");
			}
			else if (donneesTransverses.mot.includes(lettres[i].innerText)) {
				lettres[i].classList.add("orange");
                lettres[i].classList.remove("rouge");
			}
		}
		// si le nombre de chances est fini :
		if (coupsRestants.innerText == 0) {
			console.log("perdu");
			// on affiche le bon mot
			for (let i = 0; i < donneesTransverses.nbgrilleMot; i++) {
				lettres[i].innerText = donneesTransverses.mot[i];
				lettres[i].classList.remove("orange");
				lettres[i].classList.add("rouge");
			}
			resetjeu(false);
			return;
		}
		else {
			console.log("un tour pas bon " + donneesTransverses.rangee);
			// et on relance la saisie sur une nouvelle ligne
			ligneGrille(donneesTransverses.mot, donneesTransverses.nbgrilleMot, donneesTransverses.rangee);
			donneesTransverses.saisie = 1;
            majGrid();
            console.log("nouvelle rangée ? " + donneesTransverses.rangee);
		}
	}
}

function resetjeu(gagne){
    if (gagne == true){
        // actions spécifiques gagné
		startConfetti();
        score.innerText = parseInt(score.innerText) + 1;
		alert("Victoire ! Vous avez trouvé le mot.");
		setTimeout(() => {
			console.log("pause 3s apres le mot");
			console.log("gagné ");
			},3000);
		donneesTransverses.nbRounds++;
		nbRounds.innerText = donneesTransverses.nbRounds;
		nbMotsTrouves.innerText = parseInt(nbMotsTrouves.innerText) + 1;
		localStorage.setItem("nbMotsTrouves", parseInt(nbMotsTrouves.innerText));
console.log("coups en localstorage"+ localStorage.getItem("totalCoups"));		
		let totalCoups = parseInt(localStorage.getItem("totalCoups")) + parseInt(donneesTransverses.rangee);
console.log("coups total "+ totalCoups);
console.log("nbRounds "+ donneesTransverses.nbRounds);
console.log("nbEssais 1 "+ nbEssais.innerText);
		nbEssais.innerText = parseFloat((totalCoups / donneesTransverses.nbRounds).toFixed(2));
console.log("nbEssais 2 "+ nbEssais.innerText);
		localStorage.setItem("totalCoups", totalCoups);
		localStorage.setItem("nbRounds", nbRounds.innerText);
    }
    else if (gagne == false){
        // actions spécifiques perdu
		nbParties.innerText = parseInt(nbParties.innerText) + 1;
		localStorage.setItem("nbParties", parseInt(nbParties.innerText));
		setTimeout(() => {
			console.log("pause 3s apres le mot");
			console.log("perdu ");
		},3000);
		if (window.confirm("Vous avez perdu, souhaitez vous lancer une nouvelle partie ?")){
			nouvellePartie(true);
			return;};
		alert("Perdu ! la partie est finie, merci d'avoir joué à MomoMotus !");
		window.location.href = "pagedaccueil.html";
		return;
    };
	
    // actions qui ont lieu toujours pour un nouveau mot
console.log("resetjeu globales");
    if (window.confirm("voulez-vous continuer ?")){
		nouvellePartie(false);
		bidule();
		return;
	};
	alert("la partie est finie, merci d'avoir joué à MomoMotus !");
	window.location.href = "pagedaccueil.html";
    }

function startConfetti() {
	const duration = 5000
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
		
		const particleCount = 200 * (timeLeft / duration);
		
		// since particles fall down, start a bit higher than random
		confetti(Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
			}));
		confetti(Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
			}));
		}, 250);
		}