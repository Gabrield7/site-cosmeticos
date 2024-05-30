export function validaForm(formInput, mensagens, validacoes, formatacoes){
    let inputOk = [];
    formInput.forEach((input, i)=>{
        
        input.addEventListener('invalid', (e)=>e.preventDefault()); //impede de aparecer mensagem padrão de campo inválido
        inputOk[i] = !input.required? true:false; //valor inicial
        const mensagemError = input.parentNode.querySelector('.mensagem-erro');

        let mensagem = '' || 'Campo obrigatório'; //no caso do evento input não ser acionado
        input.addEventListener('input', ()=>{
            eval(validacoes);

            for(let fieldsetName in mensagens){
                if(input.id == fieldsetName){ 
                    Object.keys(mensagens[fieldsetName]).forEach(erro => {
                        if(input.validity[erro]){
                            mensagem = mensagens[fieldsetName][erro];//campo.validity é o ValidityState, que exibe possíveis erros de validação que ocorrem automaticamente quando interagimos com esse formulário
                        }
                    });
                }
            }
            //Verificador de erros
            if(input.required || input.value.length !== 0){
                inputOk[i] = input.checkValidity()? true:false;
            }else{
                inputOk[i] = true;
            }

            let allOk = inputOk.every(state => state === true);
            formBtn.disabled = allOk? false:true; //habilita e desabilita o botão de envio do form
        });

        input.addEventListener('blur', ()=>{
            const checkError = input.checkValidity(); //verifica a validade do campo (se contém algum erro, retorna 'false', se não há erros, retorna 'true')
            mensagemError.textContent = !checkError? mensagem:'';

            if(mensagemError.textContent !== ''){
                input.classList.add('error');
            }else{
                input.classList.remove('error');
            }
        });

        eval(formatacoes);

        input.addEventListener('focus', ()=>{
            if(mensagemError.textContent !== ''){
                input.classList.add('error');
            }else{
                input.classList.remove('error');
            }
        })
        
    });
}

export function validaEmail(input, mensagens){
    const emailRegex = /\S+@\S+\.\S+/;
    input.setCustomValidity('');
    if(!input.value.match(emailRegex) && input.value.length >= 4){
        const erro = 'Formato de e-mail inválido';
        input.setCustomValidity(erro);
        mensagens[input.id]['customError'] = erro;
    }else{
        input.setCustomValidity('')
        delete mensagens[input.id]['customError'];
    }
}

export function validaTelefone(input, mensagens){  
    if(input.value.length < 11 && input.value.length !== 0){
        const erro = 'Telefone inválido';
        input.setCustomValidity(erro);
        mensagens[input.id]['customError'] = erro;
    }else{
        input.setCustomValidity('')
        delete mensagens[input.id]['customError'];
    }
}

export function formataTelefone(input){
    onlyNumbers(input);
    input.addEventListener('blur', ()=>{ //coloca número de telefone no formato '(xx) xxxxx-xxxx'
        input.value = input.value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    });
    input.addEventListener('focus', () => { //retorna o formato de telefone como ele foi digitado ogirinalmente
        input.value = input.value.replace(/\D/g, "");
    });
}

export function onlyNumbers(input){
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
}

export function checkChar(e){ //Função que filtra letras e caracteres especiais, retorna apenas números
    const char = String.fromCharCode(e.keyCode); 
    const pattern = new RegExp('[0-9]');

    if(char.match(pattern)){
        return char
    }
}