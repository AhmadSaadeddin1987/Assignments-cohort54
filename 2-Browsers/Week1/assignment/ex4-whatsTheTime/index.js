/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
  function addCurrentTime() {
  
    const timeElement = document.createElement('div');
    timeElement.id = 'time';
    timeElement.style.fontSize = '4em';
    timeElement.style.textAlign = 'center';
    timeElement.style.marginTop = '360px';
    document.body.appendChild(timeElement);


  setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB');
      timeElement.textContent = `Current time: ${timeString}`;
      console.log(timeString);
    }, 1000);
  }
  window.addEventListener('load', addCurrentTime);
