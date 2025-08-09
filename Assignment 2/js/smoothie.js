export class Smoothie {
	constructor(customerName, size, base, fruits, boosters) {
		this.customerName = customerName;
		this.size = size;
		this.base = base;
		this.fruits = fruits;
		this.boosters = boosters;
	}

	fruitEmojis() {
		if (this.fruits.inclues("Mango")) return "🥭";
		if (this.fruits.includes("Strawberry")) return "🍓";
		if (this.fruits.includes("Banana")) return "🍌";
		if (this.fruits.includes("Blueberry")) return "🫐";
		if (this.fruits.includes("Pineapple")) return "🍍";
	}
}
