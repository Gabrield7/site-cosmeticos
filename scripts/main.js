import {headerShadow, headerScroll, headerMouse} from "./header.js";
import {sliderProdutos} from "./produtos.js";
import {insereSecao, menuHamburguer} from "./menu.js";
import {submitForm} from "./submit-forms.js";

const body = document.querySelector('body');

//HEADER
headerScroll(false);
headerMouse();

//MENU MOBILE
menuHamburguer();

//MENU DESKTOP
insereSecao('desktop');

//PRODUTOS
sliderProdutos();

//VALIDAÇÃO FORMULÁRIO
submitForm();

//MODO DARK
const darkToggle = document.getElementById('modo');

darkToggle.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.toggle('dark');
    headerShadow(window.scrollY);
});

