let body = document.querySelector("body");
let main = document.querySelector("main");
/*
body.onload = function() {
    console.log("Inicializando o body");
    // window.alert("Hello World");
    buscarPessoas();
    setInterval(buscarPessoas, 5000);
}
*/
let cont = 1;

function buscarPessoas() {
    // console.log(cont++);
    //main.innerHTML = cont++;
}

function buscarProdutos() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const listaProdutos = JSON.parse(this.responseText);
        let lista = `<ul>`;
        for (let i = 0; i < listaProdutos.length; i++) {
            lista += `<li>${listaProdutos[i].nome}</li>`;
        }
        lista = '</ul>';
        main.innerHTML = lista;
    }
    xhttp.open("GET", "http://localhost:3000/produtos", true);
    xhttp.send();
}