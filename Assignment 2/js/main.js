import { Smoothie } from "./smoothie.js";

// variables needed
const orderSmoothie = document.getElementById("orderBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalWindow = document.getElementById("modalWindow");
const modalContent = document.getElementById("modalContent");
const modalCloseBtn = document.getElementById("modalCloseBtn");

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

	const capitalizedSize =
		smoothieOrder.size.charAt(0).toUpperCase() +
		smoothieOrder.size.slice(1);

	// text to fill the modal
	const smoothieDisplayText = `
    <p><strong>Customer: </strong> ${smoothieOrder.customerName}</p>
    <p><strong>Size: </strong> ${capitalizedSize}</p>
    <p><strong>Base: </strong> ${smoothieOrder.base}</p>
    <p><strong>Fruits:</strong> ${smoothieOrder.fruits.join(", ") || "None"}</p>
    <p><strong>Boosters:</strong> ${
		smoothieOrder.boosters.join(", ") || "None"
	}</p>
    `;

	// display the modal
	openModal(smoothieDisplayText);
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

// function thats called when the user creates a smoothie
function openModal(smoothieDisplayText) {
	modalContent.innerHTML = smoothieDisplayText;
	modalOverlay.classList.remove("hidden");
	modalWindow.classList.remove("hidden");
}

function closeModal() {
	modalOverlay.classList.add("hidden");
	modalWindow.classList.add("hidden");
}

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
