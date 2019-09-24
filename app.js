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
      searchByTraits(people)//function created to serch by traits. 
     
    
      break;
      default:
    app(people); // restart app
      break;
  }
  
 
  mainMenu(searchResults, people);//transfers variable searchResults to the menu/and links data set 
}


function mainMenu(searchResults, people){//a function used to accese the informtion after you find your person. 

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
    displayPerson(searchResults);
    break;
    case "family":  
   let b = displayFamily(searchResults,people)
    displayPeople(b);
    break;
    case "descendants":
   addDescendants(people,searchResults);
    displayPeople(searchResults[0].descendants);
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
  
  alert(personInfo);
}


function displayFamily(searchResults, people ){//need to connect function to display information


  let personFamily =displayPeople( findParents(searchResults, people)) ;

   let personFamily1 = displayPeople( findChildren(searchResults, people));

   let personFamily2 = displayPeople( findSpouse(searchResults, people))  ;

    let personFamily3 = displayPeople( findSibling(searchResults, people) ) ;

  
  if( personFamily1.length===0)
  {
    personFamily1 === window.alert("no children")
  }
  if( personFamily2.length===0)
  {
    personFamily2 === window.alert("no spouse")
  }
  if( personFamily3.length===0)
  {
    personFamily3 === window.alert("no sibling")
  }
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
  return currentSpouse 
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
  return children
}



function findSibling(searchResults, people){
  let foundSibling = people.filter(function(person){
    if(searchResults[0].parents[0] === person.parents[0]||searchResults[0].parents[0] === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  });
 return foundSibling
}
 




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


function addDescendants(people,searchResults) {// function to find the descendants of the search. and then to check if they has grand kids 
   let allDescendants = [];

   let counter = 1;
   for(let i = 0; i<=searchResults.length; i++){
       
     if(i>=searchResults.length)
     {
        if (counter <=1){
            
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
   
   if(counter > 1){
       searchResults[i].descendants = foundChildren
       return addDescendants(people,foundChildren)
    }
 
  if(i === 0){  
   if(i+1 ===  searchResults.length) {  
     
      if(counter > 1) {
        return addDescendants(people,foundChildren)
      }
      
    }
  else if(i === searchResults.length){
    searchResults.descendants = foundChildren
      
      return addDescendants(people,foundChildren)
  }
  }
    else if(i>searchResults.length) {
        return foundChildren
     }
   
   
 }
     
    function searchByTraits(people)// created to search for someone if you only have pieces of the information. 
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
    return checkLength(foundHeight,people); 
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
   
        return checkLength(foundWeight,people)
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
   return checkLength(foundAge,people)
   
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
   
        return checkLength(foundGender,people)
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
    
        return checkLength(foundEyeColor,people)
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
    
        return checkLength(foundOccupation,people)
  
    default:
    return mainMenu(person, people); // ask again
  }

    }

function checkLength(foundArray,people)//a function to call to check to aee if the search returned more then one person and then to re prompt the user 
{
  if(foundArray.length > 1)
    {
      searchByTraits(foundArray)
    }
    else
      {
        return mainMenu(foundArray,people)
      }
}
}



