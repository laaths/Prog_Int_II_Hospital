let body = document.querySelector("body");
let main = document.querySelector("main");
let tabelaElemento = document.querySelector("#tabela");
let formElementoPessoa = document.querySelector("#formulario");
let buscaFila = document.querySelector("#buscafila");
let buscaPessoas = document.querySelector("#buscaPessoas");


body.onload = function() {
    console.log("Inicializando o body");
    buscarPessoasFila();
    buscarPessoas();
    setInterval(buscarPessoas, 10000);
    setInterval(buscarPessoasFila, 10000);
    formularioPessoa()
}

function buscarPessoasFila() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listapessoas = JSON.parse(this.responseText);
        let lista = ['<table>' + '<tr>' + '<th>Pessoa</th>' + '<th>Classificação</th>' + '<th>Numero Fila</th>' + '</tr>'];
        for (let i = 0; i < listapessoas.length; i++) {
            lista += '<tr>'
            lista += `<td>${listapessoas[i].nome}</td>`;
            lista += `<td>${listapessoas[i].classificacao}</td>`;
            lista += `<td>${listapessoas[i].nfila}</td>`;
            lista += '</tr>'
        }
        lista += '</table>';
        buscaFila.innerHTML = lista;
    }
    xhttp.open("GET", "http://localhost:3000/fila/listar", true);
    xhttp.send();
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

function formularioPessoa() {
    formElementoPessoa.innerHTML = `<form id="formPessoas">
        <label for='nomeInput'>Nome:</label>
        <input id='nomeInput'> </br>
        <label type='number' for='idadeInput'>Idade:</label>
        <input id='idadeInput'>
        <label for ='classificInput'><p>Classificação:</p></label>
        <input id='classificInput' type="radio" name="classificInput" value="Azul">Azul
        <br>
        <input id='classificInput' type="radio" name="classificInput" value="Verde">Verde
        <br>
        <input id='classificInput' type="radio" name="classificInput" value="Amarelo">Amarelo
        <br>
        <input id='classificInput' type="radio" name="classificInput" value="Laranja">Laranja
        <br>
        <input id='classificInput' type="radio" name="classificInput" value="Vermelho">Vermelho
        <br>
        <input id='button'type="submit" value="Salvar">
        
    </form>`;

    const formPessoas = document.querySelector("#formPessoas");
    formPessoas.onsubmit = function(event) {
        event.preventDefault();
        const nomeInput = document.querySelector("#nomeInput");
        const idadeInput = document.querySelector("#idadeInput");
        const classificInput = document.querySelector('input[name="classificInput"]:checked');


        if (nomeInput.value && idadeInput.value && classificInput.value) {
            let pessoas = new Object();
            pessoas.nome = nomeInput.value;
            pessoas.idade = idadeInput.value;
            //Chamada AJAX para inserir produto
            inserirPessoas(pessoas, classificInput.value);
            nomeInput.value = "";
            idadeInput.value = "";

        } else {
            alert("Campos Nome e Idade obrigatórios");
        }
    }
}

function inserirPessoas(pessoasObj, classificInput) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const pessoas = JSON.parse(this.responseText);
        alert(`Pessoa ${pessoas.nome} cadastrado com sucesso!`);
        let buscaInserido = httpGet("http://localhost:3000/pessoas/nome/"+pessoas.nome)
        buscaInserido = JSON.parse(this.responseText)
        let buscaInseridoObj = new Object();
        buscaInseridoObj.pessoaid = buscaInserido.id
        buscaInseridoObj.classificacao = classificInput
        inserirFila(buscaInseridoObj);
    }
    xhttp.open("POST", "http://localhost:3000/pessoas/inserir", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(pessoasObj));
}

function inserirFila(pessoasObj) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const pessoas = JSON.parse(this.responseText);
        alert(`${pessoas.nome} cadastrado na fila com sucesso!`);
    }
    xhttp.open("POST", "http://localhost:3000/fila/inserir", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(pessoasObj));
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

