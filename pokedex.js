/*const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}*/
// API variable setup and HTML element variable setup

const url = "https://pokeapi.co/api/v2/pokemon/";
let pokemon = "";

const searchBox = document.getElementsByClassName("search-box")[0];
const searchButton = document.getElementsByClassName("search-button")[0];
const resultDiv = document.getElementsByClassName("result")[0];
const lights = document.getElementsByClassName("pokedex-lights-sm-light");

const pokemonImg = document.getElementsByClassName("pokedex-screen-image")[0];
const pokemonName = document.getElementsByClassName("pokemon-name")[0];
const pokemonTypes = document.getElementsByClassName("pokemon-types")[0];
const pokemonStats = document.getElementsByClassName("pokemon-stats")[0];
const pokemonMoves = document.getElementsByClassName("pokemon-moves")[0];

// runSearch function

function runSearch() {
  clearPokemon();
  
  pokemon = searchBox.value.toLowerCase();
  searchBox.value = "";
  
  // Starts the blinking lights
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.add("blink");
  }
  
  pokemonName.innerHTML = "Loading...";
  
  // Call API
  setTimeout(function() {
  let fullURL = url + pokemon;
  
    fetch(fullURL)
    .then(function(response) {
        if (!response.ok) { // No Pokemon found
            displayError();
        }
        //console.log(response.json());
        return response.json();
    })
    .then(displayPokemon);
  } , 1500);

}

// Display no Pokemon found function

function displayError() {
  // Stop the blinking lights
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("blink");
  }
  clearPokemon();
  
  pokemonImg.src = "./assets/img/pokeball.png";
  pokemonName.innerHTML = "No Pokemon found!";
}

// Display Pokemon function

function displayPokemon(result) {
  // Stops the blinking lights
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("blink");
  }
  
  // Clears any existing result first
  clearPokemon();
  
  let name = result.name.charAt(0).toUpperCase() + result.name.substring(1)
  
  pokemonImg.src = result.sprites["front_default"];
  pokemonName.innerHTML = name + "  #" + result.id;
  
  for (let i = 0; i < result.types.length; i++) {
    let li = document.createElement("li");
    li.classList.add("pokemon-type");
    li.innerHTML = result.types[i].type.name;
    pokemonTypes.appendChild(li);
  }
  for (let i = 0; i < result.stats.length; i++) {
    let li = document.createElement("li");
    li.classList.add("pokemon-stat");
    li.innerHTML = result.stats[i].stat.name + ": " + result.stats[i].base_stat;
    pokemonStats.appendChild(li);
  }
  for (let i = 0; i < result.moves.length; i++) {
    let li = document.createElement("li");
    li.classList.add("pokemon-move");
    li.innerHTML = result.moves[i].move.name;
    pokemonMoves.appendChild(li);
  }
  
}

function clearPokemon() {
    pokemonImg.src = "";
    pokemonName.innerHTML = "";
    pokemonTypes.innerHTML = "";
    pokemonStats.innerHTML = "";
    pokemonMoves.innerHTML = "";
}