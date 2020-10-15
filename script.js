// Assignment Code
var generateBtn = document.querySelector("#generate");

// Declarations
let passwordObj = {};
const alphaString = "abcdefghijklmnopqrstuvwxyz";
const numString = "0123456789";
const specialCharacterString = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Get password parameter input from the user of at least one:
// Upper Case
// Lower Case
// Speical Character
// and Specify length
function getPasswordCharactersInput() {
  // Initialize password condition variables to false
  let atLeastOne = false;
  let lowerCase = false;
  let upperCase = false;
  let specialChars = false;
  // Need at least one of the following
  while (!atLeastOne) {
    upperCase = confirm("Would you like to include uppercase characters?");
    lowerCase = confirm("Would you like to include lowercase characters?");
    specialChars = confirm("Would you like to include special characters?");
    if (upperCase || lowerCase || specialChars) {
      atLeastOne = true;
    }
  }

  // Get password length
  let acceptableLength = false;
  let passwordLength = prompt("How long would you like your password to be (min 8 max 128)?");
  while (!acceptableLength) {
    if (parseInt(passwordLength) < 8 || parseInt(passwordLength) > 128 || isNaN(parseInt(passwordLength))) {
      passwordLength = prompt("Please try again and select between 8 and 128:");
    } else {
      acceptableLength = true;
    }
  }

  passwordObj = {
    "length": parseInt(passwordLength),
    "lowerCase": lowerCase,
    "upperCase": upperCase,
    "specialCharacers": specialChars
  }
  return passwordObj;
}

// TODO - if it doesnt have and SHOULD, replace a random chracter in the stirng with a random upper case character

function hasUpperCase(input) {
  // Check if strings are not equal after converting to the opposite case
  return input !== input.toLowerCase();
}

function hasLowerCase(input) {
  return input !== input.toUpperCase();
}

function hasNumber(input) {
  let containsNum = false;
  for (let index = 0; index < numString.length; index++) {
    if (input.indexOf(numString[index]) > -1) {
      containsNum = true;
    }
  }
  return containsNum;
}

function hasAcceptedSpecialCharacter(input) {
  let containsSpecialCharacter = false;
  for (let index = 0; index < specialCharacterString.length; index++) {
    if (input.indexOf(specialCharacterString[index]) > -1) {
      containsSpecialCharacter = true;
      break;
    }
  }
  return containsSpecialCharacter;
}

// Function to get a random integer between 0 and the max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Make sure the password string has each of the required parameters
function validatePassword(password) {
  if (passwordObj.lowerCase && !hasLowerCase(password)) {
    // replace random chracter with random lower case charcter
    password = password.replace(password[getRandomInt(password.length - 1)], alphaString[getRandomInt(alphaString.length - 1)]);
  }
  if (passwordObj.upperCase && !hasUpperCase(password)) {
    // replace random chracter with random upper case charcter
    password = password.replace(password[getRandomInt(password.length - 1)], alphaString[getRandomInt(alphaString.length - 1)].toUpperCase());
  }
  if (passwordObj.specialCharacers && !hasAcceptedSpecialCharacter(password)) {
    // replace random chracter with random special charcter
    password = password.replace(password[getRandomInt(password.length - 1)], alphaString[getRandomInt(alphaString.length - 1)]);
  }

  return password;
}

function generatePassword() {
  let finalPassword = "";
  let passwordInputObj = getPasswordCharactersInput();
  if (passwordInputObj.lowerCase) {
    allPossibleCharacterString += alphaString;
  }
  if (passwordInputObj.upperCase) {
    allPossibleCharacterString += alphaString.toUpperCase();
  }
  if (passwordInputObj.specialCharacers) {
    allPossibleCharacterString += specialChracterString;
  }
  console.log(allPossibleCharacterString);

  for (let index = 0; index < passwordInputObj.length; index++) {
    let randomCharacterIndex = getRandomInt(allPossibleCharacterString.length);
    finalPassword += allPossibleCharacterString[randomCharacterIndex];
  }
  console.log("Final Password = " + finalPassword);
  return finalPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);