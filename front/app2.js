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
    buscarPessoasFila();
    buscarPessoas();
    buscarAtendimentos();
    setInterval(buscarPessoas, 5000);
    setInterval(buscarPessoasFila, 5000);
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

    /*
    function buscarPessoasFila() {
        function formularioMedico() {
            formElementoMedico.innerHTML = `<label for="medicos">Escolha o Medico:</label>
            <select name="formMedicos" id="formMedicos" form="formMedico">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
           
            <input id='button'type="submit" value="Salvar">
            
        </form>`;
        }
        */

    function inserirpessoaFila(pessoasObj) {
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            const pessoas = JSON.parse(this.responseText);
            alert(`${pessoas.nome} cadastrado na fila com sucesso!`);
        }
        xhttp.open("POST", "http://localhost:3000/fila/inserir", false);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(pessoasObj));
    }


    /////////////////////////////////////////////////////////// - ATENDIMENTO



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
}