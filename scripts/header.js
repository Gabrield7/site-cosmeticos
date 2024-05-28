// import {body} from "./main.js";
import {isMenuOpen} from "./menu.js";

const body = document.querySelector('body');

const cabecalho = document.querySelector('.cabecalho');
const cabecalhoPlaceholder = document.querySelector('.cabecalho-placeholder');
cabecalho.style.display = 'flex';

export function headerShadow(scroll){
    //document.addEventListener('DOMContentLoaded', () => {
        let color = body.classList.contains('dark')? 255:0;
        if(scroll === 0){
            cabecalho.style.boxShadow = 'none';  
        }else{
            cabecalho.style.boxShadow = `0 4px 8px 0 rgba(${color}, ${color}, ${color}, 0.2)`;
        }
    //});
    
}

let timerHeader;
let timerDisplay;
let scrollListenerAdded = false;
let mouseOver = false;

export function headerTimer(){
    clearTimeout(timerHeader); //zerar o temporizador ativado na rolagem anterior, caso não tenha encerrado
    clearTimeout(timerDisplay);

    let currentScrollY = window.scrollY;
    cabecalho.style.opacity = '1';
    cabecalho.style.display = 'flex';
    cabecalhoPlaceholder.style.display = 'none';

    if(currentScrollY === 0){
        headerShadow(currentScrollY); 
    }else{
        headerShadow(currentScrollY);
        // headerDisplay
        if(!mouseOver && !isMenuOpen()){ //garante que o timer será aciona somente quando o mouseout = true e menu não estiver aberto
            timerHeader = setTimeout(()=>{
                cabecalho.style.opacity = '0';  
                timerDisplay = setTimeout(() => {
                    cabecalho.style.display = 'none';
                    cabecalhoPlaceholder.style.display = 'block';
                }, 1000);
            }, 5000);
        }
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
        //const event = !keep? 'scroll':'click';
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


