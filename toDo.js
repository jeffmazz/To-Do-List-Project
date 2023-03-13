const inputTarefa = document.querySelector("#text")
const tarefas = []
const tarefasFeitas = []
const addBtn = document.querySelector("#add")
const tarefasCriadas = document.querySelector("#criadas")
const tarefasConcluidas = document.querySelector("#concluidas")
const lista = document.querySelector("#lista")
const listaFeita = document.querySelector("#listaFeita")

function checkInput() {
    if (inputTarefa.value == 0) {
        return true
    }
}

function checkArr() {

    if (tarefas.length > 0) {
        document.querySelector('#nenhumaTarefa').style.display = 'none'
        lista.style.display = 'block'
    } else {
        document.querySelector("#nenhumaTarefa").style.display = 'block'
        lista.style.display = 'none'
    }

}

function checkBoxClickEvent() {

    tarefas.forEach(li => {

        li.querySelector('input[type=checkbox]').addEventListener('click', () => {

            checkboxFunction()

        })

    })

}

function checkboxFunction() {

    tarefas.forEach(li => {

            if (li.querySelector("input[type=checkbox]").checked == true) {

                let indexOfLi = tarefas.indexOf(li)
                li.getElementsByTagName("p")[0].style.textDecoration = "line-through"
                li.getElementsByTagName("p")[0].style.color = "gray"
                tarefasFeitas.push(li)
                tarefas.splice(indexOfLi, 1)
                li.remove()
                updateTarefasFeitas()
                updateCriadas()
                checkArr()
            }
        })

}

function updateCriadas() {

    tarefasCriadas.innerHTML = 'Criadas ' + tarefas.length
    
}

function updateTarefasFeitas() {

    listaFeita.innerHTML = ''

    tarefasFeitas.forEach(tarefa => {

        let li = document.createElement("li")
        li.innerHTML = tarefa.innerHTML
        li.querySelector("input[type=checkbox]").checked = 'checked'
        li.querySelector('input[type=checkbox]').disabled = 'true'
        li.classList.add('listItem-done')
        listaFeita.appendChild(li)

        li.querySelector("#excluirTarefa").addEventListener('click', () => {

            let confirmQuest = window.confirm('Deseja realmente excluir essa tarefa ?')

            if (confirmQuest == true) {

                let indexOfLi = tarefasFeitas.indexOf(tarefa)
                tarefasFeitas.splice(indexOfLi, 1)
                li.remove()
                updateTarefasFeitas()
            }

        })

    })

    tarefasConcluidas.innerHTML = 'Concluídas ' + tarefasFeitas.length

}

addBtn.addEventListener("click", () => {

    if (checkInput() == true) {
        alert("Por favor, digite uma tarefa para ser adicionada à lista. ")
        inputTarefa.focus()
        return
    }

    let tarefa = inputTarefa.value
    tarefa = tarefa[0].toUpperCase() + tarefa.substring(1)

    let li = document.createElement("li")
    li.innerHTML = `<input type="checkbox" id="tarefaConcluida"> <p style="width: 200px; margin: auto;"> ${tarefa} </p> <button id="excluirTarefa"> x </button>`

    lista.appendChild(li)

    tarefas.push(li)

    li.querySelector('#excluirTarefa').addEventListener('click', () => {

        let deleteQuest = window.confirm("Deseja realmente excluir essa tarefa da lista de tarefas à fazer ?")

        if (deleteQuest == true) {
            
        let indexOfLi = tarefas.indexOf(li)
        tarefas.splice(indexOfLi, 1)
        li.remove()
        updateCriadas()
        console.log(tarefas)
        checkboxFunction()
        checkBoxClickEvent()
        checkArr()

        }

        
    })

    inputTarefa.value = ""
    inputTarefa.focus()
    checkArr()
    updateCriadas()
    checkBoxClickEvent()
})