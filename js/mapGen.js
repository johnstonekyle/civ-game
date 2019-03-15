/////////////////////////////
//Map Generation Functions
/////////////////////////////

//checking if the specified coords is occupied by
//the specified object(list) within a certain distance
function isSpaceOccupiedByItself(list,distance,x,y){
	for(var i in list){
		if (distanceBetweenCoords(list[i].x,list[i].y,x,y) < distance)
			return true;
	}
	return false;
}

//checking if there is something within a distance of the specified coords
//excludes the specified entity
function isSpaceOccupied(entity, distance, x, y){
	if(entity !== 'tree'){
		for(var i in treeList){

			if(distanceBetweenCoords(treeList[i].x,treeList[i].y,x,y) < distance){
				return true;
			}
		}
	}
	if(entity !== 'berryBush'){
		for(var i in berryBushList){

			if(distanceBetweenCoords(berryBushList[i].x,berryBushList[i].y,x,y) < distance){
				return true;
			}
		}
	}
	if(entity !== 'villager'){
		for(var i in villagerList){

			if(distanceBetweenCoords(villagerList[i].x,villagerList[i].y,x,y) < distance){
				return true;
			}
		}
	}
	if(entity !== 'depot'){
		for(var i in depotList){

			if(distanceBetweenCoords(depotList[i].x,depotList[i].y,x,y) < distance){
				return true;
			}
		}
	}
	return false;
}

//generate depot
function generateDepot(id,food,wood){
	var x = Math.round((WIDTH/2) / gridSize) * gridSize;
	var y = Math.round((HEIGHT/2) / gridSize) * gridSize;

	Depot(id,x,y);
	depotList[id].food = food;
	depotList[id].wood = wood;
}

///generate forests
function generateTrees(clusters,offset,minTrees,variance,spreadRadius,sparsity) {
	for (var i = 0; i < clusters; i++) {
		//random X and Y positions to start the forest, not on the edge
		X = (Math.floor(Math.random()*(WIDTH-(offset*2))))+offset;
		Y = (Math.floor(Math.random()*(HEIGHT-(offset*2))))+offset;

		while(isSpaceOccupied('tree',offset*4,X,Y)){
			X = (Math.floor(Math.random()*(WIDTH-(offset*2))))+offset;
			Y = (Math.floor(Math.random()*(HEIGHT-(offset*2))))+offset;
		}
		//random amount of trees
		trees = Math.floor((Math.random()*variance)+minTrees)
		//random amount of space the forest will take up
		spread = Math.floor((Math.random()*spreadRadius)+spreadRadius)

		for (var j = trees; j >= 0; j--) {
			treeX = X+Math.random()*spread-(spread/2);
			treeY = Y+Math.random()*spread-(spread/2);

			var loopCounter = 0;
			while(isSpaceOccupiedByItself(treeList,sparsity,treeX,treeY) && loopCounter < 99){
				treeX = X+Math.random()*spread-(spread/2);
				treeY = Y+Math.random()*spread-(spread/2);
				loopCounter++;
			}
			if (loopCounter < 99)
				Tree('cluster'+i+'tree'+j,treeX,treeY);
		}
	}
}

//generate berry bushes
function generateBerryBushes(clusters,offset,minBushes,variance,spreadRadius,sparsity) {
	for (var i = 0; i < clusters; i++) {
		//random X and Y positions to start the bushes, not on the edge
		X = (Math.floor(Math.random()*(WIDTH-(offset*2))))+offset;
		Y = (Math.floor(Math.random()*(HEIGHT-(offset*2))))+offset;

		//find new X & Y coords if the space is occupied
		while(isSpaceOccupied('berryBush',offset*2,X,Y)){
			X = (Math.floor(Math.random()*(WIDTH-(offset*2))))+offset;
			Y = (Math.floor(Math.random()*(HEIGHT-(offset*2))))+offset;
		}

		//random amount of bushes
		bushes = Math.floor((Math.random()*variance))+minBushes
		//random amount of space the bushes will take up
		spread = Math.floor((Math.random()*(spreadRadius*2))+spreadRadius)

		for (var j = bushes; j > 0; j--) {
			bushX = X+Math.random()*spread-(spread/2);
			bushY = Y+Math.random()*spread-(spread/2);
			//find new X & Y coords if space is occupied by other bushes
			var loopCounter = 0;
			while(isSpaceOccupiedByItself(berryBushList,sparsity,bushX,bushY) && loopCounter < 99){
				bushX = X+Math.random()*spread-(spread/2);
				bushY = Y+Math.random()*spread-(spread/2);
				loopCounter++;
			}
			if (loopCounter < 99)
				BerryBush('cluster'+i+'bush'+j,bushX,bushY);
		}
	}
}

//generate villagers
function generateVillagers(amount,distanceFromCentre){
	for (var i = 0; i < amount; i++) {
		var x = Math.floor(WIDTH/2+(Math.random()*(distanceFromCentre*2))-distanceFromCentre);
		var y = Math.floor(HEIGHT/2+(Math.random()*(distanceFromCentre*2))-distanceFromCentre);
		Villager('villager'+i,x,y)
	}
}
