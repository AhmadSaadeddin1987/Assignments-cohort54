/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-5-using-the-vscode-debugger

Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
async function getData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
  }
}

function renderLaureate(l) {
  const name =
    l?.knownName?.en || l?.fullName?.en || l?.knownName || l?.fullName || 'Unknown';

  const birthDate = l?.birth?.date || 'Unknown date';
  const birthPlace =
    l?.birth?.place?.locationString?.en ||
    l?.birth?.place?.locationString ||
    'Unknown place';

  const deathDate = l?.death?.date || '—';
  const deathPlace =
    l?.death?.place?.locationString?.en ||
    l?.death?.place?.locationString ||
    (l?.death ? 'Unknown place' : '—');

  console.log(`\nName:  ${name}`);
  console.log(`Birth: ${birthDate}, ${birthPlace}`);
  console.log(`Death: ${deathDate}${deathPlace !== '—' ? ', ' + deathPlace : ''}`);
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'https://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    const laureates = data?.laureates || [];
    renderLaureates(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();
