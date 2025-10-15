  /*------------------------------------------------------------------------------
  Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-4-dice-race

  1. Complete the function `rollDice()` by using `.map()` on the `dice` array 
    to create an array of promises for use with `Promise.race()`.
  2. Refactor the function `main()` using async/await and try/catch.
  3. Once you got this working, you may observe that some dice continue rolling 
    for some undetermined time after the promise returned by `Promise.race()` 
    resolves. Do you know why? Add your answer as a comment to the bottom of the 
    file.
  ------------------------------------------------------------------------------*/
// ! Do not remove these lines
import { rollDie } from '../../helpers/pokerDiceRoller.js';
/** @import {DieFace} from "../../helpers/pokerDiceRoller.js" */

export function rollDice() {
  const dice = [1, 2, 3, 4, 5];

  const dicePromises = dice.map(() => rollDie());

  return Promise.race(dicePromises);
}

async function main() {
  try {
    const result = await rollDice();
    console.log('Resolved! The winning die rolled:', result);
  } catch (error) {
    console.log('Rejected!', error.message);
  }
}
// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
// Answer to question 3:
/* Because Promise.race() resolves or rejects as soon as one of the promises in the iterable resolves or rejects,
   the other promises continue to execute in the background until they complete, even after the race is decided. */