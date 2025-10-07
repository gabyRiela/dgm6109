"use strict"
document.getElementById("submit").addEventListener("click", validateName);

//Validate Name
function validateName() {
    let speciesPet = document.getElementById("species").value.toLowerCase(); //.toLowerCase for the not case-sensitive 
    let genderPet = document.getElementById("gender").value;
    let namePet = document.getElementById("name").value;

    //Validate Data
    if (speciesPet == "") {
        output("Write the species of your pet");
        return; //Stops the function if there is an error
    }
    // Check that the species is one of the 3 valid ones
    if (speciesPet != "dog" && speciesPet !== "cat" && speciesPet != "pig") {
        output("Sorry we don't have that species in our database. Try dog, cat or pig");
        return;
    }
    if (genderPet == "none") {
        output("Please choose a Gender");
        return;
    }
    if (namePet == "none") {
        output("Please choose a Name");
        return;
    }

    /*I learned to use && because I wanted two things to be true at the same time, that's how I put it in my flowchart because that's how I understood it.*/


    //Validate Process Data
    let validationComplete = true;
    //Name Whiskers
    if (namePet == "whiskers") {
        if (speciesPet != "cat") {
            validationComplete = false;
            output("Sorry your pet pet " + speciesPet + " does not want to be name Whiskers; that name is only for cats!");
        }
        //Name Porky
    } else if (namePet == "porky") {
        if (speciesPet != "pig") {
            validationComplete = false;
            output("Your pet " + speciesPet + " does not want to be named Porky; that name is only for pigs!");
        } else if (genderPet != "male") {
            validationComplete = false;
            output("Sorry, your pig gender is " + genderPet + ". Only male pigs want to be named Porky!");
        }
        //Name Daisy
    } else if (namePet == "daisy") {
        if (speciesPet != "dog" && speciesPet != "pig") {
            validationComplete = false;
            output("Sorry your pet Cat don't want the name Daisy");
        } else if (genderPet != "female" && genderPet != "unknown") {
            validationComplete = false;
            output("Sorry your Male pet don't want the name Daisy");
        }
        //Name King
    } else if (namePet == "king") {
        if (genderPet != "male" && genderPet != "unknown") {
            validationComplete = false;
            output("Sorry your Female pet don't want the name King");
        }
        //Name Princess
    } else if (namePet == "princess") {
        if (speciesPet != "cat") {
            validationComplete = false;
            output("Sorry your pet " + speciesPet + " don't want the name Princess");
        } else if (genderPet != "female") {
            validationComplete = false;
            output("Sorry your " + genderPet + " don't want the name Princess")
        }
    }

    // Validate Main
    // This is to change the final sentence from gender to pronoun so that the final sentence makes sense. 
    let pronouns = "it";
    if (genderPet == "male") {
        pronouns = "he";
    } else if (genderPet == "female") {
        pronouns = "she";
    }
    //Result frase
    if (validationComplete) {
        output("Congratulations on adopting a new " + speciesPet + "! We are confident " + pronouns + " will enjoy being called " + namePet);
    }
    // Special Rule with Spot
    if (namePet == "spot") {
        output("But just to check does, " + pronouns + " actually have spots?")
    }
}