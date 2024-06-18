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

export function avaliacao(nota) {
    const maxStars = 5;
    // Função auxiliar para gerar HTML de uma estrela
    const getStarHtml = (star) => {
        return `<div class='avaliacao__estrela'><img src='./imagens/icones/${star}.svg' alt='estrela' class='avaliacao__estrela__imagem'></div>`;
    }
    // Função para determinar o tipo de estrela com base na nota decimal
    const getStar = (decimal) => {
        if (decimal < 0.2) return 'estrela-vazia-verde';
        if (decimal < 0.5) return 'estrela-14-verde';
        if (decimal < 0.7) return 'estrela-12-verde';
        return 'estrela-34-verde';
    }
    // Parte inteira da nota
    const wholeStars = Math.trunc(nota);
    // Parte decimal da nota
    const decimalPart = nota - wholeStars;

    let starsHtml = '';
    // Adicionar estrelas cheias
    for (let i = 0; i < wholeStars; i++) {
        starsHtml += getStarHtml('estrela-cheia-verde');
    }
    // Adicionar uma estrela parcial ou vazia
    if (wholeStars < maxStars) {
        starsHtml += getStarHtml(getStar(decimalPart));
    }
    // Adicionar estrelas vazias até o máximo permitido
    const remainingStars = maxStars - wholeStars - 1;
    for (let i = 0; i < remainingStars; i++) {
        starsHtml += getStarHtml('estrela-vazia-verde');
    }

    return starsHtml;
}
//Função para arredondar preço
export function arredondarPreco(preco){
    return (Math.round(preco)-0.1)
}
//Função para formatar o preço na moeda local (R$)
export function formatarPreco(preco){
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
//Função que exibe o preço original do produto
export function precoOriginal(precoOriginal, desconto){
    return desconto === 0? "<div class='.div-substituicao-preco-desconto-zero'></div>" : "<p class='card-produto__preco-original'>"+formatarPreco(precoOriginal)+"</p>"
}
//Função que exibe ou não a etiqueta de desconto no card do produto
export function etiquetaDesconto(desconto){ 
    return desconto === 0? "" : "<a href='#' class='card-produto__desconto'>-"+desconto+"%</a>";
}
//Função que exibe o preço final formatado e com desconto
export function desconto(precoOriginal, desconto){
    const precoComDesconto = precoOriginal*(1-desconto/100);
    return "<p class='card-produto__com-desconto'>"+formatarPreco(arredondarPreco(precoComDesconto))+"</p>"
}
//Função que exibe o parcelamento da compra
export function parcelamento(parcelamento, precoOriginal, desconto){
    const precoComDesconto = precoOriginal*(1-desconto/100);
    const parcela = arredondarPreco(precoComDesconto)/(parcelamento);
    return "<p class='card-produto__parcelas'>"+parcelamento+"x de "+formatarPreco(parcela)+"</p>"
}
//Função que carrega os dados dos produtos no banco de dados
export async function produtos(){
    const response = await fetch('./backend/produtos.json');
    return await response.json(); //retorna a lista "produto" do .json
}     
//Função que insere os cards no DOM
export async function insereProdutos(id){
    //let cards = '';
    const dados = await produtos();
    const listKeys = Object.keys(dados.produtos[0]); //todos os objetos do.json tem as chaves iguais
    
    // Função para filtrar produtos por categoria
    const filtrados = (categoria) => { 
        return dados.produtos.filter(objeto => {
            // Verifica se alguma das chaves do objeto tem o valor igual à categoria
            return listKeys.some(key => objeto[key] === categoria); //.some verifica se algum dos itens do arrays obedece a condição repassada
        });
    }

    const getProductCard = (produto) => {
        return `
        <div class='card-produto__container'>    
            <div class='card-produto'>
                <div class='card-produto__container__imagem'>
                    <img src=${produto.caminho} alt=${produto.descricao} class='card-produto__imagem'>
                    <button type='button' alt='Favoritar' class='card-produto__fav'></button>
                    ${etiquetaDesconto(produto.desconto)}
                </div>
                <h2 class='card-produto__descricao'>${produto.descricao}</h2>
                <a href='#' class='card-produto__avaliacao'>
                    ${avaliacao(produto.nota)}
                    <span class='avaliacao__quantidade'>${produto.nota} - ${produto.avalicoes} avaliações</span>
                </a>  
                ${precoOriginal(produto.preco, produto.desconto)}
                ${desconto(produto.preco, produto.desconto)}           
                ${parcelamento(produto.parcelamento, produto.preco, produto.desconto)}
                <button type='button' class='card-produto__botao-add-sacola'>
                    <p class='botao-add-sacola__texto'>ADICIONAR</p>
                    <div alt='ícone de sacola de compras' class='botao-add-sacola__imagem'></div>
                </button>
            </div>
        </div>`;
    }

    // Filtra os produtos pela categoria fornecida e gera os cards
    const produtosFiltrados = filtrados(id);
    const cards = produtosFiltrados.map(produto => getProductCard(produto)).join('');

    return cards;
};

