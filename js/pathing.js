/////////////////////////////
//Map Generation Functions
/////////////////////////////

//return the distance between 2 entities
function distanceBetweenEntities(e1, e2){
	var vx = e1.x - e2.x;
	var vy = e1.y - e2.y;
	return Math.sqrt(vx*vx+vy*vy);
}

//return the distance between 2 sets of coords
function distanceBetweenCoords(e1x, e1y, e2x, e2y){
	var vx = e1x - e2x;
	var vy = e1y - e2y;
	return Math.sqrt(vx*vx+vy*vy);
}

//find nearest resource (tree/berry bush)
function findResource(villager,list,name) {
	if(Object.keys(list).length <= 0 && villager.state === name){
		villager.state = 'idle';
	} else {
		var nearestDistance = 999999;
		for (var i in list){
			var villagerX = villager.x+Math.random()*50-25;
			var villagerY = villager.y+Math.random()*50-25;
			dist = distanceBetweenCoords(villagerX,villagerY,list[i].x,list[i].y);
			if (dist < nearestDistance) {
				nearestDistance = dist;
				villager.nearest = list[i];
			}
		}
	}
}

//find nearest depot
function findDepot(villager) {
	var nearestDistance = 999999;
	for (var d in depotList){
		dist = distanceBetweenEntities(villager,depotList[d]);
		if (dist < nearestDistance) {
			nearestDistance = dist;
			villager.nearest = depotList[d];
		}
	}
}

//moving an entity in the direction of another entity
function moveEntityTowardEntity(movingE, followedE){
	// Calculate direction towards player
    toEntityX = followedE.x - movingE.x;
    toEntityY = followedE.y - movingE.y;

    // Normalize
    toEntityLength = Math.sqrt(toEntityX * toEntityX + toEntityY * toEntityY);
    toEntityX = toEntityX / toEntityLength;
    toEntityY = toEntityY / toEntityLength;

    // Move towards the entity
    movingE.x += toEntityX * 2;
    movingE.y += toEntityY * 2;
}
