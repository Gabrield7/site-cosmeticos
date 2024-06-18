import {validaForm} from "./validacoes.js";

const formContainer= document.querySelector('.formulario__container-grid');
const formularioOk = document.querySelector('.formulario__cadastro-ok');
const formInput = document.querySelectorAll('[data-input]');
const formBtn = document.querySelector('.formulario__botao');

const mensagensForm = {
    nome: {
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
    celular: {
        typeMismatch: "Telefone inválido",
        tooShort: "Telefone inválido"
    }
}

export function submitForm(){
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (envio da página)
        
        const formulario = {
            "nome": e.target.elements["nome"].value,
            "email": e.target.elements["email"].value,
            "celular": e.target.elements["celular"].value.replace(/\D/g, "") //reformartar numero de telefone
        }
        
        localStorage.setItem('formulario', JSON.stringify(formulario));//transforma o objeto (JSON) em string e armazena na localStorage
    
        form.style.display = 'none';
        formularioOk.style.display = 'flex';
    });
}

validaForm(formInput, mensagensForm, formBtn);

