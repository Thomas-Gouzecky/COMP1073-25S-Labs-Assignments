// get variables

const infoBtn = document.getElementById("getInfo");
const pokemonNameInput = document.getElementById("pokemonName");
const pokedataDiv = document.getElementById("pokemonData");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

infoBtn.addEventListener("click", () => fetchPokemon(pokemonNameInput.value));

// everytime the window loads, load all the recent pokemon
window.onload = () => {
	displayRecentPokemon();
};

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// get the pokemon
async function fetchPokemon(name) {
	const url = baseURL + name.toLowerCase();
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Pokemon not Found");
		// gets the json data if the response is ok (200)
		const pokemonData = await response.json();

		displayPokemonData(pokemonData);

		savePokemon(pokemonData);
	} catch (error) {
		pokedataDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
	}
	if (!pokedataDiv.classList.contains("card")) pokedataDiv.classList.add("card");
}

function displayPokemonData(pokemonData) {
	const normalSprite = pokemonData.sprites.front_default;
	const shinySprite = pokemonData.sprites.front_shiny;

	let html = `
          <h2>${pokemonData.name.toUpperCase()}</h2>
          <img id="pokemonImage" src="${normalSprite}" alt="${pokemonData.name}">
        `;

	// lbs
	const pokemonWeight = (pokemonData.weight * 0.220462).toFixed(2);

	// feet
	const totalInches = pokemonData.height * 3.937;
	const feet = Math.floor(totalInches / 12);
	const inches = Math.round(totalInches % 12);

	// adding content to display for the user
	html += `<p>Height: ${feet}' ${inches}" </p>`;
	html += `<p>Weight: ${pokemonWeight}lbs</p>`;
	html += `<p>Types: ${pokemonData.types.map((t) => capitalize(t.type.name)).join(" / ")}</p>`;
	html += `<p>Abilities: ${pokemonData.abilities.map((a) => capitalize(a.ability.name)).join(" / ")}</p>`;

	// add the button to change the shiny sprite
	html += `<button id="toggleShinyBtn">Show Shiny</button>`;

	// displaying the content
	pokedataDiv.innerHTML = html;

	// add shiny toggle

	// variables
	const toggleBtn = document.getElementById("toggleShinyBtn");
	const pokeImg = document.getElementById("pokemonImage");

	let isShiny = false;

	toggleBtn.addEventListener("click", () => {
		if (isShiny) {
			pokeImg.src = normalSprite;
			toggleBtn.textContent = "Show Shiny";
		} else {
			// if the shiny sprite exists (not null)
			if (shinySprite) {
				pokeImg.src = shinySprite;
				toggleBtn.textContent = "Show Normal";
			}
		}
		isShiny = !isShiny;
	});
}

// Save pokemon to localStorage API
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

// Show the recent pokemon viewed
async function displayRecentPokemon() {
	const recentContainer = document.querySelector(".recent-container");

	// gets the json for all the recent pokemon saved in localStorage -> in an array
	let saved = JSON.parse(localStorage.getItem("recentPokemon") || "[]");

	if (saved.length === 0) {
		recentContainer.innerHTML = `<p>No Pokémon saved yet.</p>`;
		return;
	}

	let html = ``;

	// shows each saved pokemon
	saved
		.slice()
		.reverse()
		.forEach((p) => {
			html += `
      <div class="small-card" onclick="fetchPokemon('${p.name}')">
        <img src="${p.image}" alt="${p.name}">
        <p class="pokemonName">${capitalize(p.name)}</p>
      </div>
    `;
		});

	recentContainer.innerHTML = html;
}
