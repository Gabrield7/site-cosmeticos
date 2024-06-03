export function validaForm(formInput, mensagens, validacoes, formatacoes, submitBtn){
    let inputOk = [];

    formInput.forEach((input, i)=>{
        
        const cadastro = JSON.parse(localStorage.getItem('cadastro'));
        if(cadastro){
            input.value = cadastro[input.name];
        }

        let mensagem = '' || 'Campo obrigatório'; //no caso do evento input não ser acionado
        let fieldset;
        let mensagemError;

        if(input.type == 'text' || input.type == 'password'){
            fieldset = input.parentNode;
            mensagemError = fieldset.querySelector('.mensagem-erro');
            

            input.addEventListener('invalid', (e)=>e.preventDefault()); //impede de aparecer mensagem padrão de campo inválido
            inputOk[i] = !input.required? true:false; //valor inicial

            input.addEventListener('input', ()=>{
                eval(validacoes);

                for(let fieldsetName in mensagens){
                    if(input.name == fieldsetName){ 
                        Object.keys(mensagens[fieldsetName]).forEach(erro => {
                            if(input.validity[erro]){
                                mensagem = mensagens[fieldsetName][erro];//campo.validity é o ValidityState, que exibe possíveis erros de validação que ocorrem automaticamente quando interagimos com esse formulário
                                console.log(erro);
                                console.log(mensagem);
                            }
                        });
                    }
                }
                //habilita e desabilita o botão de envio do form
                if(submitBtn.id == 'submit_form'){
                    if(input.required || input.value.length !== 0){
                        inputOk[i] = input.checkValidity()? true:false;
                    }else{
                        inputOk[i] = true;
                    }
                    let allOk = inputOk.every(state => state === true);
                    submitBtn.disabled = allOk? false:true;
                }
    
            });
    
            input.addEventListener('blur', ()=>{
                mensagemError.textContent = '';//reset
                const checkError = input.checkValidity(); //verifica a validade do campo (se contém algum erro, retorna 'false', se não há erros, retorna 'true')
                mensagemError.textContent = !checkError? mensagem:'';
                mensagemError.textContent !== ''? fieldset.classList.add('error'):fieldset.classList.remove('error');
            });
    
            eval(formatacoes);

        }else if(input.type === 'radio'){
            validaRadio(input, mensagens);
            
            for(let fieldsetName in mensagens){
                if(input.name == fieldsetName){ 
                    Object.keys(mensagens[fieldsetName]).forEach(erro => {
                        if(input.validity[erro]){
                            mensagem = mensagens[fieldsetName][erro];
                        }
                    });
                }
            }

        }else if(input.type === 'checkbox' && input.required){
            validaCheckbox(input, mensagens);
        }
    });
}

export function checkError(input, condition, erro, mensagens){
    input.setCustomValidity('');
    if(condition){
        input.setCustomValidity(erro);
        mensagens[input.name]['customError'] = erro;
    }else{
        input.setCustomValidity('')
        delete mensagens[input.name]['customError'];
    }
}
//E-MAIL
export function validaEmail(input, mensagens){
    const emailRegex = /\S+@\S+\.\S+/;
    checkError(input, !input.value.match(emailRegex) && input.value.length >= 4, 'Formato de e-mail inválido', mensagens);
    console.log(input.checkValidity());
}
//TELEFONE
export function validaTelefone(input, mensagens){  
    const telefoneFormatado = input.value.replace(/\D/g, '');
    console.log(telefoneFormatado);
    checkError(input, telefoneFormatado.length < 11 && telefoneFormatado.length !== 0, 'Telefone inválido', mensagens);
}

export function formataTelefone(input){
    input.addEventListener('input', (e) => {
        input.value = input.value
        .replace(/\D/g, '') 
        .replace(/(\d{2})(\d)/, '($1) $2')    
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');    
    });

}
//CPF
export function formataCPF(input){
    input.addEventListener('input', (e) => {
        input.value = input.value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2')    
        .replace(/(\d{3})(\d)/, '$1.$2')    
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');    
    });
}

export function validaCPF(input, mensagens){ 
    input.setCustomValidity(''); //reset
    const value = input.value.replace(/\D/g, "");

    if(value.length >= 11 && (validaDigito(value, 1) || validaDigito(value, 2) || numerosRepetidos(value))){  
        const erro = 'O CPF digitado não existe';
        input.setCustomValidity(erro);
        mensagens[input.name]['customError'] = erro;
    }else if(value.length > 0 && value.length < 11){
        const erro = 'CPF inválido';
        input.setCustomValidity(erro);
        mensagens[input.name]['customError'] = erro;
    }else{
        input.setCustomValidity('')
        delete mensagens[input.name]['customError'];
    }
}

function numerosRepetidos(cpf){       
    const cpfRepetidos = [];
    for(let i = 0; i <= 9; i++){
        cpfRepetidos.push(Array(11).fill(i).join(''));
    }

    return cpfRepetidos.some((numero)=>{
        return cpf == numero;
    })
}

