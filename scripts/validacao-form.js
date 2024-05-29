const form = document.querySelector('.formulario')
const formContainer= document.querySelector('.formulario__container-grid');
const formularioOk = document.querySelector('.formulario__cadastro-ok');
const formInput = document.querySelectorAll('.formulario__campo__input');

const mensagens = {
    form_nome: {
        valueMissing: "Campo obrigatótio",
        patternMismatch: "Nome inválido",
        tooShort: "Nome inválido"
    },
    form_email: {
        valueMissing: "Campo obrigatótio",
        typeMismatch: "E-mail inválido",
        tooShort: "E-mail inválido",
        patternMismatch: "E-mail inválido"
    },
    form_celular: {
        typeMismatch: "Telefone inválido",
        tooShort: "Telefone inválido"
    }
}

formContainer.addEventListener('submit', (e)=>{
    e.preventDefault(); //evita a página recarregar ao submeter formulário
    
    const formulario = {
        "nome": e.target.elements["form_nome"].value,
        "email": e.target.elements["form_email"].value,
        "celular": e.target.elements["form_celular"].value.replace(/\D/g, "") //reformartar numero de telefone
    }
    
    localStorage.setItem('formulario', JSON.stringify(formulario));//transforma o objeto (JSON) em string e armazena na localStorage

    form.style.display = 'none';
    formularioOk.style.display = 'flex';
});

formInput.forEach(input=>{
    input.addEventListener('invalid', (e)=>e.preventDefault()) //impede de aparecer mensagem padrão de campo inválido
    validaEmail(input);
    validaTelefone(input);
    input.addEventListener('blur', ()=>{
        
        let mensagem = '';
        for(let fieldsetName in mensagens){
            //console.log(input.id)
            if(input.id == fieldsetName){ 
                Object.keys(mensagens[fieldsetName]).forEach(erro => {
                    console.log(mensagens[fieldsetName]);
                    console.log(mensagens[fieldsetName][erro]);
                    console.log(input.validity[erro])
                    if(input.validity[erro]){
                        mensagem = mensagens[fieldsetName][erro];//campo.validity é o ValidityState, que exibe possíveis erros de validação que ocorrem automaticamente quando interagimos com esse formulário
                    }
                });
            }

        }
        //console.log(mensagem);
        const mensagemError = input.parentNode.querySelector('.mensagem-erro');
        const checkError = input.checkValidity(); //verifica a validade do campo (se contém algum erro, retorna 'false', se não há erros, retorna 'true')
        !checkError? mensagemError.textContent = mensagem:mensagemError.textContent = '';
    });
});

function validaEmail(input){
    if(input.id === 'form_email'){
        input.addEventListener('blur', ()=>{
            input.setCustomValidity('')
            const emailRegex = /\S+@\S+\.\S+/;
            if(!input.value.match(emailRegex)){
                const erro = 'Formato de e-mail inválido';
                input.setCustomValidity(erro);
                mensagens[input.id]['customError'] = erro;
            }else{
                input.setCustomValidity('')
                delete mensagens[input.id]['customError'];
            }
            console.log(mensagens[input.id])
        });
    }
}

function validaTelefone(input){  
    if(input.id === 'form_celular'){
        input.addEventListener('keypress', (e)=>{ //impede que o campo receba caracteres especiais ou letras
            if(!checkChar(e)){
                e.preventDefault();
            }
        });

        input.addEventListener('paste', ()=>{//
            const pattern = new RegExp('[0-9]');
            setTimeout(()=>{ //adicionado delay paraq ue a função tenha tempo de processar
                if(!input.value.match(pattern)){
                    input.value = '';
                }
            }, 10); 
        })

        input.addEventListener('blur', ()=>{ //coloca número de telefone no formato '(xx) xxxxx-xxxx'
            const celularFormatado = input.value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            console.log(input.value.length)
            if(input.value.length < 11 && input.value.length !== 0){
                const erro = 'Telefone inválido';
                input.setCustomValidity(erro);
                mensagens[input.id]['customError'] = erro;
                console.log(mensagens[input.id]);
            }else{
                input.setCustomValidity('')
                delete mensagens[input.id]['customError'];
                input.value = celularFormatado;
            }
        })

        input.addEventListener('focus', () => { //retorna o formato de telefone como ele foi digitado ogirinalmente
            const celularFormatado  = input.value.replace(/\D/g, "");
            input.value = celularFormatado;
        });
    }
    
}

function checkChar(e){ //Função que filtra letras e caracteres especiais, retorna apenas números
    const char = String.fromCharCode(e.keyCode); 
    const pattern = new RegExp('[0-9]');

    if(char.match(pattern)){
        return char
    }
}

