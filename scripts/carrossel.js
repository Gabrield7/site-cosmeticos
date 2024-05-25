let SliderCount = 1;

document.getElementById('botao1').checked = true;

export function intervalo(){
    setInterval(() => {
        slider()
    }, 5000)
}

export function slider(){
    SliderCount++

    if(SliderCount > 5){
        SliderCount = 1
    }

    document.getElementById(`botao${SliderCount}`).checked = true;
}

//SLIDER DESTAQUE

const destaqueGlider = document.querySelector('.destaque__glider');

new Glider(destaqueGlider, {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: {
        prev: '.btn-prev__destaques',
        next: '.btn-next__destaques'
    },
    responsive: [
        // {
        //     breakpoint: 550,
        //     settings: {
        //         slidesToShow: 3,
        //         draggable: false
        //     }
        // },
        // {
        //     breakpoint: 1028,
        //     settings: {
        //         slidesToShow: 4,
        //         draggable: false
        //     }
        // },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 1350,
            settings: {
                slidesToShow: 3
            }
        }
    ]
});

// const controles = document.querySelectorAll(".control");
// let currentItem = 0;
// const items = document.querySelectorAll('.destaque__spot');
// const maxItens = items.length;

// controles.forEach(control =>{
//     control.addEventListener('click', () => {

//         const isLeft = control.classList.contains('arrow-left');
//         if(isLeft){
//             currentItem -= 2;
//         } else{
//             currentItem += 2;
//         }

//         if(currentItem >= maxItens){
//             currentItem = maxItens - 1;
//         }

//         if(currentItem <0){
//             currentItem = 0
//         }
        
//         items.forEach((slide) => slide.classList.remove('primeiro-slide'))

//         items[currentItem].scrollIntoView({
//             inline: "center",
//             behavior: "smooth",
//             block: "nearest"
//         })

//         items[currentItem].classList.add('primeiro-slide');
//     })
// });
