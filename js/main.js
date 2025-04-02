'use strict';

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonCardContainer = document.getElementById("pokemon-card-container");



function notification() {
  const notificationOptions = {
    body: "Pika Pika Pikachu",
    icon: "./icons/pikachu.jpg"
  };
  new Notification("¡Mira un pikachu!", notificationOptions);
}

window.addEventListener('load', () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    notification();
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(res => console.log('El service worker se registró correctamente'))
    .catch(err => console.log('No se pudo registrar el service worker', err));
}

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(response => response.json())
  .then(data => {
    data.results.forEach(pokemon => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then(pokemonData => {
          const pokemonCard = `
            <div class="col-sm-6 col-md-4 col-lg-3">
              <div class="card mb-5">
                <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                <div class="card-body">
                  <h5 class="card-title">${pokemonData.name}</h5>
                  <p class="card-text">Tipo: ${pokemonData.types[0].type.name}</p>
                </div>
              </div>
            </div>
          `;
          pokemonCardContainer.insertAdjacentHTML("beforeend", pokemonCard);
        });
    });
  })
  .catch(error => console.error(error));

const pokemonSelect = document.getElementById("pokemonSelect");
const pokemonCardsContainer = document.getElementById("pokemonCards");

const fetchPokemonData = async (pokemonName) => {
  const response = await fetch(apiUrl + pokemonName);
  const data = await response.json();
  return data;
};

const createPokemonCard = (pokemon) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;
  image.classList.add("card-img-top");
  card.appendChild(image);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = pokemon.name;
  cardBody.appendChild(title);

  const type = document.createElement("p");
  type.classList.add("card-text");
  type.textContent = `Type: ${pokemon.types[0].type.name}`;
  cardBody.appendChild(type);
  card.appendChild(cardBody);

  return card;
};

const clearPokemonCards = () => {
  while (pokemonCardsContainer.firstChild) {
    pokemonCardsContainer.firstChild.remove();
  }
};

const loadPokemonCards = async () => {
  const selectedPokemon = pokemonSelect.value;
  if (selectedPokemon === "") return;

  clearPokemonCards();

  try {
    const pokemonData = await fetchPokemonData(selectedPokemon);
    const card = createPokemonCard(pokemonData);
    pokemonCardsContainer.appendChild(card);
  } catch (error) {
    console.log("Error al obtener los datos del Pokémon:", error);
  }
};

pokemonSelect.addEventListener("change", loadPokemonCards);

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    const installPromptEvent = event;
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('La PWA ha sido instalada correctamente.');
        }
        installButton.style.display = 'none';
      });
    });
  });
}


const onlineH1 = document.getElementById("online");

function handleConnectionChange() {
  const isOnline = navigator.onLine;

  if (isOnline) {
    onlineH1.style.color = "green";
  } else {
    onlineH1.style.color = "red";
  }
}

const form = document.getElementById('search-form');
const input = document.getElementById('input');
const historyContainer = document.getElementById('historyContainer');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = input.value;
  let history = localStorage.getItem('History'); 

  if (!history) {
    history = [];
  } else {
    history = JSON.parse(history);
  }


  history.push(value);

  localStorage.setItem('History', JSON.stringify(history));

  input.value = '';

  renderHistory(history);
});

function renderHistory(history) {
  historyContainer.innerHTML = '';

  history.forEach((value) => {
    const listItem = document.createElement('li');
    listItem.textContent = value;
    historyContainer.appendChild(listItem);
  });
}

const storedHistory = localStorage.getItem('History');
if (storedHistory) {
  const parsedHistory = JSON.parse(storedHistory);
  renderHistory(parsedHistory);
}




document.addEventListener("DOMContentLoaded", handleConnectionChange);
setInterval(handleConnectionChange, 1000);

function sharePokemon() {
  if (navigator.share) {
    navigator.share({
      title: "¡Mira este pagina de Pokémon!",
      text: `Tenes toda la informacion del mundo de pokemon`,
      url: 'https://www.wikidex.net/wiki/WikiDex'
    })
      .then(() => console.log("Contenido compartido exitosamente."))
      .catch((error) => console.log("Error al compartir:", error));
  } else {
    console.log("La función de compartir no está disponible en este navegador.");
  }
}