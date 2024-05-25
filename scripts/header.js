import {menuHamburguer} from "./menu.js";
const header = document.getElementById('header');

export function insereHeader(){
    header.innerHTML =
    `<nav class="cabecalho">
        <div class="nav__desktop">
            <div class="cabecalho__logo-pesquisa">
                <button type='button' class='cabecalho__menu-hamburguer' aria-label='menu hamburguer'></button>
                <a href="#" class='cabecalho__logo' aria-label='Logo da Harmony Haven'></a>
                <form class="pesquisa__form__desktop">
                    <input type="search" class="form__input" id='search-desktop' placeholder="Pesquisar">
                    <button aria-label='ícone de lupa' class="btn-pesquisar"></button>
                </form>
            </div>

            <div class="cabecalho__opcoes">
                <a href="#" class="cabecalho__opcoes__item" alt="ícone sol" id="modo"></a>
                <a href="#" class="cabecalho__opcoes__item" alt="ícone de usuário" id="usuario"></a>
                <a href="#" class="cabecalho__opcoes__item" alt="ícone de coração" id="favoritos"></a>
                <a href="#" class="cabecalho__opcoes__item" alt="ícone de sacola de compras" id="sacola"></a> 
            </div>
        </div>
            
        <form class="pesquisa__form__mobile">
            <input type="search" class="form__input" id='search-mobile' placeholder="Pesquisar">
            <button aria-label='ícone de lupa' class="btn-pesquisar"></button>
        </form>
    </nav>`;
    menuHamburguer();
}

