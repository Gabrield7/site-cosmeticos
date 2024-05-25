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

//MODO DARK
const body = document.querySelector('body');
const darkToggle = document.getElementById('modo');

darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
});


