// get variables

const infoBtn = document.getElementById("getInfo");
const pokemonNameInput = document.getElementById("pokemonName");
const pokedataDiv = document.getElementById("pokemonData");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

infoBtn.addEventListener("click", async () => {
	var pokemonName = pokemonNameInput.value.toLowerCase();
	var url = baseURL + pokemonName;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Pokemon not Found");
		}
		const pokemonData = await response.json();

		// Basic output (Getting Started)
		let html = `
          <h2>${pokemonData.name.toUpperCase()}</h2>
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        `;

		// Expanded output (more than the example)
		html += `<p>Height: ${pokemonData.height}</p>`;
		html += `<p>Weight: ${pokemonData.weight}</p>`;
		html += `<p>Types: ${pokemonData.types.map((t) => t.type.name).join(", ")}</p>`;
		html += `<p>Abilities: ${pokemonData.abilities.map((a) => a.ability.name).join(", ")}</p>`;

		pokedataDiv.innerHTML = html;
	} catch (err) {
		pokedataDiv.innerHTML = `<p style="color:red">${err.message}</p>`;
	}
	pokedataDiv.classList.add("card");
});
