console.log("hangman js linked");
import { wordList } from "./wordlist.js";

let displayFont = "40px";
// let wordtaken = "Apple"
// let word = wordtaken.toLocaleLowerCase();
let word;
let score;
let hangscore = 0;

const buttonswrapper = document.getElementById("letterbuttonsid");
const newwordbutton = document.getElementById("newwordbutton");
const startbutton = document.getElementById("startImg");

buttonswrapper.style.visibility = "hidden";

// START BUTTON
//------when start button is clicked, dashes is displayed on screen, start button disappears and new word button appears on right-------------
startbutton.addEventListener("click", start);
function start() {
  // createDashes(word);
  score = 0;
  const buttonswrapper = document.getElementById("letterbuttonsid");
  const newwordbutton = document.getElementById("newwordbutton");
  newwordbutton.style.display = "block";
  buttonswrapper.style.visibility = "visible";

  //Takes a random word from the imported array called wordList
  function getRandomInt(max) {
    // returns a random number between 0 and max
    return Math.floor(Math.random() * max);
  }

  let totalwords = wordList.length;
  let wordindex = getRandomInt(totalwords);
  word = wordList[wordindex].toLowerCase();

  // delete when playing
  // dispalyword(word);
  console.log(word);

  //calling functions to create dashes
  createDashes(word);
}

//NEW WORD BUTTON
newwordbutton.addEventListener("click", newwordBtnClick);

function newwordBtnClick() {
  // set hangscore to 0 and make the hangman image disappear
  hangscore = 0;
  displayHangmanPic(hangscore);

  //Makes the letter buttons visible
  const buttonswrapper = document.getElementById("letterbuttonsid");
  buttonswrapper.style.visibility = "visible";

  //Delete the innerText to remove the dashes and display word
  document.getElementById("dash").innerText = "";
  document.getElementById("displayword").innerText = "";

  //selects all letter buttons and sets it to not disabled
  document
    .querySelectorAll('#letterbuttonsid input[type="button"]')
    .forEach((elem) => {
      elem.disabled = false;
    });

  //Takes a random word from the imported array called wordList
  function getRandomInt(max) {
    // returns a random number between 0 and max
    return Math.floor(Math.random() * max);
  }

  let totalwords = wordList.length;
  let wordindex = getRandomInt(totalwords);
  word = wordList[wordindex].toLowerCase();

  //Delete or comment this function call when playing
  // dispalyword(word);
  console.log(word);

  // calling functions to display word and create dashes
  createDashes(word);
}

//RESTART BUTTON
let restartbutton = document.getElementById("restartbutton");
function restart() {
  location.reload();
  // start();
  // document.getElementById("startImg").click();
}
restartbutton.addEventListener("click", restart);

//
function dispalyword(inputword) {
  let displayword = document.getElementById("displayword");
  const h2word = document.createElement("p");
  h2word.innerText = inputword;
  displayword.appendChild(h2word);
}

function createDashes(inputword) {
  let dashElement = document.getElementById("dash");
  const h1dash = document.createElement("p");
  h1dash.innerText = "_ ".repeat(inputword.length);
  dashElement.appendChild(h1dash);

  //------------ sets the display font to the value stored in the variable displayFont------
  document.getElementById("dash").style.fontSize = displayFont;

  //-----------  hides and also blanks the start button--------
  startbutton.style.display = "none";
}

