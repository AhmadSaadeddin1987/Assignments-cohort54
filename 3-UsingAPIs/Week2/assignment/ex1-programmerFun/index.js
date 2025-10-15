  /*------------------------------------------------------------------------------
  Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-1-programmer-fun

  1. Complete the function `requestData()` using `fetch()` to make a request to 
    the url passed to it as an argument. The function should return a promise. 
    Make sure that the promise is rejected in case of HTTP or network errors.
  2. Notice that the function `main()` calls `requestData()`, passing it the url 
    `https://xkcd.now.sh/?comic=latest`. Try and run the code in the browser and 
    open the browser's console to inspect the data returned from the request.
  3. Next, complete the function `renderImage()` to render an image as an `<img>` 
    element appended to the document's body, using the data returned from the API.
  4. Complete the function `renderError()` to render any errors as an `<h1>` 
    element appended to the document's body.
  5. Refactor the `main()` function to use `async/await`.
  6. Test error handling, for instance, by temporarily changing the `.sh` in the 
    url with `.shx`. There is no server at the modified url, therefore this 
    should result in a network (DNS) error.
  ------------------------------------------------------------------------------*/

  async function requestData(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
const data = await response.json();
        return data;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Network error: ${error.message}`);
      throw error;
    }
}

function renderImage(data) {
  console.log('API response:', data);

  const title = document.createElement('h2');
  title.textContent = data.title || 'Latest Comic';
  title.style.textAlign = 'center';

  const img = document.createElement('img');
  img.src = data.img;
  img.alt = data.alt || 'Comic';
  img.style.display = 'block';
  img.style.margin = '0 auto';

  document.body.append(title);
  document.body.append(img);
}

function renderError(error) {
  console.log('Error details:', error);

  const errorMsg = document.createElement('h1');
  errorMsg.textContent = `Error: ${error.message}`;
  errorMsg.style.color = 'red';
  errorMsg.style.textAlign = 'center';
  errorMsg.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(errorMsg);
}
async function main() {
  const url = 'https://xkcd.now.sh/?comic=latest';

  try {
    const data = await requestData(url);
    renderImage(data);
  } catch (error) {
    renderError(error);
  }
}
window.addEventListener('load', main);
