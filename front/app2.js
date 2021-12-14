let body = document.querySelector("body");
let main = document.querySelector("main");

// Query Formularios
let formElementoPessoa = document.querySelector("#formularioPessoas");
let formElementoFila = document.querySelector("#formularioFila");
let formElementoAtendimento = document.querySelector("#formularioAtendimento");

// Query Buscar
let buscaPessoas = document.querySelector("#buscaPessoas");
let buscaFila = document.querySelector("#buscafila");
let buscaAtendimento = document.querySelector("#buscaAtendimento");

// Query Imprimir
let printaChamada = document.querySelector("#printaChamadaFila");


body.onload = function() {
    console.log("Inicializando o body");
    buscarPessoas();
    buscarAtendimentos();
    buscarpessoaFila()
    setInterval(buscarPessoas, 5000);
    setInterval(buscarPessoas, 5000);
    setInterval(buscarAtendimentos, 5000);
    formularioPessoa();
    formularioFila();
    formularioAtendimento();
}

//////////////////////////////////////////////////////////// - Pessoas

function formularioPessoa() {
    formElementoPessoa.innerHTML = `<form id="formPessoas">
        <label for='nomeInput'>Nome:</label>
        <input type='text' id='nomeInput'> </br>
        <label for='idadeInput'>Idade:</label>
        <input type='number' id='idadeInput'></br><br>
     
        <input class="centraliza" type="submit" value="Salvar" onclick="submit_pessoas">
        
    </form>`;

    const formPessoas = document.querySelector("#formPessoas");
    formPessoas.onsubmit = function(event) {
        event.preventDefault();
        const nomeInput = document.querySelector("#nomeInput");
        const idadeInput = document.querySelector("#idadeInput");

        if (nomeInput.value && idadeInput.value) {
            let pessoas = new Object();
            pessoas.nome = nomeInput.value;
            pessoas.idade = idadeInput.value;
            //Chamada AJAX para inserir pessoa
            inserirPessoas(pessoas);
            nomeInput.value = "";
            idadeInput.value = "";

        } else {
            alert("Campos Nome e Idade obrigatórios");
        }
    }
}

function buscarPessoas() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listapessoas = JSON.parse(this.responseText);
        let lista = ['<table>' + '<tr>' + '<th>Nome</th>' + '<th>Idade</th>' + '</tr>'];
        for (let i = 0; i < listapessoas.length; i++) {
            lista += '<tr>'
            lista += `<td>${listapessoas[i].nome}</td>`;
            lista += `<td>${listapessoas[i].idade}</td>`;
            lista += '</tr>'
        }
        lista += '</table>';
        buscaPessoas.innerHTML = lista;
    }
    xhttp.open("GET", "http://localhost:3000/pessoas/listar", true);
    xhttp.send();
}

function inserirPessoas(pessoasObj) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const pessoas = JSON.parse(this.responseText);
        alert(`Pessoa ${pessoas.nome} cadastrado com sucesso!`);
        let buscaInserido = httpGet("http://localhost:3000/pessoas/nome/" + pessoas.nome)
        buscaInserido = JSON.parse(this.responseText)
        let buscaInseridoObj = new Object();
        buscaInseridoObj.pessoaid = buscaInserido.id;
    }
    xhttp.open("POST", "http://localhost:3000/pessoas/inserir", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(pessoasObj));
}

////////////////////////////////////////////////////////////////// - FILA

function formularioFila() {
    formElementoFila.innerHTML = `<form id="formFila">
        <label for='pessoaidFilaInput'>ID da Pessoa:</label>
        <input type='number' id='pessoaidFilaInput'> </br>
        <label for='classificacaoFilaInput'>Classificação:</label>
        <select name="classificacaoFilaInput" id="classificacaoFilaInput">
            <option value="azul">Azul</option>
            <option value="verde">Verde</option>
            <option value="amarelo">Amarelo</option>
            <option value="laranja">Laranja</option>
            <option value="vermelho">Vermelho</option>
        </select></br>
    
        <input class="centraliza" type="submit" value="Salvar">
    </form>`;
    const formPessoas = document.querySelector("#formFila");
    formPessoas.onsubmit = function(event) {
        event.preventDefault();
        const pessoaidFilaInput = document.querySelector("#pessoaidFilaInput");
        const classificacaoFilaInput = document.querySelector('#classificacaoFilaInput option:checked');

        if (pessoaidFilaInput && classificacaoFilaInput) {
            let pessoas = new Object();
            pessoas.pessoaid = pessoaidFilaInput.value;
            pessoas.classificacao = classificacaoFilaInput.value;
            //Chamada AJAX para inserir produto
            inserirpessoaFila(pessoas);
            pessoaidFilaInput.value = "";
            classificacaoFilaInput.value = "";

        } else {
            alert("Campos Nome e Idade obrigatórios");
        }
    }
}

