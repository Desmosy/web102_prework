/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(GAMES_JSON) {

    // loop over each item in the data
    for (let i = 0; i<GAMES_JSON.length; i++){
         // create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        
        // add the class game-card to the list
        gameCard.classList.add('game-card');
         // set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML=`
        <img src="${GAMES_JSON[i].img} " />
        <h2>${GAMES_JSON[i].name}</h2>
        <p>${GAMES_JSON[i].description}</p>
            <p>Pledged: $${GAMES_JSON[i].pledged}</p>
            <p>Goal: $${GAMES_JSON[i].goal}</p>
            <p>Backers: ${GAMES_JSON[i].backers}</p>
        
        `;
         // append the game to the games-container
        gamesContainer.append(gameCard);
    }

       

}
// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const initialValue=0;
const totalContribution = GAMES_JSON.reduce((accumulator, games)=> accumulator + games.backers, initialValue);
console.log(totalContribution);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML=`

<p>${totalContribution.toLocaleString()}</p>
`;


// grab the amount raised card, then use reduce() to find the total amount raised
const inti=0;
const raisedCard = document.getElementById("total-raised");
const totalAmountRaised = GAMES_JSON.reduce((acc, value )=> acc+value.pledged, inti);
// set inner HTML using template literal
raisedCard.innerHTML=`
<p>$${totalAmountRaised.toLocaleString()}</p>
`
// grab number of games card and set its inner HTML
const gameCardNum = document.getElementById("num-games");
const totalNumGames = GAMES_JSON.length;
gameCardNum.innerHTML = `
    <p>${totalNumGames}</p>
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    const unmet = GAMES_JSON.filter(game => (Number(game.pledged) < Number(game.goal)));

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unmet);
    // use the function we previously created to add the unfunded games to the DOM
 
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => {
        const pledged = parseInt(game.pledged, 10);
        const goal = parseInt(game.goal, 10);

        // Debugging log
        console.log(`Pledged: ${pledged}, Goal: ${goal}`);

        // Return true if pledged is greater than or equal to goal
        return pledged >= goal;
    });

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce((count,game)=>(game.pledged<game.goal?count+1: count),0);

// create a string that explains the number of unfunded games using the ternary operator
const unfundedString = unfundedGames===0?"All the games has been funded!": `There are ${unfundedGames} games that needs funding.`;

// create a new DOM element containing the template string and append it to the description container
const newDom = document.createElement('p');
newDom.textContent=unfundedString;
descriptionContainer.append(newDom)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});


function newGameCard(game){
    const gameCard = document.createElement('div');

    gameCard.innerHTML = `
        
        <h2>${game.name}</h2>
        
    `;
    return gameCard;  
}

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remaining]= sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledge = newGameCard(firstGame);
firstGameContainer.appendChild(topPledge);

// do the same for the runner up item
const runner = newGameCard(secondGame);
secondGameContainer.appendChild(runner);