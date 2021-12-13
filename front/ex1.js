// document.querySelector("#titulo").innerHTML = "Teste";

let botaoSomar = document.querySelector("#botaoSomar");
botaoSomar.onclick = somar;

const titulo = "Exemplo Soma"

const main = document.querySelector("main");
main.innerHTML = `
<h1 id="titulo">${titulo}</h1>

    <label for="val1">Digite o Valor 1:</label>
    <input type="number" id="val1"><br/>

    <label for="val2">Digite o Valor 2:</label>
    <input type="number" id="val2"><br/>

    <button id="botaoSomar">Somar</button>
    <p id="resultado">0</p>
`


function somar() {
    const valor1 = +document.querySelector("#val1").value;
    const valor2 = +document.querySelector("#val2").value;
    const resultado = valor1 + valor2;
    console.log(typeof(valor1));

    // document.querySelector("#resultado").innerHTML = resultado;
    main.innerHTML = `<h1>Resultado: ${resultado}</h1>`
}