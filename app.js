var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var score = 0; 
var scoreDisplay = document.querySelector("#scoreDisplay"); 
var resetPressed = true; 


init();
//This function calculates and displays the score
function init(){
	setupModeButtons();
	setupSquares();
	let score= document.getElementById("score");

	if(sessionStorage.getItem("autosave"));{

	score.value=sessionStorage.getItem("autosave");
	}
	
	score.addEventListener ("change", function(){

	sessionStorage.setItem("autosave", score.value);
	});

	//var lsScore = localStorage.getItem('score');
	//if( lsScore !== null ){
	//	score = lsScore; 
	//	scoreDisplay.textContent = score;
	//}
	//else {
	///	localStorage.setItem('score', score); 
	//}
	//reset();
}
//This function sets the game mode, easy or hard
function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}
//this is the function that says what to do it the correct or incorrect square is chosen.
function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){ 
				updateColorName();
				//console.log(colorName);
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				if(resetPressed){
					score+=5; 
					resetPressed = false;
				}
				scoreDisplay.textContent = score;
				localStorage.setItem('score', score);
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
				score--;
				scoreDisplay.textContent = score; 
				localStorage.setItem('score', score);
			}
		});
	}
}

//This changes the headline name and color when the correct color square is chosen
async function updateColorName(){
	const regex = /\([^\)]+\)/g; 
	var rgbColors = pickedColor.match(regex); 
	const url = "https://www.thecolorapi.com/id?rgb="+rgbColors[0];
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	let result = await fetch(url, requestOptions); 
	let colorData = await result.json(); 

	if(colorData.name.exact_match_name) {
		colorDisplay.textContent = colorData.name.value; 
	}
	else {
		colorDisplay.textContent = colorData.name.value + "-ish"; 
	}
}
//This function either resets the squares when play again or new colors is selected
function reset(){
	resetPressed = true;
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})
//This is what actually sets the random colors for the squares
function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}
//this tells is what to do as colors are chosen
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}
//this function sets the color to be chosen in the headline
function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}