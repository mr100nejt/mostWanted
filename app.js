"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application

function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits 
      //make function like above that will trigger if you call it to search by traits instead of names
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!people){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + people[0].firstName + " " + people[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
//at some point this will have to become person[0].firstName and etc. then we can get the other names to filter in and not just billy bob, then the firstName and lastName will have to be fixed
  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}



function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";

    personInfo += "Last Name: " + person.lastName + "\n";

    personInfo += "gender: " + person.gender + "\n";

    personInfo += "height: " + person.height + "\n";

    personInfo += "weight: " + person.weight + "\n";

    personInfo += "eye color: " + person.eyeColor + "\n";

    personInfo += "occupation: " + person.occupation + "\n";

    personInfo += "age: " + person.age + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){//cheking the data for the first and last you entered and returns the person

    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}




// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}



// function that prompts and validates user input
function promptFor(question, valid){

  let response = prompt(question);
  do{
    
  } while(response === null || !valid(response));

  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}


