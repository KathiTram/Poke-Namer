pokeId = Math.floor(Math.random() * 905) + 1;
score = 0;
highscoreCount = 0;

isGuessRight = document.getElementById("isGuessRight");
guessStreak = document.getElementById("guessstreak");
guessStreak.textContent = score;
highScoreBox = document.getElementById("highscore");
highScoreBox.textContent = highscoreCount;
continueButton = document.getElementById("continuebtn");
userInput = document.getElementById("userGuess");

userInput.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("submitbtn").click();
	}
});

async function getRandomPokemon(id) {
	let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	pokemon = await response.json();
	return(pokemon.name);
}

function getPokemonImage(id) {		
	pokemonImage = document.getElementById('pokemon-image').src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

async function compareNames() {
	let pokemonName = await getRandomPokemon(pokeId);
	if (pokemonName.indexOf("-") > -1) {
		pokeArray = pokemonName.split("-");
		pokemonName = pokeArray[0];
	}
	let userGuess = document.getElementById("userGuess").value;
	if (userGuess.toLowerCase() == pokemonName.toLowerCase()) {
		isGuessRight.textContent = "You guessed correctly!";
		score += 1;
		guessStreak.textContent = score;
		isHighscore();
	} else {
		isGuessRight.textContent = `WRONG! The Pokemon is ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}`;
		score = 0;
		guessStreak.textContent = score;
	}
	continueButton.style.display = "block"
}

getPokemonImage(pokeId);

function continueBtnPressed() {
	pokeId = Math.floor(Math.random() * 905) + 1;
	getPokemonImage(pokeId);
	getRandomPokemon(pokeId);
}

function isHighscore() {
	if (score > highscoreCount) {
		highscoreCount = score;
		highScoreBox.textContent = highscoreCount;
	}
}





