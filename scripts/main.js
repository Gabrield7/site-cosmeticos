import {intervalo} from "./carrossel.js";
import {sliderProdutos} from "./produtos.js";
import {insereHeader} from "./header.js";
import {insereSecao} from "./menu.js";

//HEADER
insereHeader();

//MENU DESKTOP
insereSecao('desktop');

//CARROSEL PRINCIPAL
intervalo();

//PRODUTOS
sliderProdutos();

const body = document.querySelector('body');

const dark = document.getElementById('modo');
const user = document.getElementById('usuario');
const fav = document.getElementById('favoritos');
const sacola = document.getElementById('sacola')

// darkModeButton.addEventListener('click', () => {
//     const currentImage = darkModeButton.style.backgroundImage;
//     if (currentImage.includes('dark-mode-verde.svg')) {
//         darkModeButton.style.backgroundImage = 'url("../imagens/icones/dark-mode-branco.svg")';
//     } else {
//         darkModeButton.style.backgroundImage = 'url("../imagens/icones/dark-mode-verde.svg")';
//     }
// });

dark.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    dark.classList.toggle('dark');
    user.classList.toggle('dark');
    fav.classList.toggle('dark');
    sacola.classList.toggle('dark');
});