// LETTERS BUTTONS
//----------------- once letter is selected it is checked if it matches any letter of the word and scores are given according to the conditions set---------------------
// --------when letter button is clicked, the letterSelected function is called with letterinput being the value of the letter button--------------
buttonswrapper.addEventListener("click", (event) => {
  if (event.target.nodeName === "INPUT") {
    //the following happens only if the type of html element within buttonswarapper is input
    // console.dir(event.target);
    const inputType = event.target.attributes.type.nodeValue;
    const isButton = inputType === "button";

    // if anything else other than button is clicked, returns
    if (!isButton) {
      return;
    }
    // console.log("button has been clicked" + event.target.value);

    let btnSelected = document.getElementById(event.target.id);

    // button disabled after clicked
    btnSelected.disabled = true;

    // calls function leterSelected with letterinput as value of button clicked, and word as word
    let letter = btnSelected.value;
    letter = letter.toLowerCase();
    letterSelected(word, letter);

    //if no dashes are left score is displayed, and letter buttons disabled
    //if dashes are left game continues
    //hangscore is 0 initially

    // -hangscore is a point each incorrect letter
    // - maximum of 6 hangscore for each word
    // - 100 points each for unused hang points (so 6 minus hangscore x 100points at end of game)
  }
});

//---------- creates method function that takes in index and replacement character/string.  The character at that index in the method string is replaced by the replacement character/string.------------
String.prototype.replaceStringPart = function (index, replacement) {
  let oldString = this;
  let newString =
    oldString.substring(0, index) +
    replacement +
    oldString.substring(index + 1, oldString.length);
  return newString;
};

//---------checkes if letterinput matches any letter of the inputword, if it does it replaces the corresponding dash with that letter-----------------
function letterSelected(inputword, letterinput) {
  let dash = document.getElementById("dash");

  //-------removes spaces between dashdisplay-----------
  dash.innerText = dash.innerText.split(" ").join("");

  //------- if inputword contains any letters equal to the letterinput, it adds that letter to the corresponding index in the dashdisplay-----------
  let output = dash.innerText;
  let isLetterFound = false;
  for (let i = 0; i < inputword.length; i++) {
    if (inputword[i] === letterinput) {
      output = output.replaceStringPart(i, letterinput);
      isLetterFound = true;
    }
  }
  dash.innerText = output;

  if (isLetterFound === false) {
    hangscore++;
    displayHangmanPic(hangscore);
    // if (hangscore <= 6) {
    //     displayHangmanPic(hangscore)}
  }

  //if hang score reaches 6 display game over picture
  if (hangscore === 6) {
    const buttonswrapper = document.getElementById("letterbuttonsid");
    buttonswrapper.style.visibility = "hidden";
  }

  //-------displays dashdisplay with spaces in between each character-----------
  dash.innerText = dash.innerText.split("").join(" ");

  //------------ sets the display font to the value stored in the variable displayFont------
  document.getElementById("dash").style.fontSize = displayFont;

  //counts number of dashes
  //if no dash left, disable letter buttons
  if (countDashes(output) === 0) {
    const buttonswrapper = document.getElementById("letterbuttonsid");
    buttonswrapper.style.visibility = "hidden";
  }
}

//----- this function counts the number of dashes for a given string---------------
function countDashes(outputword) {
  let dashcount = 0;
  for (let i = 0; i < outputword.length; i++) {
    if (outputword.charAt(i) === "_") {
      dashcount++;
    }
  }
  return dashcount;
}

//-------------------this function displays the corresponding hangman image according to the hangscore. It also displays gameover image if hangscore reaches 6------------
function displayHangmanPic(inputHangscore) {
  let imgElement = document.getElementById(`hangmanImg`);
  if (hangscore > 0 && hangscore < 7) {
    imgElement.style.display = "block";
    imgElement.setAttribute("src", `./images/hangmanImg${inputHangscore}.png`);
  } else if (hangscore === 0) {
    // hides the hangman image
    imgElement.style.display = "none";
  }

  if (hangscore === 6) {
    //Gameover

    document.getElementById("newwordbutton").style.display = "none";
    document.getElementById("letterbuttonsid").style.display = "none";

    document.getElementById("gameoverimg").style.display = "block";

    //update score and display on scoreboard on top
    document.getElementById("scoreDisplayed").innerText = `Score: ${score + 0}`;

    document.getElementById("restartbutton").style.display = "block";
  }
}

// dispalyword(word);

// letterSelected(word, "p");
// letterSelected(word, "l");
// letterSelected(word, "a");
