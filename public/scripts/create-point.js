/*
document 
    .querySelector("select")
    .addEventListener("change", () => {
        console.log("Mudei");
    });
*/

// Retorna a lista de cidade

function populationUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    // o then sempre retorna uma função
    // .then( (res) => { return res.json();})
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => res.json())
        .then((states) => {
            for (let state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        });
}

populationUFs();

// Retorna a lista de municípios

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value; //Pega o id da cidade que foi selecionada

    // Evento -> qual cidade foi selecionada no campo do select
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then((res) => res.json())
        .then((cities) => {
            for (let city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
            citySelect.disabled = false;
        });
}

// Libera o select cidade
ufSelect = document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

//Itens de coleta
// pegar todos os lista

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
    const itemLi = event.target;

    // adicionar ou remover uma classe com js (remove() = remover/add() = adicionar

    // Se o elemento tiver a classe ele remove se não ele coloca. toggle()
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    // verificar se existem items selecionados. Se sim pegue-os.

    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId; // True ou falso
        return itemFound;
    });

    // se já estiver selecionado, tirar do array

    if (alreadySelected >= 0) {
        // Filtrar o array
        const filteredItems = selectedItems.filter((item) => {
            const itensDifferent = item != itemId; //false
            return itensDifferent;
        });

        selectedItems = filteredItems;

        // se não tiver selecionado, adicionar ao array
    } else {
        selectedItems.push(itemId);
    };

    // atualizar o campo escondido com os dados selecionados

    collectedItems.value = selectedItems;

}