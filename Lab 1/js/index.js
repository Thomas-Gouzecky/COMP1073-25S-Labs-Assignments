let characterName = `The Incredible Burrito Boy`;
let age = Math.ceil(Math.random()*100);
let isSuperhero = true;
let specialPowers = ["X-Ray Vision", "Mind Reading", "Teleportation", "Telekinesis", "Flight", "Invisibility", "Super Strength", "Immortality"];
const listOfFoods = ["Pizza", "Sushi", "Tacos", "Pasta", "Burgers", "Ice Cream", "Fried Chicken", "Ramen", "Steak", "Burritos"];
let favoriteFood = listOfFoods[9];

let nameField = document.querySelector('#name');
let ageField = document.querySelector('#age');
let favFoodField = document.querySelector('#favFood');
let heroDescription = document.querySelector('#heroDescription');

let randomButton = document.querySelector('button#randomButton');
let createButton = document.querySelector('button');

nameField.placeholder = characterName;
ageField.placeholder = age;
favFoodField.placeholder = favoriteFood;

function randomizeAttr(){
    age = Math.ceil(Math.random()*100);
    favoriteFood = listOfFoods[Math.floor(Math.random() * listOfFoods.length)];
    ageField.placeholder = age;
    favFoodField.placeholder = favoriteFood;
}



randomButton.addEventListener('click', randomizeAttr);