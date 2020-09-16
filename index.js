import { fifaData } from "./fifa.js";
console.log(fifaData);

console.log("its working");
// ⚽️ M  V P ⚽️ //

//  Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data

// (a) Home Team name for 2014 world cup final
// let finals = fifaData.filter(function (item) {
//   if (item.Year === 2014 && item.Stage === "Final") {
//     return item;
//   }
// });
// let homeTeam = finals.map(function (item) {
//   return item["Home Team Name"];
// });
// console.log(homeTeam);

// fifaData.forEach(function (item, index) {
//   if (item.Year === 2014 && item.Stage === "Final") {
//     console.log(item["Home Team Name"]);
//   }
// });

// const teamName = fifaData.filter(
//   (item) => item["Stage"] === "Final" && item["Year"] === 2014
// );
// console.log(teamName);
const finalsObj = fifaData.filter(function (item) {
  return item.Year === 2014 && item.Stage === "Final";
});
const homeTeamName = finalsObj.map(function (item) {
  return item["Home Team Name"];
});
console.log(homeTeamName);
// (b) Away Team name for 2014 world cup final
// let awayTeam = finals.map(function (item) {
//   return item["Away Team Name"];
// });
// console.log(awayTeam);
// fifaData.forEach(function (item, index) {
//   if (item.Year === 2014 && item.Stage === "Final") {
//     console.log(item["Away Team Name"]);
//   }
// });
const awayTeamName = finalsObj.map(function (item) {
  return item["Away Team Name"];
});
console.log(awayTeamName);
// (c) Home Team goals for 2014 world cup final
// let homeTeamGoals = finals.map(function (item) {
//   return item["Home Team Goals"];
// });
// console.log(homeTeamGoals);
// fifaData.forEach(function (item, index) {
//   if (item.Year === 2014 && item.Stage === "Final") {
//     console.log(item["Home Team Goals"]);
//   }
// });
const homeTeamGoals = finalsObj.map(function (item) {
  return item["Home Team Goals"];
});
console.log(homeTeamGoals);
// (d) Away Team goals for 2014 world cup final
// let awayTeamGoals = finals.map(function (item) {
//   return item["Away Team Goals"];
// });
// console.log(awayTeamGoals);
// fifaData.forEach(function (item, index) {
//   if (item.Year === 2014 && item.Stage === "Final") {
//     console.log(item["Away Team Goals"]);
//   }
// });
const awayTeamGoals = finalsObj.map(function (item) {
  return item["Away Team Goals"];
});
console.log(awayTeamGoals);
// (e) Winner of 2014 world cup final
// fifaData.forEach(function (item, index) {
//   if (item["Home Team Goals"] > item["Away Team Goals"]) {
//     console.log("Home Team Won");
//   } else {
//     console.log("Away Team Won");
//   }
// });
// const winner = finalsObj.filter(function (item){
//   return item.homeTeamGoals
// })

const winner = finalsObj.map(function (item) {
  // return item["Home Team Name"] && item["Home Team Goals"];
  if (item["Home Team Goals"] > item["Away Team Goals"]) {
    return item["Home Team Name"];
  } else {
    return item["Away Team Name"];
  }
});
console.log(winner);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

// function getFinals(data) {
//   const finals = fifaData.filter(function (item) {
//     if (item.Stage === "Final") {
//       return item;
//     }
//   });
//   return finals;
// }
// console.log(getFinals(fifaData));

function getFinals(data) {
  const finals = data.filter((item) => item["Stage"] === "Final");
  return finals;
}
console.log(getFinals(fifaData));
/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

// function getYears(callback) {
//   let finalsData = callback();

//   let years = finalsData.map(function (item) {
//     return item.Year;
//   });
//   return years;
// }

// console.log(getYears(getFinals));

function getYears(callback, data) {
  let finalsData = callback(data);
  let years = finalsData.map(function (item) {
    return item.Year;
  });
  return years;
}
console.log(getYears(getFinals, fifaData));
/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWinners(callback, data) {
  let finalsData = callback(data);

  let winners = [];

  for (let i = 0; i < finalsData.length; i++) {
    if (finalsData[i]["Away Team Goals"] > finalsData[i]["Home Team Goals"]) {
      winners.push(finalsData[i]["Away Team Name"]);
    } else {
      winners.push(finalsData[i]["Home Team Name"]);
    }
  }
  return winners;
}

console.log(getWinners(getFinals, fifaData));
// function getWinners(callback) {
//   let finalsData = callback();
//   let winners = [];

//   for (let i = 0; i < finalsData.length; i++) {
//     if (finalsData[i]["Away Team Goals"] > finalsData[i]["Home Team Goals"]) {
//       winners.push(finalsData[i]["Away Team Name"]);
//     } else {
//       winners.push(finalsData[i]["Home Team Name"]);
//     }
//   }
//   return winners;
// }
// console.log(getWinners(getFinals));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(cb1, cb2, data) {
  let winnerArray = [];

  for (let i = 0; i < cb1.length; i++) {
    winnerArray.push(`In ${cb2[i]}, ${cb1[i]} won the world cup`);
  }
  return winnerArray;
}

console.log(
  getWinnersByYear(
    getWinners(getFinals, fifaData),
    getYears(getFinals, fifaData)
  )
);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
  let homeGoals = data.reduce(function (accum, score) {
    return accum + score["Home Team Goals"];
  }, 0);
  let awayGoals = data.reduce(function (accum, score) {
    return accum + score["Away Team Goals"];
  }, 0);
  return `Average home goals per game: ${
    homeGoals / data.length
  } Average away goals per game:${awayGoals / data.length}`;
}

// getAverageGoals();
console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {
  /* code here */
}

getCountryWins();

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

getGoals();

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
