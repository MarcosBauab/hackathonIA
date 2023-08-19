let quantPag = 4
let pagAtual = 0
let buttonStart = document.getElementById("generateReportBTN")
buttonStart.addEventListener("click", function () {
    pagAtual++
    switch (pagAtual) {
        case 1:
            paginaUm()
            break
    }
})

function paginaUm() {
    // Limpando a div app
    let appDiv = document.getElementById("app")
    appDiv.innerHTML = ''

    let formContainer = document.createElement("")

    var divNova = document.createElement("div");
    var conteudoNovo = document.createTextNode("Olá, cumprimentos!");
    divNova.appendChild(conteudoNovo); //adiciona o nó de texto à nova div criada
    appDiv.innerHTML = divNova
    // adiciona o novo elemento criado e seu conteúdo ao DOM
    var divAtual = document.getElementById("app");
    document.body.insertBefore(divNova, divAtual);
}
