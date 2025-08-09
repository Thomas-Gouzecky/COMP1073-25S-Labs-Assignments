class Smoothie {
	constructor(options) {
		this.customer = options.customer;
		this.size = options.size;
		this.base = options.base;
		this.fruits = options.fruits.slice();
		this.boosters = options.fruits.slice();
	}

	fruitEmojis() {
		if (this.fruits.inclues("Mango")) return "🥭";
		if (this.fruits.includes("Strawberry")) return "🍓";
		if (this.fruits.includes("Banana")) return "🍌";
		if (this.fruits.includes("Blueberry")) return "🫐";
		if (this.fruits.includes("Pineapple")) return "🍍";
	}
}
