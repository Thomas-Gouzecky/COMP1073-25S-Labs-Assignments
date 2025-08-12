// get variables

const infoBtn = document.getElementById("getInfo");
const pokemonNameInput = document.getElementById("pokemonName");
const pokedataDiv = document.getElementById("pokemonData");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

infoBtn.addEventListener("click", () => fetchPokemon(pokemonNameInput.value));

window.onload = () => {
	displayRecentPokemon();
};

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

async function fetchPokemon(name) {
	const url = baseURL + name.toLowerCase();
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Pokemon not Found");
		const pokemonData = await response.json();

		displayPokemonData(pokemonData);

		savePokemon(pokemonData);
	} catch (error) {
		pokedataDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
	}
	if (!pokedataDiv.classList.contains("card")) pokedataDiv.classList.add("card");
}

function displayPokemonData(pokemonData) {
	let html = `
          <h2>${pokemonData.name.toUpperCase()}</h2>
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        `;

	// lbs
	const pokemonWeight = (pokemonData.weight * 0.220462).toFixed(2);

	// feet
	const totalInches = pokemonData.height * 3.937;
	const feet = Math.floor(totalInches / 12);
	const inches = Math.round(totalInches % 12);

	html += `<p>Height: ${feet}' ${inches}" </p>`;
	html += `<p>Weight: ${pokemonWeight}lbs</p>`;
	html += `<p>Types: ${pokemonData.types.map((t) => capitalize(t.type.name)).join(" / ")}</p>`;
	html += `<p>Abilities: ${pokemonData.abilities.map((a) => capitalize(a.ability.name)).join(" / ")}</p>`;

	pokedataDiv.innerHTML = html;
}

function savePokemon(pokemonData) {
	// Load saved array or create empty
	let saved = JSON.parse(localStorage.getItem("recentPokemon") || "[]");

	// Check if Pokémon is already saved
	if (!saved.some((p) => p.name === pokemonData.name)) {
		// Save only name and sprite
		saved.push({
			name: pokemonData.name,
			image: pokemonData.sprites.front_default,
		});
		localStorage.setItem("recentPokemon", JSON.stringify(saved));
	}

	displayRecentPokemon();
}

async function displayRecentPokemon() {
	const recentContainer = document.querySelector("aside");
	let saved = JSON.parse(localStorage.getItem("recentPokemon") || "[]");

	if (saved.length === 0) {
		recentContainer.innerHTML = `<h1>Recent Pokémon</h1><p>No Pokémon saved yet.</p>`;
		return;
	}

	let html = `<h1>Recent Pokémon</h1><div  ">`;

	// shows each saved pokemon
	saved
		.slice()
		.reverse()
		.forEach((p) => {
			html += `
      <div onclick="fetchPokemon('${p.name}')">
        <img src="${p.image}" alt="${p.name}">
        <p>${capitalize(p.name)}</p>
      </div>
    `;
		});

	html += "</div>";
	recentContainer.innerHTML = html;
}
