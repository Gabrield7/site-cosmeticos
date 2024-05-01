const menuPrincipalDesktop = document.querySelector('.menu-principal__lista__desktop'); //div (ul) para inserir item
const menuPrincipalMobile = document.querySelector('.menu-principal__lista__mobile')
const body = document.querySelector('body');

export async function secoes(){
    const menu = await fetch('./backend/menu.json')
    return await menu.json() //retorna a lista "menu" do .json
}

export function admFundo(elemento, tela){
    let fundo = null;
    
    if(tela === 'desktop'){
        
        fundo = document.querySelector('.fundo__desktop');
        
        elemento.addEventListener('mouseover', ()=>{
            fundo.classList.remove('hidden')
        }) 
        elemento.addEventListener('mouseout', ()=>{
            fundo.classList.add('hidden')
        })

    }else{
        fundo = document.querySelector('.fundo__mobile')
        
        if(fundo.classList.contains('hidden')){
            closeMobileButton.classList.remove('hidden');
            fundo.classList.remove('hidden');
            body.style.overflow = 'hidden';
        }else{
            closeMobileButton.classList.add('hidden');
            fundo.classList.add('hidden');
            body.style.overflow = 'auto';
        }
    }

}

export async function insereItem(coluna, tela){
    //const dadosSecoes = await secoes()
    let items = ''

    coluna.items.forEach((item)=>{
        if(Object.keys(item).some(key => key === 'imagem')){ 
            items += `
            <il class='secao__lista__item__${tela}'>
                <a href='${item.link_item}' class='item__secao__banner__${tela}'>
                    <img src='${item.imagem}' alt='${item.imagem_descricao}' class='item__secao__banner__${tela}'>
                </a> 
            </il>
            `
        }else{
            items += `
            <il class='secao__lista__item__${tela}'>
                <a href='${item.link_item}' class='lista__item__link__${tela}'>${item.nome}</a>
            </il>
            `
        }
    })

    return items
}

export async function insereColuna(secao, tela){

    let listaColuna = '';
    
    for (const coluna of secao.colunas) {  
        const dadosItems = await insereItem(coluna, tela)

        listaColuna += `
        <ul class='secao__lista__${tela}'>
        <il class='secao__lista__titulo__${tela}'>${coluna.titulo_coluna}</il>
            ${dadosItems}
        </ul>
        `
    }

    return listaColuna
}

export async function insereSecao(tela){
    const dadosSecoes = await secoes()

    for (const secao of dadosSecoes.menu) {    //for...of itera de froma assíncrona ao contrário do forEach 

        const dadosColunas = await insereColuna(secao, tela); 
        const listSecoes = document.createElement('il');
        const listaItems = `menu-principal__lista__item__${tela}`;

        listSecoes.classList.add(listaItems);
        listSecoes.setAttribute('id', `${secao.id}-${tela}`)

        listSecoes.innerHTML += `
        <a href='${secao.link}' class='item__link__${tela}'>${secao.titulo}</a>
        <div class='item__secao__${tela}'>
            ${dadosColunas}
        </div>
        `
        if(tela === 'desktop'){
            menuPrincipalDesktop.appendChild(listSecoes);
        }else{
            menuPrincipalMobile.appendChild(listSecoes);
        }

    };

    const itemSecao = `.item__secao__${tela}`
    const itemLinkTopico = `.menu-principal__lista__item__${tela}`

    if(tela === 'desktop'){
        document.querySelectorAll(itemSecao).forEach((arr)=>{
            admFundo(arr, 'desktop');
        });
        
        document.querySelectorAll(itemLinkTopico).forEach((arr)=>{
            admFundo(arr, 'desktop');
        })

    }else{
        document.querySelectorAll(itemSecao).forEach((secao)=>{
            secao.classList.add('hidden'); //adiciona a classe hidden a todos os elementos 'secao'
        })
        
        document.querySelectorAll(itemLinkTopico).forEach((link)=>{
            link.addEventListener('click', () => {
                link.childNodes[3].classList.toggle('hidden') //acessa a nodeList que contém as seções a serem exibidas
            })
        })
    }

}

const closeMobileButton = document.querySelector('.menu-hamburguer__close')
const iconeHamburguer = document.querySelector('.cabecalho__menu-hamburguer')
const menuMobile = document.querySelector('.menu-principal__mobile')

const teste = document.getElementById('favoritos')

//carregar conteúdo do menu apenas quando o for aberto
let secaoInserida = false; 
iconeHamburguer.addEventListener('click', async ()=>{
    if(!secaoInserida){
        await insereSecao('mobile');
        secaoInserida = true
    }else{
        return
    }
    
})

//abrir menu hambúrguer
iconeHamburguer.onclick = () => {
    menuMobile.style.transform = 'translate(270px, 0)';
    admFundo('','mobile');
}
//fechar menu hambúrguer
closeMobileButton.onclick = () => {
    menuMobile.style.transform = 'translate(-270px, 0)';
    admFundo('','mobile');
}

//Para impedir que o menu fique aberto quando a tela mudar de tamanho
window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        menuMobile.style.transform = 'translate(-270px, 0)';
        document.querySelector('.fundo__mobile').classList.add('hidden');
        body.style.overflow = 'auto';
    }
});

