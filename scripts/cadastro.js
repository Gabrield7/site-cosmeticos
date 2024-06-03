import {validaForm, validaRadio, validaEmail} from "./validacoes.js";

const body = document.querySelector('body');
// const cabecalhoCad = document.querySelector('.cabecalho__cadastro');

const cadSubmit = document.querySelector('.cadastro-form'); //para 'submit function'
const cadInput = document.querySelectorAll('[data-input]');
const cadBtn = document.querySelector('.botao__cadastro');
const documentFieldset = document.querySelectorAll('.campo__cadastro');

cadSubmit.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let mensagemError;
    let fieldset;
    const inputs = cadSubmit.querySelectorAll('[data-input]');

    inputs.forEach((input)=>{
        if(input.type == 'checkbox' || input.type == 'radio'){
            fieldset = input.parentNode.parentNode;
            mensagemError = fieldset.querySelector('.mensagem-erro');
        }else{
            fieldset = input.parentNode;
            mensagemError = fieldset.querySelector('.mensagem-erro');
        }

        for(let fieldsetName in mensagensCad){
            if(input.name == fieldsetName){ 
                Object.keys(mensagensCad[fieldsetName]).forEach(erro => {
                    if(input.validity[erro]){
                        mensagemError.textContent = mensagensCad[fieldsetName][erro];
                        mensagemError.textContent !== ''? fieldset.classList.add('error'):fieldset.classList.remove('error');
                    }
                });
            }
            
        }
    });

    const cadastro = {
        "nome": e.target.elements["nome"].value,
        "sobrenome": e.target.elements["sobrenome"].value,
        "email": e.target.elements["email"].value,
        "cpf": e.target.elements["cpf"].value.replace(/\D/g, ""),
        "senha": e.target.elements["senha"].value,
        "rep_senha": e.target.elements["rep_senha"].value,
        "nascimento": e.target.elements["nascimento"].value,
        "genero": e.target.elements["genero"].value,
        "celular": e.target.elements["celular"].value.replace(/\D/g, ""),
        "whatsapp": e.target.elements["whatsapp"].value.replace(/\D/g, ""),
        "news": e.target.elements["news"].value,
        "check_terms": e.target.elements["check_terms"].value,
    }

    const mensagemContainer = Array.from(document.querySelectorAll('.mensagem-erro'));
    const cadastroOk = mensagemContainer.every((input) => input.textContent == '');

    if(cadastroOk){
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        window.location.href = '../index.html';
    }else{

        const filedsetTrue = Array.from(documentFieldset).filter((fieldset)=>{
            const fieldErrorMesage = fieldset.querySelector('.mensagem-erro');
            
            if(fieldErrorMesage){
                return fieldErrorMesage.textContent !== ''
            }

        });

        Array.from(filedsetTrue)[0].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        Array.from(filedsetTrue).forEach((element)=>{
            element.classList.remove('fadeInOut');//
            void element.offsetWidth; //resetar animação

            setTimeout(() => {
                element.classList.add('fadeInOut');
                //element.style.animationDirection = 'alternate'
            }, 600);
        });
    }

});


const mensagensCad = {
    nome: {
        valueMissing: "Campo obrigatório",
        patternMismatch: "Nome inválido",
        tooShort: "Nome inválido"
    },
    sobrenome: {
        valueMissing: "Campo obrigatório",
        patternMismatch: "Nome inválido",
        tooShort: "Nome inválido"
    },
    email: {
        valueMissing: "Campo obrigatório",
        typeMismatch: "E-mail inválido",
        tooShort: "E-mail inválido",
        patternMismatch: "E-mail inválido"
    },
    cpf: {
        valueMissing: "Campo obrigatório",
        patternMismatch: "CPF inválido",
        tooShort: "CPF inválido",
    },
    senha: {
        valueMissing: "Campo obrigatório",
        patternMismatch: "A senha deve cumprir as regras abaixo",
        tooShort: "A senha deve cumprir as regras abaixo.",
    },
    rep_senha: {
        valueMissing: "Campo obrigatório",
        patternMismatch: "As senhas não coincidem",
        tooShort: "As senhas não coincidem",
    },
    nascimento: {
        valueMissing: 'Campo obrigatório',
        badInput: "Data inválida"
    },
    genero: {},
    celular: {
        valueMissing: 'Campo obrigatório',
        typeMismatch: "Telefone inválido",
        tooShort: "Telefone inválido"
    },
    whatsapp: {
        valueMissing: 'Campo obrigatório',
        typeMismatch: "Telefone inválido",
        tooShort: "Telefone inválido"
    },
    check_terms: {}
}


let validacaoFuncCad= 
`if(input.name === 'email'){
    validaEmail(input, mensagens);
} 
if(input.name === 'cpf'){
    validaCPF(input, mensagens);
}
if(input.name === 'senha'){
    validaSenha(input, mensagens);
}
if(input.name === 'rep_senha'){
    repSenha(input, mensagens);
}
if(input.name === 'nascimento'){
    validaData(input, mensagens);
}
if(input.name === 'celular' || input.name === 'whatsapp'){
    validaTelefone(input, mensagens);
}`;

let formatacaoFuncCad = 
`if(input.name === 'celular' || input.name === 'whatsapp'){
    formataTelefone(input);
}
if(input.name === 'cpf'){
    formataCPF(input);
}
if(input.name === 'nascimento'){
    formataData(input)
}`;

validaForm(cadInput, mensagensCad, validacaoFuncCad, formatacaoFuncCad, cadBtn);



//MODO DARK
const darkToggle = document.getElementById('modo');

darkToggle.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.toggle('dark');
});

