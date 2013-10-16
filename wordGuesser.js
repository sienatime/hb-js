var word = "twitter";
var wordArray = [];
var correctLetters = [];
var reward = 0;
var guessedLetters = [];
var hangman = 0;

function guessLetter(letter){
    console.log(letter);
    var count = 0;
    for(var i=0; i<wordArray.length; i++){
        if (letter == wordArray[i]){
            correctLetters[i] = letter;
            //count how many times that letter appeared in the word
            count++;
        }
    }

    //if you already guessed that letter, don't do anything
    if (!letterInArray(letter, guessedLetters)){
        if (count === 0){
            //this is if you get it wrong
            hangman++;
            console.log("Hangman is now: " + hangman);
        }else {
            //if you get it right
            console.log("You found a new letter!");
        }
    }
    //important to push to guessedLetters AFTER you check if the current guess is in it.
    guessedLetters.push(letter);
    console.log("Current guessed letters: " + correctLetters);
}

function letterInArray(letter, guessedLetters){
    for(var i = 0; i < guessedLetters.length; i++){
        if (letter == guessedLetters[i]){
            return true;
        }
    }
    return false;
}

function compareArrays(array1, array2){
    if (array1.length != array2.length) {
        return false;
    }
    else{
        for (var i = 0; i < array1.length; i++){
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }
}

function main(){
    for(var i = 0; i < word.length; i++){
        wordArray.push(word[i]);
        correctLetters.push("_");
    }

    while (!compareArrays(correctLetters, wordArray) && hangman<6 ) {
        var guess = prompt("Guess a letter!");
        guessLetter(guess.toLowerCase());
    }

    if( hangman == 6){
        console.log("You lost because of the hangman.");
    }else{
        console.log("You won!");
    }
}

main();