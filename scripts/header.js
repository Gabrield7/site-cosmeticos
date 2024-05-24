import {menuHamburguer} from "./menu.js";
const header = document.getElementById('header');

export function insereHeader(){
    header.innerHTML =
    `<nav class="cabecalho">
        <div class="nav__desktop">
            <div class="cabecalho__logo-pesquisa">
                <button type='' class='cabecalho__menu-hamburguer' aria-label='menu hamburguer'></button>
                <a href="#">
                    <button class="cabecalho__logo-button" aria-label="Harmony Haven">
                        <!-- atribuir img ao button pelo js para add modo dark -->
                        <img src="../imagens/icones/logo_completa-verde.svg" alt="Logo da Hermony Haven">
                    </button>
                </a>

                <div class="cabecalho__pesquisa">
                    <form class="cabecalho__pesquisa__form">
                        <input type="search" class="pesquisa__form__input" placeholder="Pesquisar">
                    </form>
                    <button aria-label='Pesquisar' class="cabecalho__pesquisa__pesquisar">
                        <!-- atribuir img ao button pelo js para add modo dark (?)-->
                        <img src="./imagens/icones/lupa-branco.svg" alt="ícone de lupa" class="cabecalho__pesquisa__lupa">
                    </button>
                </div>
            </div>

            <div class="cabecalho__opcoes">
                <a href="#" class="cabecalho__opcoes__item" alt="ícone sol" id="modo"></a>
                <a href="#" class="cabecalho__opcoes__item" alt="ícone de usuário" id="usuario"></a>
                <a href="#" class="cabecalho__opcoes__item" alt="ícone de coração" id="favoritos"></a>
                <a href="#" class="cabecalho__opcoes__item" alt="ícone de sacola de compras" id="sacola"></a> 
            </div>
        </div>
            
        <div class="pesquisa__mobile">
            <form class="pesquisa__form__mobile">
                <input type="search" class="form__input__mobile" placeholder="Pesquisar">
            </form>
            <button aria-label='Pesquisar' class="pesquisa__pesquisar__mobile">
                <!-- atribuir img ao button pelo js para add modo dark (?)-->
                <img src="./imagens/icones/lupa-branco.svg" alt="ícone de lupa" class="pesquisa__lupa__mobile">
            </button>
        </div>
    </nav>`;
    menuHamburguer();
}


