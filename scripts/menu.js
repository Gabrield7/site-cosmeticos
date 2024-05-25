const menuPrincipalDesktop = document.querySelector('.menu-principal__lista__desktop');
const menuPrincipalMobile = document.querySelector('.menu-principal__lista__mobile');

export async function secoes(){
    const menu = await fetch('./backend/menu.json')
    return await menu.json() //retorna a lista "menu" do .json
}

export function admFundo(elemento, tela){
    let fundo = null;
    
    if(tela === 'desktop'){
        
        fundo = document.querySelector('.fundo__desktop');
        
        elemento.addEventListener('mouseover', ()=>{
            fundo.classList.remove('hidden');
        }) 
        elemento.addEventListener('mouseout', ()=>{
            fundo.classList.add('hidden');
        })

    }else{
        fundo = document.querySelector('.fundo__mobile')
        
        if(fundo.classList.contains('hidden')){
            elemento.classList.remove('hidden');
            fundo.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }else{
            elemento.classList.add('hidden');
            fundo.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

export async function insereItem(coluna, tela){
    let items = '';

    coluna.items.forEach((item)=>{
        if(Object.keys(item).some(key => key === 'imagem')){ 
            items += 
            `<il class='secao__lista__item__${tela}'>
                <a href='${item.link_item}' class='item__secao__banner__${tela}'>
                    <img src='${item.imagem}' alt='${item.imagem_descricao}' class='item__secao__banner__${tela}'>
                </a> 
            </il>`
        }else{
            items += 
            `<il class='secao__lista__item__${tela}'>
                <a href='${item.link_item}' class='lista__item__link__${tela}'>${item.nome}</a>
            </il>`
        }
    });

    return items
}

export async function insereColuna(secao, tela){
    let listaColuna = '';
    
    for (const coluna of secao.colunas) {  
        const dadosItems = await insereItem(coluna, tela)

        listaColuna += 
        `<ul class='secao__lista__${tela}'>
            <il class='secao__lista__titulo__${tela}'>${coluna.titulo_coluna}</il>
            ${dadosItems}
        </ul>`
    }

    return listaColuna
}

export async function insereSecao(tela){
    const dadosSecoes = await secoes()
    let listSecoes = '';

    for (const secao of dadosSecoes.menu) {    //for...of itera de forma assíncrona ao contrário do forEach 
        const dadosColunas = await insereColuna(secao, tela); 

        let title = '';
        if(tela == 'mobile'){
            title =
            `<button aria-label='${secao.titulo}' class='item__link__${tela}'>
                <h2>${secao.titulo}</h2>
                <div class='item__link__seta'>
                    <span class='seta-1'></span>
                    <span class='seta-2'></span>
                </div>
            </button>`;
        }else{
            title = `<a href='${secao.link}' class='item__link__${tela}'>${secao.titulo}</a>`
        }

        listSecoes += `
        <il class='menu-principal__lista__item__${tela}' id='${secao.id}-${tela}'>
            ${title}
            <div class='item__secao__${tela}'>
                ${dadosColunas}
            </div>
        </il>`;
    };

    tela === 'desktop'? menuPrincipalDesktop.innerHTML = listSecoes:menuPrincipalMobile.innerHTML = listSecoes;

    //Lida com as espeficidades de cada tipo de seção (mobile ou desktop)
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
        document.querySelectorAll(itemLinkTopico).forEach((link)=>{
            const itemLinkMobile = link.querySelectorAll('.item__link__mobile');

            itemLinkMobile.forEach((item)=>{
                const itemSecaoMobile = Array.from(item.parentNode.querySelectorAll(itemSecao))[0];
                itemSecaoMobile.classList.add('hidden');

                const setas = item.querySelector('.item__link__seta');
                const seta1 = setas.querySelector('.seta-1');
                const seta2 = setas.querySelector('.seta-2');
                seta1.style.transform = 'translateX(2px) rotate(45deg)';
                seta2.style.transform = 'translateX(-2px) rotate(-45deg)';

                let selected = false;
                item.addEventListener('click', ()=>{
                    if(selected){
                        itemSecaoMobile.classList.add('hidden');
                        seta1.style.transform = 'translateX(2px) rotate(45deg)';
                        seta2.style.transform = 'translateX(-2px) rotate(-45deg)';
                        selected = false;  
                    }else{
                        itemSecaoMobile.classList.remove('hidden');
                        seta1.style.transform = 'translateX(-2px) rotate(45deg)';
                        seta2.style.transform = 'translateX(2px) rotate(-45deg)';
                        selected = true;
                    } 
                })
            })
            
        })
    }

}

export function menuHamburguer(){
    const iconeHamburguer = document.querySelector('.cabecalho__menu-hamburguer');
    const menuMobile = document.querySelector('.menu-principal__mobile');
    const closeMobileButton = document.querySelector('.menu-hamburguer__close');
    //carregar conteúdo do menu apenas quando o for aberto
    let secaoInserida = false; 
    iconeHamburguer.addEventListener('click', async ()=>{
        if(!secaoInserida){
            await insereSecao('mobile');
            secaoInserida = true
        }
    })

    //abrir menu hambúrguer
    iconeHamburguer.addEventListener('click', () => {
        menuMobile.style.transform = 'translate(270px, 0)';
        admFundo(closeMobileButton,'mobile');
    });

    //fechar menu hambúrguer
    closeMobileButton.addEventListener('click', () => {
        menuMobile.style.transform = 'translate(-270px, 0)';
        admFundo(closeMobileButton,'mobile');
    });
    document.querySelector('.fundo__mobile').addEventListener('click', ()=>{
        //fechar o menu também quando clicar fora dele
        menuMobile.style.transform = 'translate(-270px, 0)';
        admFundo(closeMobileButton,'mobile');
    })

    //Para impedir que o menu fique aberto quando a tela mudar de tamanho
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            menuMobile.style.transform = 'translate(-270px, 0)';
            document.querySelector('.fundo__mobile').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}


