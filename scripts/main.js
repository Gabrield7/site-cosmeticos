import {sliderProdutos} from "./produtos.js";
import {insereSecao, menuHamburguer} from "./menu.js";

//MENU MOBILE
menuHamburguer();

//MENU DESKTOP
insereSecao('desktop');

//PRODUTOS
sliderProdutos();

//MODO DARK
const body = document.querySelector('body');
const darkToggle = document.getElementById('modo');

darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
});

