/*
    FILE: /~sgiorlan/js/hw9.js
    91.61 GUI Programming I Assignment No.9: Implementing a Bit of Scrabble with Drag-and-Drop
    Scott T. Giorlando, UMass Lowell Computer Science, scott_giorlando@student.uml.edu
    File Created on: 12/10/2019 6:20 PM.
        Updated by STG on 12/20/2019 12:45 PM

    File Description: THis file holds all the code necessary for the Scrabble game to be played, it also holds the code to drag and drop pieces on the board.
    Literally everything for the game is in this file.

    This file did pass all the validators that need to be used.
*/

/*
The 4 variables below represent the tiles left in the game, the current score, the current word score and the current word.
*/
var tilesLeft = 100;
var currentScore = 0;
var currentWordScore = 0;
var currentWord = "";

/*
Below is an array that holds all the letter tiles in the game, this also holds how many times the letter should appear in the game.
*/
var ScrabbleTiles = [];
ScrabbleTiles["A"] = { "value": 1, "original-distribution": 9, "number-remaining": 9, "image": "images/Scrabble_Tile_A.jpg" };
ScrabbleTiles["B"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_B.jpg" };
ScrabbleTiles["C"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_C.jpg" };
ScrabbleTiles["D"] = { "value": 2, "original-distribution": 4, "number-remaining": 4, "image": "images/Scrabble_Tile_D.jpg" };
ScrabbleTiles["E"] = { "value": 1, "original-distribution": 12, "number-remaining": 12, "image": "images/Scrabble_Tile_E.jpg" };
ScrabbleTiles["F"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_F.jpg" };
ScrabbleTiles["G"] = { "value": 2, "original-distribution": 3, "number-remaining": 3, "image": "images/Scrabble_Tile_G.jpg" };
ScrabbleTiles["H"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_H.jpg" };
ScrabbleTiles["I"] = { "value": 1, "original-distribution": 9, "number-remaining": 9, "image": "images/Scrabble_Tile_I.jpg" };
ScrabbleTiles["J"] = { "value": 8, "original-distribution": 1, "number-remaining": 1, "image": "images/Scrabble_Tile_J.jpg" };
ScrabbleTiles["K"] = { "value": 5, "original-distribution": 1, "number-remaining": 1, "image": "images/Scrabble_Tile_K.jpg" };
ScrabbleTiles["L"] = { "value": 1, "original-distribution": 4, "number-remaining": 4, "image": "images/Scrabble_Tile_L.jpg" };
ScrabbleTiles["M"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_M.jpg" };
ScrabbleTiles["N"] = { "value": 1, "original-distribution": 6, "number-remaining": 6, "image": "images/Scrabble_Tile_N.jpg" };
ScrabbleTiles["O"] = { "value": 1, "original-distribution": 8, "number-remaining": 8, "image": "images/Scrabble_Tile_O.jpg" };
ScrabbleTiles["P"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_P.jpg" };
ScrabbleTiles["Q"] = { "value": 10, "original-distribution": 1, "number-remaining": 1, "image": "images/Scrabble_Tile_Q.jpg" };
ScrabbleTiles["R"] = { "value": 1, "original-distribution": 6, "number-remaining": 6, "image": "images/Scrabble_Tile_R.jpg" };
ScrabbleTiles["S"] = { "value": 1, "original-distribution": 4, "number-remaining": 4, "image": "images/Scrabble_Tile_S.jpg" };
ScrabbleTiles["T"] = { "value": 1, "original-distribution": 6, "number-remaining": 6, "image": "images/Scrabble_Tile_T.jpg" };
ScrabbleTiles["U"] = { "value": 1, "original-distribution": 4, "number-remaining": 4, "image": "images/Scrabble_Tile_U.jpg" };
ScrabbleTiles["V"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_V.jpg" };
ScrabbleTiles["W"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_W.jpg" };
ScrabbleTiles["X"] = { "value": 8, "original-distribution": 1, "number-remaining": 1, "image": "images/Scrabble_Tile_X.jpg" };
ScrabbleTiles["Y"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_Y.jpg" };
ScrabbleTiles["Z"] = { "value": 10, "original-distribution": 1, "number-remaining": 1, "image": "images/Scrabble_Tile_Z.jpg" };
ScrabbleTiles["_"] = { "value": 0, "original-distribution": 2, "number-remaining": 2, "image": "images/Scrabble_Tile_Blank.jpg" };

 /*
 Function updateCurrentWord is the function that looks at the word the user created, then updates the current word's score and value at the bottom of the screen.
 */
function updateCurrentWord() {
  var i, j;
  var hWord = ""; // horizontal word temp value
  var vWord = ""; // vertical word temp value
  var multH = 1; //multiplier values for horizontal and veritical words
  var multV = 1;
  var tempLScore = 0; //temp value for the score of the letter that's placed on the board
  var tempHWScore = 0; // temp scores for horizontal and veritical words
  var tempVWScore = 0;
  for (i = 1; i < 16; i++) { // increments by line (set with index i)
    for (j = 1; j < 16; j++) { //increments by space (set with index j)
      //This is where we get the letter from the tile on the board.
      var lh = $("#line" + i).find("#space" + j).find(".game_tile").attr("letter");
      var lv = $("#line" + j).find("#space" + i).find(".game_tile").attr("letter");
      if (lh == undefined) {
        //Here I make it so the space is set to a emtpy value if nothing is placed on a space.
        lh = " ";
      } else {
        /*
        This sets our temporary letter score to the value of the letter that is placed.
        Then below it checks to see if the letter is on a special tile or not.
        */
        tempLScore = ScrabbleTiles[lh]["value"];
        /*
        tw = triple word
        dw = double word
        tl = triple letter
        dl = double letter
        */
        if ($("#line" + i).find("#space" + j).attr("effect") == "tw") {
          multH = 3;
        } else
        if ($("#line" + i).find("#space" + j).attr("effect") == "dw") {
          multH = 2;
        } else
        if ($("#line" + i).find("#space" + j).attr("effect") == "tl") {
          tempLScore = 3 * tempLScore;
        } else
        if ($("#line" + i).find("#space" + j).attr("effect") == "dl") {
          tempLScore = 2 * tempLScore;
        }
        //This adds the final letter score (as in all the points from the letters placed) to the word score.
        tempHWScore += tempLScore;
      }
      //This is the same as above.
      if (lv == undefined) {
        lv = " ";
      } else {
        tempLScore = ScrabbleTiles[lv]["value"];
        if ($("#line" + j).find("#space" + i).attr("effect") == "tw") {
          multV = 3;
        } else
        if ($("#line" + j).find("#space" + i).attr("effect") == "dw") {
          multV = 2;
        } else
        if ($("#line" + j).find("#space" + i).attr("effect") == "tl") {
          tempLScore = 3 * tempLScore;
        } else
        if ($("#line" + j).find("#space" + i).attr("effect") == "dl") {
          tempLScore = 2 * tempLScore;
        }
        tempVWScore += tempLScore;
      }
      /*
       This adds another letter on to the word that is being made.
      */
      hWord += lh;
      vWord += lv;
    }
    /*
     This adds a space at the end of each line so there is no overflow of words.
    */
    hWord += " ";
    vWord += " ";
  }
  /*
   This is to take the white space off of the front and bck of words.
  */
  hWord = $.trim(hWord);
  vWord = $.trim(vWord);
  /*
   This if statement checks to see if the horizontal word placed by the user does not include any spaces and it is 2+ characters long
   If the requirements are met then it is a valid word that is accepted.
  */
  if(!hWord.includes(" ") && hWord.length > 1) {
    $("#currentWord").html("Word: " + hWord);
    $("#currentWord2").html("Word Score: 0" + multH * tempHWScore);
    currentWord = hWord;
    currentWordScore = multH * tempHWScore;
  } else
  /*
   This is the same idea as above except it checks for the vertical word placed by the user instead.
  */
  if(!vWord.includes(" ") && vWord.length > 1) {
    $("#currentWord").html("Word: " + vWord);
    $("#currentWord2").html("Word Score: 0" + multV * tempVWScore);
    currentWord = vWord;
    currentWordScore = multV * tempVWScore;
  /*
   The else statement is here if neither of the two checks above are met, that means that
   the word is not made which is therefore not valid.
  */
  } else {
    $("#currentWord").html("Word: N/a");
    $("#currentWord2").html("Word Score: 0");
    currentWord = "";
    currentWordScore = 0;
  }
}

/*
This function makes the game tiles draggable and so they revert to their old spot if they cannot be placed correctly.
*/
$(function () {
  $(".game_tile").draggable({
    snap: ".board_tile,.game_tile_holder",
    snapmode: "both",
    revert: "invalid"
  });

  /*
  This function makes the tile holder droppable so you can drag a tile from the board and drop it on a spot
 */
  $(".game_tile_holder").droppable({
    drop: function (event, ui) {
      // make sure there isn't already a tile on this space
      if($(this).children().length == 0){
        ui.draggable.appendTo(this).css("left", "0px").css("top", "0px")
        updateCurrentWord();
      }
    }
  });

  /*
  This function makes the tile holder droppable so you can drag a tile from the board and drop it on a spot
 */
  $(".board_tile").droppable({
    drop: function (event, ui) {
      // make sure there isn't already a tile on this space
      if($(this).children().length == 0){
        ui.draggable.appendTo(this).css("left", "0px").css("top", "0px")
        updateCurrentWord();
      }
    }
  });
});

/*
Function refreshTile takes in a tile parameter as an index of the 7 spots on the tile holder
 Generates a new tile for that spot based on the probability of the tiles in the array that are left
*/
function refreshTile(tile) {
  if ($("#tile" + (tile + 1)).children().length == 0) {
    var char;
    var runningCount = 0;
    var randomNum = 0;
    randomNum = Math.floor((Math.random() * tilesLeft));
    for (k = 0; k < Object.keys(ScrabbleTiles).length; k++) {
      if (k == Object.keys(ScrabbleTiles).length - 1) {
        char = "_";
      } else {
        char = String.fromCharCode(65 + k);
      }
      runningCount += ScrabbleTiles[char]["number-remaining"];
      if (randomNum < runningCount) {
        tilesLeft--;
        ScrabbleTiles[char]["number-remaining"]--;
        $("#tile" + (tile + 1)).html("");
        var newDiv = $("<div class=\"game_tile "
          + char
          + "_tile\" letter=\""
          + char
          + "\"><img src=\""
          + ScrabbleTiles[char]["image"]
          + "\"class=\"game_tile_img\"></div>")
        $("#tile" + (tile + 1)).append(newDiv);
        $(".game_tile").draggable({ snap: ".board_tile,.game_tile_holder", revert: "invalid" });
        break;
      }
    }
  }
}

/*
Function clearBoard is what it looks like, it clears the board.
*/
function clearBoard() {
  var i;
  for (i = 1; i < 16; i++) {
    for (e = 1; e < 16; e++) {
      $("#line" + i).find("#space" + e).html("");
    }
  }
}

/*
This button is the button that allows the user to refresh their tiles.
It is made of two loops that will put the current letters back into the array and then
it runs refreshTile to regenerate 7 tiles for the holder.
*/
$("#generate").click(function () {
  var i;
  clearBoard();
  for (i = 1; i <= 7; i++)
  {
    var letter = $("#tile" + i).find(".game_tile").attr("letter");
    ScrabbleTiles[letter]["number-remaining"]++;
    tilesLeft++;
    $("#tile" + i).html("");
  }
  for (i = 0; i < 7; i++)
  {
    refreshTile(i);
  }
});

/*
This button is for the user to submit their current word on the board for scoring.
If the word is not a valid word in the dictionary then an error message will appear.
Otherwise it adds the score and fills out the holder with new letters by running refreshTile 7 times.
*/
$("#save").click(function () {
  if (currentWord == "") {
    $( "#message" ).dialog( "open" );
    return;
  }
  var i;
  currentScore += currentWordScore;
  clearBoard();
  for (i = 0; i < 7; i++)
  {
    refreshTile(i);
  }

  /*
  This is an update for all the outputs.
  */
  $("#currentScore").html("Score: " + currentScore)
  $("#tileCount").html("Tiles Left: " + tilesLeft)
  $("#currentWord").html("Word: N/a");
  $("#currentWord2").html("Word Score: 0");

  /*
  This resets the current word values, and the current score of that word on the board.
  */
  currentWordScore = 0;
  currentWord = "";
});

/*
This function is what creates the dialog box when a word the user creates is not a valid word.
*/
$( function() {
  $( "#message" ).dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
      }
    }
  });
});

$(document).ready(function () {
  var i;
  for (i = 0; i < 7; i++)
  {
    refreshTile(i);
  }
  $("#tileCount").html("Tiles Left: " + tilesLeft)
});
