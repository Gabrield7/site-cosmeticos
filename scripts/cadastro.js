import {validaForm} from "./validacoes.js";

const body = document.querySelector('body');
const cadSubmit = document.querySelector('.cadastro-form');
const cadInput = document.querySelectorAll('[data-input]');
const cadBtn = document.querySelector('.botao__cadastro');

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

cadSubmit.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (envio da página)

    const inputs = cadSubmit.querySelectorAll('[data-input]');

    inputs.forEach((input) => {
        const fieldset = input.closest('fieldset'); // Encontra o fieldset mais próximo do input atual
        const mensagemError = fieldset.querySelector('.mensagem-erro');
        
        const mensagens = mensagensCad[input.name] || {}; // Obtém as mensagens de erro específicas para o campo atual ou um objeto vazio

        Object.keys(mensagens).forEach(erro => {
            if (input.validity[erro]) {
                mensagemError.textContent = mensagens[erro];
                fieldset.classList.toggle('error', mensagemError.textContent !== ''); // Adiciona ou remove a classe 'error' com base na existência de uma mensagem de erro
            }
        });
    });

    // Objeto 'cadastro' com os valores dos campos do formulário
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

    // Seleciona todos os elementos de mensagem de erro e verifica se todos estão vazios
    const mensagemContainer = Array.from(document.querySelectorAll('.mensagem-erro'));
    const cadastroOk = mensagemContainer.every((input) => input.textContent == '');

    if (cadastroOk) {
        // Armazena o objeto 'cadastro' no localStorage e redireciona para a página inicial
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        window.location.href = '../index.html';
    } else {
        // Seleciona todos os fieldsets que possuem mensagens de erro
        const fieldsetsWithError = Array.from(document.querySelectorAll('.mensagem-erro'))
            .filter(errorMsg => errorMsg.textContent !== '')
            .map(errorMsg => errorMsg.closest('fieldset'));

        // Rola a página até o primeiro fieldset com erro
        fieldsetsWithError[0].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Reinicia a animação de erro para cada fieldset com erro
        fieldsetsWithError.forEach(fieldset => {
            fieldset.classList.remove('fadeInOut');
            void fieldset.offsetWidth; // Resetar animação
            setTimeout(() => {
                fieldset.classList.add('fadeInOut');
            }, 600);
        });
    }
});

validaForm(cadInput, mensagensCad, cadBtn);

//MODO DARK
const darkToggle = document.getElementById('modo');

darkToggle.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.toggle('dark');
});

