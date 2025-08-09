import { Smoothie } from "./smoothie.js";

const orderSmoothie = document.getElementById("orderBtn");

// creates the smoothie object when the order smoothie button is clicked
orderSmoothie.addEventListener("click", () => {
	let customerName = document.getElementById("customerName").value;
	let size = document.getElementById("size").value;
	let base = document.querySelector('input[name="base"]:checked').value;

	let fruits = Array.from(
		document.querySelectorAll('input[name="fruit"]:checked')
	).map((f) => f.value);

	let boosters = Array.from(
		document.querySelectorAll('input[name="booster"]:checked')
	).map((b) => b.value);

	let smoothieOrder = new Smoothie(
		customerName,
		size,
		base,
		fruits,
		boosters
	);

	console.log(smoothieOrder);
});

// dynamically assign classes to labels to visually show what is clicked
document.querySelectorAll("label").forEach((label) => {
	let input = label.querySelector("input");
	// not all labels have a child input
	if (input != null) {
		input.addEventListener("change", () => {
			if (input.type === "radio") {
				// remove all the radio buttons with the checked class
				document
					.querySelectorAll(`input[name="${input.name}"]`)
					.forEach((radio) =>
						radio.parentElement.classList.remove("checked")
					);

				// assign only the selected radio the class
				if (input.checked) {
					label.classList.add("checked");
				}
			}
			// assign the label the checked class if its checked
			if (input.checked) {
				label.classList.add("checked");
			} else {
				label.classList.remove("checked");
			}
		});
	}
});
