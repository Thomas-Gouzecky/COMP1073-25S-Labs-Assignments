let characterName = `The Incredible Burrito Boy`;
let age = Math.ceil(Math.random()*100);
let isSuperhero = true;
const specialPowers = ["X-Ray Vision", "Mind Reading", "Teleportation", "Telekinesis", "Flight", "Invisibility", "Super Strength", "Immortality"];
const listOfFoods = ["Pizza", "Sushi", "Tacos", "Pasta", "Burgers", "Ice Cream", "Fried Chicken", "Ramen", "Steak", "Burritos"];
let favoriteFood = listOfFoods[9];

let nameField = document.querySelector('#name');
let ageField = document.querySelector('#age');
let favFoodField = document.querySelector('#favFood');
let heroDescription = document.querySelector('#heroDescription');

let randomButton = document.querySelector('button#randomButton');
let createButton = document.querySelector('button#create');
let superpowersButton = document.querySelector('#superpowerToggle');

nameField.value = characterName;
ageField.value = age;
favFoodField.value = favoriteFood;
superpowersButton.checked = isSuperhero;

function randomizeAttr(){
    age = Math.ceil(Math.random()*100);
    favoriteFood = listOfFoods[Math.floor(Math.random() * listOfFoods.length)];
    ageField.value = age;
    favFoodField.value = favoriteFood;

    if (Math.round(Math.random()) === 1){
        isSuperhero = true;
    }
    else{
        isSuperhero = false;
    }

    superpowersButton.checked = isSuperhero;
}

function createCharacter(){

    characterName = nameField.value;
    age = ageField.value;
    favoriteFood = favFoodField.value;

    let description = `Meet the ${age} year old, ${favoriteFood} loving, ${characterName}!`;

    if(isSuperhero){
        let power = specialPowers[Math.floor(Math.random() * specialPowers.length)];
        description += ` With the power of ${power}, you don't want to mess with them!`;
    }
    heroDescription.textContent = description;
}

createButton.addEventListener('click', createCharacter);
randomButton.addEventListener('click', randomizeAttr);