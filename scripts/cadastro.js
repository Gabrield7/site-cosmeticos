import {validaForm, validaRadio, validaEmail} from "./validacoes.js";

const body = document.querySelector('body');
// const cabecalhoCad = document.querySelector('.cabecalho__cadastro');

const cadSubmit = document.querySelector('.cadastro-form'); //para 'submit function'
const cadInput = document.querySelectorAll('[data-input]');
const cadBtn = document.querySelector('.botao__cadastro');


cadSubmit.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let mensagemError;
    let fieldset;
    //let inputOk = [];
    const inputs = cadSubmit.querySelectorAll('[data-input]');

    inputs.forEach((input, i)=>{
        // if(input.required || input.value.length !== 0){
        //     inputOk[i] = input.checkValidity()? true:false;
        // }else{
        //     inputOk[i] = true;
        // }
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
                        //inputOk[i] = false;
                        //console.log(input.name, 'contem erro');
                        //console.log(mensagemError.textContent);
                        //inputOk[i] = mensagemError.textContent == ''? true:input.required? false:true;
                        
                    }else{
                        //inputOk[i] = 'true2';
                        //console.log(input.name, 'não contem erro');
                        //console.log(mensagemError.textContent);
                        //inputOk[i] = mensagemError.textContent == ''? true:input.required? false:true;
                    }
                });
            }
            
        }
        //console.log(inputOk[i])
        //console.log(input.name, input.checkValidity());
    });

    const cadastro = {
        "nome": e.target.elements["nome"].value,
        "sobrenome": e.target.elements["sobrenome"].value,
        "email": e.target.elements["email"].value,
        "cpf": e.target.elements["cpf"].value,
        "senha": e.target.elements["senha"],
        "rep_senha": e.target.elements["rep_senha"],
        "nascimento": e.target.elements["rep_senha"],
        "genero": e.target.elements["genero"],
        "celular": e.target.elements["celular"].value.replace(/\D/g, ""),
        "whatsapp": e.target.elements["whatsapp"].value.replace(/\D/g, ""),
        "news": e.target.elements["news"],
        "check_terms": e.target.elements["check_terms"],
    }

    const mensagemContainer = document.querySelectorAll('.mensagem-erro');

    // Array.from(mensagemContainer).forEach(mensagem=>{
    //     console.log(mensagem.textContent, mensagem.textContent == '')
    // })

    const cadastroOk = Array.from(mensagemContainer).every((input) => input.textContent == '');

    if(cadastroOk){
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        //console.log(cadastro);
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
// if(input.name === 'genero'){
//     validaRadio(input, radioCheck, mensagens);
// }
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

validaForm(cadInput, mensagensCad, validacaoFuncCad, formatacaoFuncCad, cadBtn, cadSubmit);



//MODO DARK
const darkToggle = document.getElementById('modo');

darkToggle.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.toggle('dark');
});

