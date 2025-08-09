export class Smoothie {
	constructor(customerName, size, base, fruits, boosters) {
		this.customerName = customerName;
		this.size = size;
		this.base = base;
		this.fruits = fruits;
		this.boosters = boosters;
	}

	fruitEmojis() {
		let emojis = [];

		if (this.fruits.includes("Mango")) emojis.push("🥭 Mango 🥭");
		if (this.fruits.includes("Strawberry")) emojis.push("🍓 Strawberry 🍓");
		if (this.fruits.includes("Banana")) emojis.push("🍌 Banana 🍌");
		if (this.fruits.includes("Blueberry")) emojis.push("🫐 Grape 🫐");
		if (this.fruits.includes("Pineapple")) emojis.push("🍍 Pineapple 🍍");

		return emojis.join(", ");
	}
}
