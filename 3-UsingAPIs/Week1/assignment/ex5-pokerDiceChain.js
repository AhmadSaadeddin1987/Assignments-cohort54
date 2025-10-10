/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-5-throw-dice-sequentially

In the previous exercise we used `Promise.all()` to throw five dice in one go.
In the current exercise we will be throwing five dice one at a time, waiting 
for a die to settle before throwing the next one. Of course, we still consider 
a die rolling off the table to be a showstopper.

To throw the dice sequentially we will be using a _promise chain_. Your job is 
to expand the given promise chain to include five dice.
------------------------------------------------------------------------------*/

// The line below makes the rollDie() function available to this file.
// Do not change or remove it.
import { rollDie } from '../../helpers/pokerDiceRoller.js';

export function rollDice() {
  const results = [];

  // Helper function: rolls a die, stores the result, and returns the promise
  function rollAndStore(n) {
    return rollDie(n).then((value) => {
      results.push(value);
      return value;
    });
  }

  // Chain all rolls sequentially using the helper
  return rollAndStore(1)
    .then(() => rollAndStore(2))
    .then(() => rollAndStore(3))
    .then(() => rollAndStore(4))
    .then(() => rollAndStore(5))
    .then(() => results);
}
function main() {
  rollDice()
    .then((results) => console.log('Resolved!', results))
    .catch((error) => console.log('Rejected!', error.message));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
