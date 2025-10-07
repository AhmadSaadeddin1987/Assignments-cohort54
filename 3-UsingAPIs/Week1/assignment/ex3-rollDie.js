/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

export function rollDie() {
  return new Promise((resolve, reject) => {
    // Compute a random number of rolls (3-10) that the die MUST complete
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      // Compute a random die value for the current roll
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);

      // If the die rolled more than 6 times, reject the promise
      if (roll > 6) {
        reject(new Error('Oops... Die rolled off the table.'));
        return;
      }

      // If finished rolling successfully, resolve with the final value
      if (roll === randomRollsToDo) {
        resolve(value);
        return;
      }

      // Schedule the next roll until no more rolls to do
      setTimeout(() => rollOnce(roll + 1), 500);
    };

    // Start the initial roll
    rollOnce(1);
  });
}

function main() {
  rollDie()
    .then((value) => {
      console.log(`Success! Die settled on ${value}.`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

/* With Promises, the computation "settles" only once. After the first resolve() or
reject(), further calls are ignored. We also added explicit `return` statements
right after resolve/reject to prevent any further scheduling. As a result, the
described problem no longer occurs.*/