function inserirpessoaFila(pessoasObj) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const pessoas = JSON.parse(this.responseText);
        let listaPessoasGet = httpGet("http://localhost:3000/pessoas/nome/" + pessoas.pessoaid)
        console.log(listaPessoasGet)
        listaPessoasGet = JSON.parse(this.responseText)
        alert(`${pessoas.nome}} cadastrado na fila com sucesso!`);
    }
    xhttp.open("POST", "http://localhost:3000/fila/inserir", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(pessoasObj));
}

function chamaFila() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listaFila = JSON.parse(this.responseText);
        let listaPessoasGet = httpGet("http://localhost:3000/pessoas/nome/" + listaFila[0].nome)
        listaPessoasGet = JSON.parse(this.responseText)
        console.log(listaPessoasGet)
        let lista = [`<h1>nome: ${listaPessoasGet[0].nome}</h1>`, `<h1>Classificação: ${listaFila[0].classificacao}</h1>`]

        printaChamada.innerHTML = lista

        let listaFilaObj = new Object();
        listaFilaObj.pessoaid = listaPessoasGet.id
        listaFilaObj.medicoid = 6 //ID DO MEDICO - BUSCAR EM OUTRA TABELA E SE POSSIVEL RANDOM
    }
    xhttp.open("GET", "http://localhost:3000/fila/listarAlloriginal", true);
    xhttp.send();
}

function buscarpessoaFila() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listapessoas = JSON.parse(this.responseText);
        let lista = ['<table>' + '<tr>' + '<th>Nome</th>' + '<th>Classificação</th>' + '</tr>'];
        for (let i = 0; i < listapessoas.length; i++) {
            lista += '<tr>'
            lista += `<td>${listapessoas[i].nome}</td>`;
            lista += `<td>${listapessoas[i].classificacao}</td>`;
            lista += '</tr>'
        }
        lista += '</table>';
        buscaFila.innerHTML = lista;
    }
    xhttp.open("GET", "http://localhost:3000/fila/listar", true);
    xhttp.send();
}


/////////////////////////////////////////////////////////// - ATENDIMENTO

function formularioAtendimento() {
    formElementoAtendimento.innerHTML = `<form id="formAtendimento">
        <label for='pessoaidAtendimentoInput'>ID da Pessoa:</label>
        <input type='number' id='pessoaidAtendimentoInput'> </br>
        <label for='medicoidAtendimentoInput'>ID do Médico:</label>
        <input type='number' id='medicoidAtendimentoInput'> </br>
        </br>
    
        <input class="centraliza" type="submit" value="Salvar">
    </form>`;

    const formPessoas = document.querySelector("#formAtendimento");
    formPessoas.onsubmit = function(event) {
        event.preventDefault();
        const pessoaidAtendimentoInput = document.querySelector("#pessoaidAtendimentoInput");
        const classificacaoAtendimentoInput = document.querySelector('#medicoidAtendimentoInput');
        console.log(classificacaoAtendimentoInput);
        if (pessoaidAtendimentoInput && classificacaoAtendimentoInput) {
            let pessoas = new Object();
            pessoas.pessoaid = pessoaidAtendimentoInput.value;
            pessoas.medicoid = classificacaoAtendimentoInput.value;
            //Chamada AJAX para inserir produto
            inserirpessoaAtendimento(pessoas);
            pessoaidAtendimentoInput.value = "";
            classificacaoAtendimentoInput.value = "";
        } else {
            alert("Campos ID Pessoa e Id Médico do Atendimento obrigatórios");
        }
    }
}

function buscarAtendimentos() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listaAtendimentos = JSON.parse(this.responseText);
        let lista = ['<table>' + '<tr>' + '<th>Paciente</th>' + '<th>Medico Responsável</th>' + '</tr>'];
        for (let i = 0; i < listaAtendimentos.length; i++) {
            lista += '<tr>'
            lista += `<td>${listaAtendimentos[i].pessoanome}</td>`;
            lista += `<td>${listaAtendimentos[i].mediconome}</td>`;
            lista += '</tr>'
        }
        lista += '</table>';
        buscaAtendimento.innerHTML = lista;
    }
    xhttp.open("GET", "http://localhost:3000/atendimento/listar", true);
    xhttp.send();
}

function inserirpessoaAtendimento(pessoasObj) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const pessoas = JSON.parse(this.responseText);
        alert(`${pessoas.nome} cadastrado no atendimento com sucesso!`);
    }
    xhttp.open("POST", "http://localhost:3000/atendimento/inserir", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(pessoasObj));
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}