function validaDigito(cpf, n){
    let multiplicador = n==1? 10:11; //valor de acordo com o validador de dígito (1º ou 2º)
    let length = n==1? 9:10; //valor de acordo com o validador de dígito (1º ou 2º)
    let soma = 0;
    
    for(let i=0; i< length;i++){
        soma += cpf[i]*multiplicador;
        multiplicador--;
    }
    const verificador = 11 - soma%11;
    const digito = verificador >= 10? 0 : verificador;
    return parseInt(cpf[length]) === digito? false:true
}

// SENHA
export function validaSenha(input, mensagens){
    const regrasSenha = input.parentNode.querySelector('.senha-regras');
    const condicoes = {
        cond1: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`])/, //mínimo um caractere especial
        cond2: /^(?=.*[0-9])/,                          //mínimo um número
        cond3: /^(?=.*[A-Z])/,                          //mínimo uma letra maiúscula
        cond4: /^(?=.*[a-z])/,                          //mínimo uma letra minúscula
        cond5: /.{6,}/                                  //mínimo 6 caracteres
    }

    let senhaOk = [];
    Object.keys(condicoes).forEach((condicao, i)=>{
        senhaOk[i] = false;
        const icone = regrasSenha.querySelector(`#${condicao}`);
        if(input.value.match(condicoes[condicao]) ){
            icone.classList.add('icon');
            senhaOk[i] = true;
        }else{
            icone.classList.remove('icon');
            senhaOk[i] = false;
        }

        const allOk = senhaOk.every(state => state === true);
        checkError(input, !allOk && input.value.length !== 0, 'A senha deve cumprir as regras abaixo', mensagens);
    });
}

export function repSenha(input, mensagens){
    const inputSenha = input.parentNode.parentNode.querySelector('#cad_senha');
    checkError(input, input.value.length !== 0 && input.value !== inputSenha.value, 'As senhas não coincidem', mensagens);
}

// NASCIMENTO
export function validaData(input, mensagens){
    const inputFormatado = input.value.replace(/\D/g, '') 
    const dia = parseInt(inputFormatado.slice(0, 2), 10);
    const mes = parseInt(inputFormatado.slice(2, 4), 10) - 1;
    const ano = parseInt(inputFormatado.slice(4, 8), 10);
    const dataAtual = new Date();
    let nascimento;
    let nascimentoMais18;

    const dataValida = inputFormatado.length < 8 && inputFormatado.length !== 0;
    if(dataValida){
        checkError(input, dataValida, 'Data inválida', mensagens);
    }else{
        nascimento = new Date(ano, mes, dia);
        nascimentoMais18 = new Date(nascimento.getUTCFullYear() + 18, nascimento.getUTCMonth(), nascimento.getUTCDate());
        checkError(input, input.value.length !== 0 && dataAtual <= nascimentoMais18, 'Você deve ser maior que 18 anos para se cadastrar', mensagens);
    }
}

export function formataData(input){
    input.addEventListener('input', (e) => {
        input.value = input.value
        .replace(/\D/g, '') 
        .replace(/(\d{2})(\d)/, '$1/$2')    
        .replace(/(\d{2})(\d{1,4})$/, '$1/$2');    
    });
}

// GÊNERO
export function validaRadio(input, mensagens){
    let radioCheck = [];
    const fieldset = input.parentNode.parentNode;
    const inputs = fieldset.querySelectorAll('[data-input]');
    const mensagemError = fieldset.querySelector('.mensagem-erro');
    
    Array.from(inputs).forEach((radio, i) => radioCheck[i] = radio.checked? true:false);
    let radioState = radioCheck.some(check => check == true);
    
    if(!radioState){ 
        const erro = 'Por favor, selecione uma opção';
        input.setCustomValidity(erro);
        mensagens[input.name]['customError'] = erro;
        fieldset.classList.add('error');
    }
    
    fieldset.classList.remove('error');
    input.addEventListener('change', ()=>{
        input.setCustomValidity('')
        delete mensagens[input.name]['customError'];

        fieldset.classList.remove('error');
        mensagemError.textContent = '';

        for(let fieldsetName in mensagens){
            if(input.name == fieldsetName){ 
                Object.keys(mensagens[fieldsetName]).forEach(erro => {
                    if(input.validity[erro]){
                        mensagemError.textContent = mensagens[fieldsetName][erro];
                        mensagemError.textContent !== ''? fieldset.classList.add('error'):fieldset.classList.remove('error');
                    }
                });
            }
        }
    });
}
//TERMOS
export function validaCheckbox(input, mensagens){
    const fieldset = input.parentNode.parentNode;
    const mensagemError = fieldset.querySelector('.mensagem-erro');
    
    input.addEventListener('change', ()=>{
        mensagemError.textContent = ''; //reset
        if(!input.checked){ 
            const erro = 'É necessário aderir aos termos de uso';
            input.setCustomValidity(erro);
            mensagens[input.name]['customError'] = erro;
        }else{
            input.setCustomValidity('')
            delete mensagens[input.name]['customError'];
            fieldset.classList.remove('error');
        }

    });
}

