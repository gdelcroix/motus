document.addEventListener('DOMContentLoaded', () => {
    const listeMots = [AALENIEN,ABAISSEE];
    const mot = listeMots[Math.floor(Math.random()*listeMots.length)];
    console.log(mot);


});

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
