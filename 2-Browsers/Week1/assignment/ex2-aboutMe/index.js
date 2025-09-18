/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
2. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
3. Look in the css file!
------------------------------------------------------------------------------*/

window.onload = function () {
document.getElementById('nickname').textContent = 'Ahmad';
document.getElementById('fav-food').textContent = 'Meat';
document.getElementById('hometown').textContent = 'Rotterdam';


const listItems = document.querySelectorAll('li');
listItems.forEach(li => {
li.classList.add('list-item');
});
};
