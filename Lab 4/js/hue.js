// STEP 7a: Add the URL for the bridge
const bridge = "192.168.1.41";
// STEP 7b: Add a constant for your specific username
const user = "ThomasHue";
// STEP 7c: Add another constant for your light number
const lightNum = "1";
// STEP 7d: Just like the debugger app that runs on the bridge, we need to choose a method to use to interact with the API - use 'put'
let method = "PUT";
// STEP 7e: Build out the URL for the RESTful call to the API, combining the bridge URL, user, and lightNum - building out the correct path in the format http://192.168.0.0/api/[username]/lights/[lightNum]/state
const endpoint = `http://${bridge}/api/${user}/lights/${lightNum}/state`;

const html = document.querySelector("html");
const hueSlider = document.getElementById("hue");
const satSlider = document.getElementById("saturation");
const briSlider = document.getElementById("brightness");
const toggleButton = document.getElementById("toggle");

let lightOn = true; // Variable to track the light state

// STEP 9a: Examine the below event listener for the range slider
hueSlider.addEventListener(
	"change",
	function () {
		var newHue = this.value * 1000;
		let newSat = parseInt(satSlider.value);
		let newBri = parseInt(briSlider.value);

		updateScreenColor(newHue, newSat, newBri);

		var commands = {
			on: !lightOn,
			hue: newHue,
			sat: parseInt(satSlider.value),
			bri: parseInt(briSlider.value),
		};
		// STEP 9b: Invoke the completed updateLight() function when the hueSlider value changes
		updateLight(commands);
	},
	false
);

satSlider.addEventListener(
	"change",
	function () {
		let newHue = parseInt(hueSlider.value) * 1000;
		var newSat = parseInt(this.value);
		let newBri = parseInt(briSlider.value);

		updateScreenColor(newHue, newSat, newBri);
		var commands = {
			on: !lightOn,
			hue: parseInt(hueSlider.value) * 1000,
			sat: newSat,
			bri: parseInt(briSlider.value),
		};
		updateLight(commands);
	},
	false
);

briSlider.addEventListener(
	"change",
	function () {
		let newHue = parseInt(hueSlider.value) * 1000;
		let newSat = parseInt(satSlider.value);
		var newBri = parseInt(this.value);

		updateScreenColor(newHue, newSat, newBri);

		var commands = {
			on: !lightOn,
			hue: parseInt(hueSlider.value) * 1000,
			sat: parseInt(satSlider.value),
			bri: newBri,
		};
		updateLight(commands);
	},
	false
);

toggleButton.addEventListener("click", function () {
	lightOn = !lightOn;
	log = lightOn ? "Light is Off" : "Light is On";
	console.log(log);

	let newHue = parseInt(hueSlider.value) * 1000;
	let newSat = parseInt(satSlider.value);
	var newBri = lightOn ? 0 : parseInt(briSlider.value);

	updateScreenColor(newHue, newSat, newBri);

	updateLight({
		on: !lightOn,
	});
});

// Function that changes the page color based on the value of the slider
function updateScreenColor(newHue, newSat, newBri) {
	cssHue = Math.round((newHue / 48000) * 240); // "Both 0 and 65535 are red, 25500 is green and 46920 is blue." (https://developers.meethue.com/develop/hue-api/lights-api/)
	cssSat = Math.round((newSat / 254) * 100); // Convert saturation to percentage
	cssBrightness = lightOn ? 0 : Math.round((newBri / 254) * 100); // Convert brightness to percentage

	bgCSSValue = `hsl(${cssHue}deg, ${cssSat}%, ${cssBrightness}%)`;
	console.log(bgCSSValue);
	html.style.backgroundColor = bgCSSValue;
}

// STEP 8: Function to update the hue light by passing JSON to the bridge
function updateLight(bodyData) {
	console.log("Sending to Hue API: ", endpoint, bodyData);
	fetch(endpoint, {
		method: method,
		body: JSON.stringify(bodyData), // Convert the bodyData to a JSON string
	})
		.then((response) => response.json()) // Parse the response to JSON
		.then((data) => {
			console.log("Light updated successfully:", data);
		})
		.catch((error) => {
			console.error("Error updating the light:", error);
		});
}
