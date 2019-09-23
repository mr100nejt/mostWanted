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
      searchByTraits(people)// TODO: search by traits 
     
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
function mainMenu(searchResults, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
let foundName = searchResults

  if(!people){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + people[0].firstName + " " + people[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    displayPeople(addDescendants(people,searchResults))
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

function searchByName(people,first,last){
  
   
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

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";

    personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
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

function addDescendants(people,searchResults)
  {
     let foundChildren = people.filter(function(el){//cheking the data for the first and last you entered and returns the person

    if(searchResults[0].id === el.parents[0]||searchResults[0].id === el.parents[1]){
      return true;
    }
    else{
      return false;
    }
  })
   if(foundChildren.length>0)
    {  
      searchResults.descendants = foundChildren
      addDescendants(people,foundChildren)
    }
    else if(foundChildren.length===0)
     {
        return foundChildren
     }
   return foundChildren;
   }
     
    function searchByTraits(people)
    {
      let p2 = prompt('what trait would you like to search by?(height,weight, age, gender,eye color,')
      switch(p2){
    case "height":
    let p3 = prompt("what is their height?") 
    p3 = parseInt(p3,10);
    let foundHeight = people.filter(function(el){

    if(p3 === el.height){
      return true;
    }
    else{
      return false;
    }
  }) 
    return checkLength(foundHeight); 
    break;
    case "weight":
    let p4 = prompt("what is their weight?") 
    p4 = parseInt(p4,10);
    let foundWeight = people.filter(function(el){

    if(p4 === el.weight){
      return true;
    }
    else{
      return false;
    }
  }) 
   
        return checkLength(foundWeight)
    break;
    case "age":
  let p5 = prompt("what is their age?") 
    p5 = parseInt(p5,10);
    let foundAge = people.filter(function(el){

    if(p5 === el.age){
      return true;
    }
    else{
      return false;
    }
  }) 
   return checkLength(foundAge)
   
    break;
    case "gender":
      let p6 = prompt("what is their gender?") 
    
    let foundGender = people.filter(function(el){

    if(p6 === el.gender){
      return true;
    }
    else{
      return false;
    }
  }) 
   
        return checkLength(foundGender)
    break;
    case "eye color":
    let p7= prompt("what is their weight?") 
   
    let foundEyeColor = people.filter(function(el){

    if(p7 === el.eyeColor){
      return true;
    }
    else{
      return false;
    }
  }) 
    
        return checkLength(foundEyeColor)
    break;
    case "occupation":
let p8 = prompt("what is their occupation?") 
   
    let foundOccupation = people.filter(function(el){

    if(p8 === el.occupation){
      return true;
    }
    else{
      return false;
    }
  }) 
    
        return checkLength(foundOccupation)
  
    default:
    return mainMenu(person, people); // ask again
  }

    }

function checkLength(foundArray)
{
  if(foundArray.length > 1)
    {
      searchByTraits(foundArray)
    }
    else
      {
        return foundArray
      }
}
