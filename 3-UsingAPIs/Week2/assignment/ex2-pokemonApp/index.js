/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

async function fetchAndPopulatePokemons(selectElement) {
  try {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const data = await fetchData(apiUrl); // get list of first 151 Pokémon
    console.log('Pokémon list:', data);

    // Clear the dropdown and add a default option
    selectElement.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose a Pokémon --';
    selectElement.appendChild(defaultOption);

    // Add each Pokémon name to the dropdown
    data.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.url;
      option.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading Pokémon list:', error);
    const errorOption = document.createElement('option');
    errorOption.textContent = 'Failed to load Pokémon 😢';
    selectElement.appendChild(errorOption);
  }
}

async function fetchImage(selectElement, imageElement, infoElement) {
  const selectedUrl = selectElement.value;

  if (!selectedUrl) {
    imageElement.style.display = 'none';
    infoElement.textContent = '';
    return;
  }

  try {
    const data = await fetchData(selectedUrl);
    console.log('Pokémon details:', data);

    // Show the Pokémon image and some info
    const imageUrl =
      data.sprites.other['official-artwork'].front_default ||
      data.sprites.front_default;

    imageElement.src = imageUrl;
    imageElement.alt = data.name;
    imageElement.style.display = 'block';

    infoElement.textContent = `Name: ${
      data.name
    } | Height: ${data.height} | Weight: ${data.weight}`;
  } catch (error) {
    console.error('Error loading Pokémon details:', error);
    infoElement.textContent = 'Error loading Pokémon details 😢';
    imageElement.style.display = 'none';
  }
}

async function main() {
  // Create elements
  const title = document.createElement('h1');
  title.textContent = 'PokemonsApp';

  const select = document.createElement('select');
  const image = document.createElement('img');
  image.style.display = 'none';
  image.style.maxWidth = '200px';
  const info = document.createElement('p');

  // Add everything to the page
  document.body.appendChild(title);
  document.body.appendChild(select);
  document.body.appendChild(image);
  document.body.appendChild(info);

  await fetchAndPopulatePokemons(select);

  select.addEventListener('change', () => {
    fetchImage(select, image, info);
  });
}
window.addEventListener('load', main);