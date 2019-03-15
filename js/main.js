/////////////////////////////
//Canvas Setup
/////////////////////////////
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font='14px FontAwesome';
ctx.canvas.addEventListener('click', onCanvasClick, false);

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight-200;

canvas.width = WIDTH;
canvas.height = HEIGHT;

/////////////////////////////
//Global Variables
/////////////////////////////
var cursorState = 'empty';
var ticks = 0;
var idCounter = 10; //starts from 10 to avoid conflicts
var selectedObject = null;
var gridSize = 2.5;

/////////////////////////////
//Change State Functions
/////////////////////////////
//change state of all villagers
function changeState(state){
	for (var v in villagerList){
		if (state !== villagerList[v].state){
			villagerList[v].prevState = villagerList[v].state;
			villagerList[v].state = state;
			villagerList[v].nearest = null;
		}
	}
}

//change what is selected for the info panel
function changeSelectedState(state){
	//return if not a villager
	if (selectedObject.name !== 'villager')
		return;
	//change villager state
	selectedObject.state = state;
}

/////////////////////////////
//Mouse Interaction Functions
/////////////////////////////
//on click events
function onCanvasClick(ev){
	var mouseX = Math.round(ev.clientX / gridSize) * gridSize;
	var mouseY = Math.round(ev.clientY / gridSize) * gridSize;

	//if cusor is empty, update info panel with selected item
	//else if the cursor has something, then place the thing
	if (cursorState === 'empty'){
		//clear the info panel
		clearInfoPanel();
		//find nearest object to the click
		var nearestDistance = 10;
		var nearestObject = null;
		for (var i in objectList){
			var obj = objectList[i];
			dist = distanceBetweenCoords(mouseX,mouseY,obj.x,obj.y);
			if (dist < nearestDistance) {
				nearestDistance = dist;
				nearestObject = obj;
			}
		}
		updateInfoPanel(nearestObject);
		selectedObject = nearestObject;
	} else {
		for (var i in placeholderList){
			var ph = placeholderList[i];
			if(cursorState === ph.name){
				id = ph.name + idCounter++;
				ph.construct(id,mouseX,mouseY);
				pay(ph);
			}
		}
	}
	cursorState = 'empty';
}

//read mouse position and update placeholders
document.onmousemove = function(mouse){
	var mouseX = Math.round(mouse.clientX / gridSize) * gridSize;
	var mouseY = Math.round(mouse.clientY / gridSize) * gridSize;

	for(var i in placeholderList){
		var placeholder = placeholderList[i];

		if (cursorState === placeholder.name){
			placeholder.x = mouseX;
			placeholder.y = mouseY;
		}
	}
}

/////////////////////////////
//The Main Function
/////////////////////////////
function main() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	updateGUI();
	drawObjects();
	updateCursor();
	updateBabies();
	updateFarms();
	clearInfoPanel();
	updateInfoPanel(selectedObject);
	updateVillagers();
	ticks++;
}

/////////////////////////////
//Construct Objects
/////////////////////////////
//construct depot
generateDepot('depot0',9000,9000);

//construct villagers
generateVillagers(3,30);

//construct trees and forests
generateTrees(Math.floor(WIDTH/20),25,10,20,50,15);

//construct berry bushes
generateBerryBushes(Math.floor(WIDTH/200),25,5,0,15,15);

/////////////////////////////
//Game Clock (runs the main at set interval)
/////////////////////////////
setInterval(main,40);

/////////////////////////////
//GUI
/////////////////////////////
//loading screen
document.getElementById('loading').style.display = 'none';

//generate the buttons
generateButtons();
