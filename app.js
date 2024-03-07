// const axios = require('axios');
const listPokemon = document.querySelector('#listPokemon');
let url = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonList = [];

axios.get(`${url}?limit=50`)
    .then(res => {
        let pokemonData = res.data.results;
        pokemonData.forEach(pokemon => {
            axios.get(pokemon.url)
                .then(pokemonDetails => {
                    pokemonList.push(pokemonDetails.data)
                    showPokemon(pokemonDetails.data)
                    // console.log(pokemonList)
                });
        })
    }).catch(error => console.error(error));

// pokemonList = pokemonList.sort((a, b) => a.id - b.id);
console.log(typeof(pokemonList))
console.log(pokemonList);
console.log(pokemonList.length);

function showPokemon(pokemon) {
    let types = pokemon.types.map(type => `<p class="${type.type.name} type">${type.type.name}<p/>`);
    types = types.join('');

    // let height = parseFloat(pokemon.height) / 10;
    // let weight = parseFloat(pokemon.weight) / 10;
    let id = pokemon.id.toString();

    if(id.length === 1) {
        id = "00" + id;
    } else if (id.length === 2) {
        id = "0" + id;
    }

    const div = document.createElement("div");
    // div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon">
            <p class="pokemon-id">${id}<p/>
            <div class="pokemon-image">
                <img src=${pokemon.sprites.front_default} alt=${pokemon.name} class="center">
            <div/>
        <div/>
        <div class="pokemon-info">
            <div class="first-section"><div/>
            <div class="mid-section">
                <div class="container-name">
                    <h2 class="pokemon-name">${pokemon.name}<h2/>
                <div/>
                <div class="pokemon-types">
                    ${types}
                <div/>
            <div/>
            <div class="second-section"><div/>
        <div/>`;
        listPokemon.append(div);
}

function filterCard() {
    const input = document.getElementById('searchPokemon').value.toLowerCase();
    const cards = document.getElementsByClassName('pokemon');
    for(let card of cards) {
        const title = pokemon.querySelector('h2').textContent.toLowerCase();

        if(title.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}