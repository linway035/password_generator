// define generatePassword function
function generatePassword(options) {
  // define things user might want
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = "1234567890";
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/';

  // create a collection to store things user picked up
  let collection = [];

  if (options.lowercase === "on") {
    collection = collection.concat(lowerCaseLetters.split(""));
  }

  if (options.uppercase === "on") {
    collection = collection.concat(upperCaseLetters.split(""));
  }

  if (options.numbers === "on") {
    collection = collection.concat(numbers.split(""));
  }

  if (options.symbols === "on") {
    collection = collection.concat(symbols.split(""));
  }

  // remove things user do not need
  if (options.excludeCharacters) {
    //character指的就是pool，一個一個字元放進去循環去比對
    //例如，排除字元為4,0，那40有沒包含a，40有沒包含b,....
    collection = collection.filter(
      (character) => !options.excludeCharacters.includes(character)
    ); //40有包含4 (true)，則否定(!true)4這character，
    //filter false代表移除，他是collection.filter，所以是從collection移除，而不是options.excludeCharacters
  }

  // return error notice if collection is empty
  if (collection.length === 0) {
    return "There is no valid character in your selection.";
  }

  // start generating password
  let password = "";
  for (let i = 0; i < Number(options.length); i++) {
    const index = Math.floor(Math.random() * collection.length);
    password += collection[index];
  }

  // return the generated password
  return password;
}

// // invoke generatePassword function
// generatePassword();

// export generatePassword function for other files to use
module.exports = generatePassword;
