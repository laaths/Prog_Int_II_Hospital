let body = document.querySelector("body");
let main = document.querySelector("main");

body.onload = function() {
    console.log("Loading o body");
    buscarProdutos();
    setInterval(buscarProdutos, 5000);
}

let cont = 1;

function buscarPessoas() {
    // console.log(cont++);
    //main.innerHTML = cont++;
}

function buscarUsuarios() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listaUsuarios = JSON.parse(this.responseText);
        let lista = `<table>`;
        lista += `<tr>`
        for (let i = 0; i < listaUsuarios.length; i++) {
            lista += `<td>${listaUsuarios[i].nome}</td>`;
        }
        lista += `</tr>`

        lista += `<tr>`
        for (let i = 0; i < listaUsuarios.length; i++) {
            lista += `<td>${listaUsuarios[i].email}</td>`;
        }
        lista += `</tr>`

        lista += `<tr>`
        for (let i = 0; i < listaUsuarios.length; i++) {
            lista += `<td>${listaUsuarios[i].username}</td>`;
        }
        lista += `</tr>`

        lista += '</table>';
        main.innerHTML = lista;
    }
    xhttp.open("GET", "https://progintiihosp.herokuapp.com/usuarios/listar", true);
    xhttp.send();
}

function montarTabelaPessoas(listaProdutos) {
    let tablea = `

    <table>
        <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>Preço</th>
        </tr>
    </table>

    `;
    main.innerHTML = tabela;
}