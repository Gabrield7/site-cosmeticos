import {headerScroll, headerTimer} from "./header.js";

const body = document.querySelector('body');
const menuPrincipalDesktop = document.querySelector('.menu-principal__lista__desktop');
const menuPrincipalMobile = document.querySelector('.menu-principal__lista__mobile');

// Busca as seções do menu a partir de um arquivo JSON
export async function fetchMenuSections(){
    const menu = await fetch('./backend/menu.json')
    return await menu.json() //retorna a lista "menu" do .json
}

// Administra a forma de apariçao do fundo para os tiposd e tela (Desktop e Mobile)
export function manageBackground(element, tela) {
    const fundo = tela === 'desktop' ? document.querySelector('.fundo__desktop') : document.querySelector('.fundo__mobile');
  
    if (tela === 'desktop') {
        addHoverListeners(element, fundo);
    } else {
        toggleMobileBackground(element, fundo);
    }
}
  
// Adiciona ouvintes de eventos de mouseover e mouseout para exibir e esconder o fundo no desktop
function addHoverListeners(element, background) {
    element.addEventListener('mouseover', () => {
      background.classList.remove('hidden');
    });
  
    element.addEventListener('mouseout', () => {
      background.classList.add('hidden');
    });
}
  
// Alterna a exibição do fundo no mobile e ajusta o overflow do body
function toggleMobileBackground(element, background) {
    const isHidden = background.classList.contains('hidden');
    element.classList.toggle('hidden', !isHidden);
    background.classList.toggle('hidden', !isHidden);
    body.style.overflow = isHidden ? 'hidden' : 'auto';
}

// Gera HTML para itens em uma coluna com base na tela (Desktop ou Mobile)
export async function insereItem(coluna, tela) {
    return coluna.items.map(item => {
        if (item.imagem) {
            return `
            <li><a href='${item.link_item}' class='secao__lista__item__${tela}'>
                <img src='${item.imagem}' alt='${item.imagem_descricao}' class='item__secao__banner__${tela}'>
            </a></li>`;
        } else {
            return `
            <li><a href='${item.link_item}' class='secao__lista__item__${tela}'>
                ${item.nome}
            </a></li>`;
        }
    }).join('');
}

// Gera HTML para colunas em uma seção com base na tela (Desktop ou Mobile)
export async function insereColuna(secao, tela) {
    const columnsHTML = await Promise.all(
        secao.colunas.map(async column => {
        const itemsHTML = await insereItem(column, tela);
        
        return `
            <ul class='secao__lista__${tela}'>
                <li class='secao__lista__titulo__${tela}'>${column.titulo_coluna}</li>
                ${itemsHTML}
            </ul>`;
        })
    );
  
    return columnsHTML.join('');
}

// Gera HTML para seções com base na tela (Desktop ou Mobile) e insere no DOM
export async function insereSecao(tela){
    const sectionsData = await fetchMenuSections();
    const sectionsHTML = await Promise.all(sectionsData.menu.map(async section => {
        const columnsHTML = await insereColuna(section, tela);
        const titleHTML = tela === 'mobile' ? `
            <button aria-label='${section.titulo}' class='item__link__${tela}'>
            <h2>${section.titulo}</h2>
            <div class='item__link__seta'>
                <span class='seta-1'></span>
                <span class='seta-2'></span>
            </div>
            </button>` : `
            <a href='${section.link}' class='item__link__${tela}'>${section.titulo}</a>`;
    
        return `
            <li class='menu-principal__lista__item__${tela}' id='${section.id}-${tela}'>
            ${titleHTML}
            <div class='item__secao__${tela}'>
                ${columnsHTML}
            </div>
            </li>`;
    }));
  
    const menuPrincipal = tela === 'desktop' ? menuPrincipalDesktop : menuPrincipalMobile;
    menuPrincipal.innerHTML = sectionsHTML.join('');
  
    if (tela === 'desktop') {
      createDesktopBackground();
    }
  
    handleSectionSpecifics(tela);
}

function createDesktopBackground() {
    const fundoDesktop = document.createElement('li');
    fundoDesktop.className = 'fundo__desktop hidden';
    menuPrincipalDesktop.appendChild(fundoDesktop);
}
  
// Lida com as especificidades de cada tipo de seção (mobile ou desktop)
function handleSectionSpecifics(screenType) {
    const itemSectionSelector = `.menu-principal__lista__item__${screenType}`;
    const itemLinkSelector = `.menu-principal__lista__item__${screenType}`;

    if (screenType === 'desktop') {
        document.querySelectorAll(itemSectionSelector).forEach(item => manageBackground(item, 'desktop'));
        document.querySelectorAll(itemLinkSelector).forEach(item => manageBackground(item, 'desktop'));
    } else {
        document.querySelectorAll(itemLinkSelector).forEach(link => {
            link.querySelectorAll('.item__link__mobile').forEach(item => setupMobileItemToggle(item));
        });
    }
}
  
// Configura o comportamento de alternância para itens no mobile
function setupMobileItemToggle(item) {
    const itemSectionMobile = item.parentNode.querySelector('.item__secao__mobile');
    itemSectionMobile.classList.add('hidden');

    const setas = item.querySelector('.item__link__seta');
    const seta1 = setas.querySelector('.seta-1');
    const seta2 = setas.querySelector('.seta-2');
    seta1.style.transform = 'translateX(2px) rotate(45deg)';
    seta2.style.transform = 'translateX(-2px) rotate(-45deg)';

    let isSelected = false;
    item.addEventListener('click', () => {
        isSelected = !isSelected;
        itemSectionMobile.classList.toggle('hidden', !isSelected);
        seta1.style.transform = isSelected ? 'translateX(-2px) rotate(45deg)' : 'translateX(2px) rotate(45deg)';
        seta2.style.transform = isSelected ? 'translateX(2px) rotate(-45deg)' : 'translateX(-2px) rotate(-45deg)';
    });
}

let menuOpen = false;
export function isMenuOpen(){
    return menuOpen
}

export function menuHamburguer(){
    const iconeHamburguer = document.querySelector('.cabecalho__menu-hamburguer');
    const menuMobile = document.querySelector('.menu-principal__mobile');
    const closeMobileButton = document.querySelector('.menu-hamburguer__close');
    const fundoMobile = document.querySelector('.fundo__mobile');
    let secaoInserida = false; 

    // Função para abrir o menu hambúrguer
    const abrirMenu = () => {
        menuMobile.style.transform = 'translate(270px, 0)';
        manageBackground(closeMobileButton, 'mobile');
        headerScroll(true);
        menuOpen = true;
    }
    // Função para fechar o menu hambúrguer
    const fecharMenu = () => {
        menuMobile.style.transform = 'translate(-270px, 0)';
        manageBackground(closeMobileButton, 'mobile');
        menuOpen = false;
        headerTimer();
    }

    iconeHamburguer.addEventListener('click', async () => {
        if (!secaoInserida) {
            await insereSecao('mobile');
            secaoInserida = true;
        }
        abrirMenu();
    });
    
    closeMobileButton.addEventListener('click', (e) => {
        e.preventDefault();
        fecharMenu();
    });
    
    fundoMobile.addEventListener('click', (e) => {
        e.preventDefault();
        fecharMenu();
    });

    //Para impedir que o menu fique aberto quando a tela mudar de tamanho
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            menuMobile.style.transform = 'translate(-270px, 0)';
            document.querySelector('.fundo__mobile').classList.add('hidden');
            body.style.overflow = 'auto';
        }
    });
}

