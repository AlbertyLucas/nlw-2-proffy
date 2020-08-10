// procurar o botão
document.querySelector("#add-time")
    // quando clicar no botão
    .addEventListener("click", cloneField)

// executar uma ação
function cloneField() {
    // duplicar os campos. Que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //boolean: true ou false
    // limpar os campos. quai campos?
    const fields = newFieldContainer.querySelectorAll('input')

    fields.forEach(function (field) {
        field.value = ""
    })


    // colocar na pagina. onde colocar?
    document.querySelector('#schedule-items').appendChild(newFieldContainer);

}