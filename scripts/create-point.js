/*
document 
    .querySelector("select")
    .addEventListener("change", () => {
        console.log("Mudei");
    });
*/

// Retorna a lista de cidade 

function populationUFs(){
    const ufSelect = document 
    .querySelector("select[name=uf]");

    // o then sempre retorna uma função
    // .then( (res) => { return res.json();})
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for(let state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    } );

}

populationUFs();


// Retorna a lista de municípios

function getCities(event){
    const citySelect = document 
    .querySelector("select[name=city]");
    const stateInput = document 
    .querySelector("input[name=state]");

    const ufValue = event.target.value; //Pega o id da cidade que foi selecionada

    // Evento -> qual cidade foi selecionada no campo do select
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(let city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }
        citySelect.disabled = false;
    } );
                                  
    

}

// Libera o select cidade
ufSelect = document 
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);
