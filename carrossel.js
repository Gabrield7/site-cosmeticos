//SLIDER MENU
let rolManual = document.querySelector('.botao-manual');
let SliderCount = 1;

document.getElementById('botao1').checked = true;

setInterval(() => {
    slider()
}, 5000)

function slider(){
    SliderCount++

    if(SliderCount > 5){
        SliderCount = 1
    }

    document.getElementById(`botao${SliderCount}`).checked = true;
}

//SLIDER DESTAQUE

const controles = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll('.destaque__spot');
const maxItens = items.length;

controles.forEach(control =>{
    control.addEventListener('click', () => {

        const isLeft = control.classList.contains('arrow-left');
        if(isLeft){
            currentItem -= 2;
        } else{
            currentItem += 2;
        }

        if(currentItem >= maxItens){
            currentItem = maxItens - 1;
        }

        if(currentItem <0){
            currentItem = 0
        }
        
        items.forEach((slide) => slide.classList.remove('primeiro-slide'))

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth",
            block: "nearest"
        })

        items[currentItem].classList.add('primeiro-slide');
    })
});

//SLIDER PRODUTOS

const controlesProdutos = document.querySelectorAll(".control-produtos");
let currentItemProdutos = 0;
const itemsProdutos = document.querySelectorAll('.card-produto');
const maxItensProdutos = itemsProdutos.length;