'use strict'

document.getElementById("submit").addEventListener("click", function () {
    let fahrenheit = Number(document.getElementById("inputF").value);
    let conversionType = document.getElementById("conversionChoice").value;
    /* We changed the sumbitted number to a number from the start so that it isn't taken as a string */
    let celsius = (fahrenheit - 32) * 5 / 9;
    let kelvin = (fahrenheit + 459.67) * 5 / 9;

    output("Original Temperature: " + fahrenheit + " F");
    if (conversionType == "c") {
        output("Temperature in Celcius: " + celsius.toFixed(2));
    }
/* I managed to complete the second challenge, but from what I understand, I need to be careful with .toFixed because it returns a string. 
   What I did was search online and visit forums where people help solve problems. That's where I learned about this function. 
   It was the easiest one for me to understand. There were other solutions, but I decided not to use them because I didn’t really understand how they worked. */

    if (conversionType == "k") {
        output("Temperature in Kelvin: " + kelvin.toFixed(2));
    }

    /*For me, both if statements are better because it's easier for me to understand. In this case, 
   there are only two options since both are defined by the value option, from what I understand about 
   if statements, both are true when the desired option is chosen. That's why in this case the double 
   if statement makes more sense to me. */

    /*   if (conversionType == "c") {
          output(celsius);
      } else {
          (conversionType == "k")
          output(kelvin);
      } */

});