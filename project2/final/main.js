"use strict"

//Global variables
let speciesPet, genderPet, namePet;
let validationComplete = false;
document.getElementById("submit").addEventListener("click", validateName); // we call the funtion here, so when we click the but will call validateName

/* Code developed with AI assistance to display the "Start Over" button affter Validation Complete, also line 116 
  I may not have implemented it myself, but I decided to include it because it makes the process of changing and generating new names faster
   and helps test evrething.*/
document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("species").value = "";
    document.getElementById("gender").value = "none";
    document.getElementById("name").value = "none";
    clear();
    document.getElementById("reset").hidden = true;
    document.getElementById("submit").hidden = false;
});


//Validate Name
function validateName() {
    speciesPet = document.getElementById("species").value.toLowerCase(); //.toLowerCase for the not case-sensitive 
    genderPet = document.getElementById("gender").value;
    namePet = document.getElementById("name").value;

    if (!validateData()) {
        return;
    }
    processData();
}

//Validate Data
function validateData() {

    if (speciesPet == "" && genderPet == "none" && namePet == "none") {
        output("Please choose a Species, Gender and Name, to validate your pet name");
        return false;
    }

    if (speciesPet == "") {
        output("Please write the species of your pet");
        return false;
    }

    /*I learned to use && because I wanted two things to be true at the same time, that's how I put it in my flowchart because that's how I understood it.*/
    if (speciesPet != "dog" && speciesPet != "cat" && speciesPet != "pig") {  // Check that the species is one of the 3 valid ones
        output("Sorry we don't have that species in our database. Try dog, cat or pig");
        return false;
    }
    if (genderPet == "none") {
        output("Please choose a Gender");
        return false;
    }
    if (namePet == "none") {
        output("Please choose a Name");
        return false;
    }
    return true;
}

//Validate Process Data
function processData() {
    validationComplete = true;
    //Name Whiskers, only cats are allowed to have this name
    if (namePet == "Whiskers") {
        if (speciesPet != "cat") {
            validationComplete = false;
            output("Sorry your pet " + speciesPet + " does not want to be name Whiskers; that name is only for cats!");
        }
        //Name Porky, only male pigs are allowed to have this name
    } else if (namePet == "Porky") {
        if (speciesPet != "pig") {
            validationComplete = false;
            output("Your pet " + speciesPet + " does not want to be named Porky; that name is only for pigs!");
        } else if (genderPet != "male") {
            validationComplete = false;
            output("Sorry, your pig gender is " + genderPet + ". Only male pigs want to be named Porky!");
        }
        //Name Daisy, only female dogs and pigs are allowed to have this name
    } else if (namePet == "Daisy") {
        if (speciesPet != "dog" && speciesPet != "pig") {
            validationComplete = false;
            output("Sorry your pet Cat don't want the name Daisy");
        } else if (genderPet != "female" && genderPet != "unknown") {
            validationComplete = false;
            output("Sorry your Male pet don't want the name Daisy");
        }
        //Name King, only male or unknown gender are allowed to have this name 
    } else if (namePet == "King") {
        if (genderPet != "male" && genderPet != "unknown") {
            validationComplete = false;
            output("Sorry your Female pet don't want the name King");
        }
        //Name Princess, only female cats are allowed to have this name
    } else if (namePet == "Princess") {
        if (speciesPet != "cat") {
            validationComplete = false;
            output("Sorry your pet " + speciesPet + " don't want the name Princess");
        } else if (genderPet != "female") {
            validationComplete = false;
            output("Sorry your " + genderPet + " don't want the name Princess")
        }
    }

    // This is to change the final sentence from gender to pronoun so that the final sentence makes sense. 
    let pronouns = "it";
    if (genderPet == "male") {
        pronouns = "he";
    } else if (genderPet == "female") {
        pronouns = "she";
    }
    //Final Result frase
    if (validationComplete) {
        output("Congratulations on adopting a new " + speciesPet + "! We are confident " + pronouns + " will enjoy being called " + namePet + "!");

        /* Code developed with AI assistance to display the "Start Over" button affter Validation Complete */
        document.getElementById("submit").hidden = true;
        document.getElementById("reset").hidden = false;
    }

    // Special Rule with Spot, this name can be used by any 
    if (namePet == "Spot") {
        output("But just to check does, " + pronouns + " actually have spots?")
    }
}
