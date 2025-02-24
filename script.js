import pokemons from "./pokemon.js";
const pokemonContainer = document.getElementById("huu");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortBy = document.getElementById("sortBy");

function getWeight(pokemon) {
    return parseFloat(pokemon.weight.replace(/[^\d.-]/g, ""));
}

function generator(pokemons) {
    pokemonContainer.innerHTML = "";
    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <div class="header">
                <h2 class="bull">${pokemon.name}</h2>
                <div class="id-badge">${pokemon.id}</div>
            </div>
            <img src="${pokemon.img}" alt="${pokemon.name}" class="pokemon-image">
            <div class="type">${pokemon.type.join(" ")}</div>
            <div class="details">
                <p>Candy count: ${pokemon.candy}</p>
                <p>${pokemon.weight}</p>
            </div>
            <div class="weaknesses">
                <p>${pokemon.weaknesses.join(", ")}</p>
            </div>
            <div class="footer">
                <span>${pokemon.time}</span>
            </div>
        `;
        pokemonContainer.appendChild(card);
    });
}

function sortPokemons(pokemons) {
    let sortedPokemons = [...pokemons];

    if (sortBy.value === "alphabeticalAsc") {
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === "alphabeticalDesc") {
        sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy.value === "weightAsc") {
        sortedPokemons.sort((a, b) => getWeight(a) - getWeight(b));
    } else if (sortBy.value === "weightDesc") {
        sortedPokemons.sort((a, b) => getWeight(b) - getWeight(a));
    }

    return sortedPokemons;
}

function applyFilters() {
    const selectedType = document.getElementById("filterType").value.toLowerCase();
    const searchValue = searchInput.value.toLowerCase().trim();

    let filteredPokemons = pokemons.filter(pokemon => {
        const matchesType = selectedType === "all" || pokemon.type.some(type => type.toLowerCase() === selectedType);
        const matchesSearch = pokemon.name.toLowerCase().includes(searchValue);
        return matchesType && matchesSearch;
    });

    filteredPokemons = sortPokemons(filteredPokemons);

    generator(filteredPokemons);
}

searchButton.addEventListener('click', applyFilters);
searchInput.addEventListener('keyup', applyFilters);

document.getElementById("filterType").addEventListener("change", applyFilters);

generator(pokemons);