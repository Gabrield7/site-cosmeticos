import {intervalo} from "./carrossel.js"
import {distribuiProdutos} from "./produtos.js"
import {insereSecao} from "./menu.js"

//MENU DESKTOP
insereSecao('desktop');

//CARROSEL PRINCIPAL
intervalo();

//PRODUTOS
distribuiProdutos();

// const darkModeButton = document.getElementById('modo')
// const body = document.querySelector('body')

// darkModeButton.addEventListener('click', () => {
//     const currentImage = darkModeButton.style.backgroundImage;
//     if (currentImage.includes('dark-mode-verde.svg')) {
//         darkModeButton.style.backgroundImage = 'url("../imagens/icones/dark-mode-branco.svg")';
//     } else {
//         darkModeButton.style.backgroundImage = 'url("../imagens/icones/dark-mode-verde.svg")';
//     }
// });

// darkModeButton.addEventListener('click', () => {
//     darkModeButton.classList.toggle('dark')
//     body.classList.toggle('dark')
// });


