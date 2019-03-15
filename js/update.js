/////////////////////////////
//Update Functions (functions that are run every tick)
/////////////////////////////

function updateInfoPanel(obj){
	//if no object is selected, return
	if (obj === null) {
		document.getElementById('selectedVillager').style.display = "none";
		return;
	}
	//print each property of the object for the info panel
	for(var i in obj){
		property = obj[i];
		key = i;
		if(property !== null && property !== obj.x && property !== obj.y && property !== obj.sprite && property !== obj.size){
			document.getElementById("infoPanel").innerHTML += key + ': ' + property + ', ';
		}
	}
	//adjust buttons for selected object
	if(obj.name === 'villager'){
		document.getElementById('selectedVillager').style.display = "inline-block";
	} else {
		document.getElementById('selectedVillager').style.display = "none";
	}

}

function clearInfoPanel(){
	document.getElementById("infoPanel").innerHTML = '';
}

function updateBabies(){
	for (var b in babyList){
		babyList[b].age += 0.1;
		if (babyList[b].age >= babyList[b].growthAge){
			x = babyList[b].x;
			y = babyList[b].y;
			delete babyList[b];
			delete objectList[b];
			id = 3 + idCounter++;
			Villager('V'+ id,x,y);
		}
	}
}

//update the GUI and draw
function updateGUI() {
	ctx.fillText('Wood: ' + totalWood() + ', Food: ' + totalFood() + ', Pop: ' + totalPop() + '/' + totalPopCap(), 5, 15);
}

function drawObjects(){
	for(var i in objectList){
		var obj = objectList[i];

		var x = obj.x-(obj.size/2);
		var y = obj.y-(obj.size/2);
		ctx.drawImage(obj.sprite,x,y,obj.size,obj.size);
	}
}

function updateFarms(){
	for (var i in farmList){
		var farm = farmList[i];
		//generate food
		if (farm.timeUntilHarvest <= 0){
			//restore food
			farm.timeUntilHarvest = 100;

			//store food in nearest depot
			var nearestDistance = 999999;
			var nearestDepot = null;
			for (var i in depotList){
				var depot = depotList[i];
				dist = distanceBetweenEntities(farm,depot);
				if (dist < nearestDistance) {
					nearestDistance = dist;
					nearestDepot = depot;
				}
			}
			nearestDepot.food += 50;
		} else {
			farm.timeUntilHarvest--;
		}
	}
}

//update cursor
function updateCursor(){
	for(var i in placeholderList){
		var placeholder = placeholderList[i];

		if (cursorState === placeholder.name){
			var x = placeholder.x-(placeholder.size/2);
			var y = placeholder.y-(placeholder.size/2);
			ctx.drawImage(placeholder.sprite,x,y,placeholder.size,placeholder.size)
		}
	}
}

//update villager position and draw
function updateVillagers() {
	for (var v in villagerList){

		checkInvCap(villagerList[v]);
		if (villagerList[v].state === 'idle'){
			//walk around

		} else if (villagerList[v].state === 'tree'){

			if(villagerList[v].nearest === null || villagerList[v].nearest.name !== 'tree' || villagerList[v].nearest.health <= 0){
				findResource(villagerList[v],treeList);
			} else {
				harvest(villagerList[v],villagerList[v].nearest);
				moveEntityTowardEntity(villagerList[v],villagerList[v].nearest);
			}

		} else if (villagerList[v].state === 'depot') {

			findDepot(villagerList[v]);
			moveEntityTowardEntity(villagerList[v],villagerList[v].nearest)
			store(villagerList[v],villagerList[v].nearest);

		} else if (villagerList[v].state === 'berryBush') {

			if(villagerList[v].nearest === null || villagerList[v].nearest.health <= 0){
				findResource(villagerList[v],berryBushList);
			} else {
				harvest(villagerList[v],villagerList[v].nearest);
				moveEntityTowardEntity(villagerList[v],villagerList[v].nearest)
			}
		}
	}
}
