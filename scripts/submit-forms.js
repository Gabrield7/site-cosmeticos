import {validaForm} from "./validacoes.js";

const form = document.querySelector('.formulario');
const formContainer= document.querySelector('.formulario__container-grid');
const formularioOk = document.querySelector('.formulario__cadastro-ok');
const formInput = document.querySelectorAll('.formulario__campo__input');
const formBtn = document.getElementById('submit_form');

//FOMULÁRIO - PÁGINA INICIAL
const mensagensForm = {
    form_nome: {
        valueMissing: "Campo obrigatório",
        patternMismatch: "Nome inválido",
        tooShort: "Nome inválido"
    },
    form_email: {
        valueMissing: "Campo obrigatório",
        typeMismatch: "E-mail inválido",
        tooShort: "E-mail inválido",
        patternMismatch: "E-mail inválido"
    },
    form_celular: {
        typeMismatch: "Telefone inválido",
        tooShort: "Telefone inválido"
    }
}

export function submitForm(){
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
}

let validacaoFuncForm = 
`if(input.id === 'form_email'){
    validaEmail(input, mensagens);
} 
if(input.id === 'form_celular'){
    validaTelefone(input, mensagens);
}`;

let formatacaoFuncForm = 
`if(input.id === 'form_celular'){
    formataTelefone(input);
}`;

validaForm(formInput, mensagensForm, validacaoFuncForm, formatacaoFuncForm);

//FORMULÁRIO CADASTRO DE USUÁRIO

