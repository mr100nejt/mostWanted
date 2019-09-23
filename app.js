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
let foundPerson = searchResults

  if(!people){
    alert("Could not find that individual.");
    return app(people); // restart
  }


  let displayOption = prompt("Found " + searchResults.firstName + " " + searchResults.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
//at some point this will have to become person[0].firstName and etc. then we can get the other names to filter in and not just billy bob, then the firstName and lastName will have to be fixed

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    displayPeople(displayFamily(searchResults, people));
    break;
    case "descendants":
    displayPeople(searchResults[0].descendants)

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


function displayFamily(searchResults, people ){//need to connect function to display information

// let parents = findParents(person, people, searchResults);
// let children = findChildren(person, people, searchResults);
// let currentSpouse = findSpouse(person, people, searchResults);
// let siblings = findSibling(person, people, searchResults);

  let personFamily =displayPeople( findParents(searchResults, people)) + "\n";

    personFamily += displayPeople( findChildren(searchResults, people)) + "\n";

    personFamily += displayPeople( findSpouse(searchResults, people))  + "\n";

    personFamily += displayPeople( findSibling(searchResults, people) ) + "\n";

   
}

// Write a function that returns the name of whatever persons id you pass in.

function findParents(searchResults, people){ 

  let parents = people.filter(function(person){
    if(searchResults[0].parents[0] === person.id || searchResults[0].parents[1] === person.id) {
      return true;
    }
    else{
      return false;
    }


  });

  return parents;
}


function findSpouse(searchResults, people){
  let currentSpouse = people.filter(function(person){
    if(searchResults[0].id === person.currentSpouse){
      return true;
    }
    else{
      return false
    }
  });
  return currentSpouse;
}


//START of finding children
function findChildren(searchResults, people){ //wait on descendents 
  let children = people.filter(function(person){
    if(searchResults[0].id === person.parents[0]||searchResults[0].id === person.parents[1]){
    return true;
  }
  else{
    return false;
  }
  });
  return children;
}



function findSibling(searchResults, people){
  let foundSibling = people.filter(function(person){
    if(searchResults[0].parents[0] === person.parents[0]||searchResults[0].parents[0] === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  })
  return foundSibling;
}
  //find persons parents id as array
  //for each parent search through all people and look for people with at least one of the same parents
  //return siblings
//   let parent = people.filter(function(person){
//    let array = [people];
//     let n = array.includes(foundPerson.parents[0]) 
  
// let sibling = people.filter(function(person){
//     if (foundPerson.parents === person.parents){
//       return true;
//     }
//     else{
//       return false;
//     }
//   })

//   });
//   return true;
// }




function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);

  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){//cheking the data for the first and last you entered and returns the person,  undefined 

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


function addDescendants(people,searchResults) {
   let allDescendants = [];

   let counter = 1;
   for(let i = 0; i<=searchResults.length; i++){
       
     if(i>=searchResults.length)
     {
        if (counter <=1) 
          {
            
             return
          }
       
      }
      let foundChildren = people.filter(function(el){
    

    if(searchResults[i].id === el.parents[0]||searchResults[i].id === el.parents[1]){
     counter++;
      return true;
    }
    else{
      return false;
    }
  })
   if(counter > 1)
    {
       searchResults[i].descendants = foundChildren
       return addDescendants(people,foundChildren)
    }
  if(i === 0){

  
   if(i+1 ===  searchResults.length)
    {  
     
      if(counter > 1)
      {return addDescendants(people,foundChildren)}
      
    }
  else if(i === searchResults.length)
  {
    searchResults.descendants = foundChildren
      
      return addDescendants(people,foundChildren)
  }
  }
    else if(i>searchResults.length)
     {
        return foundChildren
     }
   
   
 }

   
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
