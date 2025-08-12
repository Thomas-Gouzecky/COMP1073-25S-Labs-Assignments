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
	} catch (err) {
		pokedataDiv.innerHTML = `<p style="color:red">${err.message}</p>`;
	}
	pokedataDiv.classList.add("card");
});

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
