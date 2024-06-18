import { isMenuOpen } from "./menu.js";

const body = document.querySelector('body'); 
const cabecalho = document.querySelector('.cabecalho');
const cabecalhoPlaceholder = document.querySelector('.cabecalho-placeholder');
cabecalho.style.display = 'flex';

// Variáveis de controle para temporizadores e estado do cabeçalho
let timerHeader;
let timerDisplay;
let scrollListenerAdded = false;
let mouseOver = false;

// Obtém a cor base dependendo se o tema atual é "dark" ou não
function getColor() {
    return body.classList.contains('dark') ? 255 : 0;
}

// Define a sombra do cabeçalho com base na posição de rolagem
function setBoxShadow(scroll) {
    const color = getColor();
    cabecalho.style.boxShadow = scroll === 0 ? 'none' : `0 4px 8px 0 rgba(${color}, ${color}, ${color}, 0.2)`;
}

// Esconde o cabeçalho com uma animação de opacidade e, após um tempo, altera sua exibição para "none"
function hideHeader() {
    cabecalho.style.opacity = '0';
    timerDisplay = setTimeout(() => {
        cabecalho.style.display = 'none';
        cabecalhoPlaceholder.style.display = 'block';
    }, 1000);
}

// Reseta todos os temporizadores ativos, evitando ações indesejadas
function resetTimers() {
    clearTimeout(timerHeader);
    clearTimeout(timerDisplay);
}

// Mostra o cabeçalho imediatamente, alterando sua opacidade e estilo de exibição
function showHeader() {
    cabecalho.style.opacity = '1';
    cabecalho.style.display = 'flex';
    cabecalhoPlaceholder.style.display = 'none';
}

// Garante que o cabeçalho seja visível e ajusta sua sombra com base na rolagem atual
function headerTimer() {
    resetTimers();
    const currentScrollY = window.scrollY;
    showHeader();
    setBoxShadow(currentScrollY);

    if (currentScrollY !== 0 && !mouseOver && !isMenuOpen()) {
        timerHeader = setTimeout(hideHeader, 5000);
    }
}

// Mantém o cabeçalho visível resetando qualquer temporizador de ocultação e mostrando o cabeçalho
function headerKeep() {
    resetTimers();
    showHeader();
}

// Adiciona um ouvinte de evento de rolagem para controlar a visibilidade do cabeçalho
function headerScroll(keep) {
    if (!scrollListenerAdded) {
        window.addEventListener('scroll', headerTimer);
        scrollListenerAdded = true;
    }

    if (keep) {
        headerKeep();
    }
}

// Função auxiliar para garantir que o cabeçalho permaneça visível enquanto o mouse estiver sobre ele
function handleMouseOver() {
    mouseOver = true;
    headerKeep();
}

// Função auxiliar para permitir que o temporizador de ocultação do cabeçalho seja ativado novamente
function handleMouseOut() {
    mouseOver = false;
    headerTimer();
}

// Adiciona ouvintes de evento "mouseover" e "mouseout" ao cabeçalho e ao placeholder
function headerMouse() {
    cabecalho.addEventListener('mouseover', handleMouseOver);
    cabecalho.addEventListener('mouseout', handleMouseOut);
    cabecalhoPlaceholder.addEventListener('mouseover', handleMouseOver);
    cabecalhoPlaceholder.addEventListener('mouseout', handleMouseOut);
}

// Adiciona ouvintes de evento necessários quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    headerTimer();
    headerMouse();
});

export {setBoxShadow, hideHeader, headerTimer, headerKeep, headerScroll, headerMouse};

/*import {isMenuOpen} from "./menu.js";

const body = document.querySelector('body');

const cabecalho = document.querySelector('.cabecalho');
const cabecalhoPlaceholder = document.querySelector('.cabecalho-placeholder');
cabecalho.style.display = 'flex';

export function headerShadow(scroll){
    let color = body.classList.contains('dark')? 255:0;
    if(scroll === 0){
        cabecalho.style.boxShadow = 'none';  
    }else{
        cabecalho.style.boxShadow = `0 4px 8px 0 rgba(${color}, ${color}, ${color}, 0.2)`;
    }
    
}

let timerHeader;
let timerDisplay;
let scrollListenerAdded = false;
let mouseOver = false;
let touchActive = false;

export function hideHeader(){
    cabecalho.style.opacity = '0';  
    timerDisplay = setTimeout(() => {
        cabecalho.style.display = 'none';
        cabecalhoPlaceholder.style.display = 'block';
    }, 1000);

}

export function headerTimer(){
    clearTimeout(timerHeader); //zerar o temporizador ativado na rolagem anterior, caso não tenha encerrado
    clearTimeout(timerDisplay);

    let currentScrollY = window.scrollY;
    cabecalho.style.opacity = '1';
    cabecalho.style.display = 'flex';
    cabecalhoPlaceholder.style.display = 'none';

    headerShadow(currentScrollY); 
    if(currentScrollY !== 0 && !mouseOver && !isMenuOpen()){ //garante que o timer será acionado somente quando o mouseout = true e menu não estiver aberto
        timerHeader = setTimeout(hideHeader, 5000);
    }
}

export function headerKeep(){
    clearTimeout(timerHeader);
    clearTimeout(timerDisplay);
    cabecalho.style.display = 'flex';
    cabecalho.style.opacity = '1';
    cabecalhoPlaceholder.style.display = 'none';
}

export function headerScroll(keep){
    if(!scrollListenerAdded){
        window.addEventListener('scroll', headerTimer);
        scrollListenerAdded = true; //Para garantir que o ouvinte de evento seja chamado apenas uma vez
    }

    if(keep){ //para garantir que o header ficará continuamente ativo na tela quando keep == true;
        headerKeep();
    }

}
export function headerMouse(){
    cabecalho.addEventListener('mouseover', () => {
        mouseOver = true;
        headerKeep();
    });
    cabecalho.addEventListener('mouseout', () => {
        mouseOver = false;
        headerTimer();
    });

    cabecalhoPlaceholder.addEventListener('mouseover', () => {
        mouseOver = true;
        headerKeep();
    });
    cabecalhoPlaceholder.addEventListener('mouseout', () => {
        mouseOver = false;
        headerTimer();
    });
}

document.addEventListener('DOMContentLoaded', () => { //Quando todo o conteúdo do DOM carregar (ao carregar a página), a função headerTimer será acionada
    headerTimer();
});

*/
