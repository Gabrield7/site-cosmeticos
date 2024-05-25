const slider = document.querySelectorAll('.slider__produtos');

//itera assincronicamente
for(let element of slider){
    const id = element.getAttribute('id');
    const produto = await insereProdutos(id);
    //console.log(produto)
    element.innerHTML = `
        <div class='produtos__container__slider'>${produto}</div>
        <button aria-label='Anterior' class='btn-prev' id='btn-prev__${id}'>❮</button>
        <button aria-label='Próximo' class='btn-next' id='btn-next__${id}'>❯</button>`;
};

const produtoContainerSlider = document.querySelectorAll('.produtos__container__slider');
//função para aplicar o slide aos cards
export function sliderProdutos(){
    produtoContainerSlider.forEach(slide=>{
        const id = slide.parentNode.getAttribute('id')
        new Glider(slide, {
            slidesToShow: 2,
            slidesToScroll: 1,
            draggable: true,
            dragVelocity: 1,
            arrows: {
                prev: `#btn-prev__${id}`,
                next: `#btn-next__${id}`
            },
            responsive: [
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 3,
                        draggable: false
                    }
                },
                {
                    breakpoint: 1028,
                    settings: {
                        slidesToShow: 4,
                        draggable: false
                    }
                },
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 5,
                        draggable: false
                    }
                },
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 6,
                        draggable: false
                    }
                }
            ]
        });
    });
}

export function avaliacao(nota){
    let stars = ''
    let countStars = 0;
    let star = function(estrela){
        return "<div class='avalicao__estrela'><img src='./imagens/icones/"+estrela+".svg' alt='estrela' class='avaliacao__estrela__imagem'></div>";
    }
    const starInteiro = Math.trunc(nota);
    const resto = nota - starInteiro;
    const maxStars = 5;

    for(let i = 0; i < starInteiro; i++){
        stars += star('estrela-cheia-verde');
        countStars++   
    }

    if (resto >= 0 && resto < 0.2) {
        stars += star('estrela-vazia-verde');
        countStars++   
    } else if (resto >= 0.2 && resto < 0.5) {
        stars += star('estrela-14-verde');
        countStars++   
    } else if (resto >= 0.5 && resto < 0.7) {
        stars += star('estrela-12-verde');
        countStars++   
    } else if (resto >= 0.7 && resto < 1) {
        stars += star('estrela-34-verde');
        countStars++   
    } else{
        stars += star('estrela-vazia-verde');
        countStars++   
    }

    if(countStars == maxStars){
        return stars;
    }else{
        for(let i = 0; i < maxStars - countStars; i++){
            stars += star('estrela-vazia-verde');
        }
        return stars
    } 
}

export function arredondarPreco(preco){
    return (Math.round(preco)-0.1)
}

export function formatarPreco(preco){
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function precoOriginal(precoOriginal, desconto){
    if(desconto === 0){
        return "<div class='.div-substituicao-preco-desconto-zero'></div>"
    }else{
        return "<p class='card-produto__preco-original'>"+formatarPreco(precoOriginal)+"</p>"
    }
}

export function etiquetaDesconto(desconto){ 
    if(desconto === 0){
        return ""
    }else{
        return "<a href='#' class='card-produto__desconto'>-"+desconto+"%</a>"
    }
}

export function desconto(precoOriginal, desconto){
    const precoComDesconto = precoOriginal*(1-desconto/100);
    return "<p class='card-produto__com-desconto'>"+formatarPreco(arredondarPreco(precoComDesconto))+"</p>"
}

export function parcelamento(parcelamento, precoOriginal, desconto){
    const precoComDesconto = precoOriginal*(1-desconto/100);
    const parcela = arredondarPreco(precoComDesconto)/(parcelamento);
    return "<p class='card-produto__parcelas'>"+parcelamento+"x de "+formatarPreco(parcela)+"</p>"

}

export async function produtos(){
    const response = await fetch('./backend/produtos.json');
    return await response.json(); //retorna a lista "produto" do .json
}     

export async function insereProdutos(id){
    let cards = '';
    const dados = await produtos();
    const listKeys = Object.keys(dados.produtos[0]); //todos os objetos do.json tem as chaves iguais

    function filtrados(categoria){ 
        return dados.produtos.filter(objeto => {
            // Verifica se alguma das chaves do objeto tem o valor igual à categoria
            return listKeys.some(key => objeto[key] === categoria); //.some verifica se algum dos itens do arrays obedece a condição repassada
        });
    }
    
    filtrados(id).forEach(objeto=>{
        cards += `
        <div class='card-produto__container'>    
            <div class='card-produto'>
                <div class='card-produto__container__imagem'>
                    <img src=${objeto.caminho} alt=${objeto.descricao} class='card-produto__imagem'>
                    <button type='button' alt='Favoritar' class='card-produto__fav'></button>
                    ${etiquetaDesconto(objeto.desconto)}
                </div>
                <h2 class='card-produto__descricao'>${objeto.descricao}</h2>
                <a href='#' class='card-produto__avaliacao'>
                    ${avaliacao(objeto.nota)}
                    <span class='avaliacao__quantidade'>${objeto.nota} - ${objeto.avalicoes} avaliações</span>
                </a>  
                ${precoOriginal(objeto.preco, objeto.desconto)}
                ${desconto(objeto.preco, objeto.desconto)}           
                ${parcelamento(objeto.parcelamento, objeto.preco, objeto.desconto)}
                <button type='button' class='card-produto__botao-add-sacola'>
                    <p class='botao-add-sacola__texto'>ADICIONAR</p>
                    <div alt='ícone de sacola de compras' class='botao-add-sacola__imagem'></div>
                </button>
            </div>
        </div>`;

    });
    return cards;
};

