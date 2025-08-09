import { Smoothie } from "./smoothie.js";

const orderSmoothie = document.getElementById("orderBtn");

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
