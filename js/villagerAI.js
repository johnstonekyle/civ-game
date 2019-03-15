/////////////////////////////
//Villager Gathering/Storing Functions
/////////////////////////////

//villager heads to depot if inv is full
function checkInvCap(villager){
	if (villager.wood + villager.food >= villager.invCap && villager.state !== 'depot'){
		villager.prevState = villager.state;
		villager.state = 'depot';
	}
}

//villager harvests resource if close enough
function harvest(villager, resource){
	//if villager collecting resource
	if (distanceBetweenEntities(villager, resource) < 5 && !resource.name.includes('depot') ){
		//damage resource
		resource.health -= 0.1;
		if(villager.state === 'tree' && resource.name.includes('tree'))
			villager.wood += 1;
		else if (villager.state === 'berryBush' && resource.name.includes('berryBush'))
			villager.food += 1;

		//if resource has been completely collected
		if (resource.health <= 0){
			if(villager.state === 'tree') {
				delete treeList[resource.id];
				delete objectList[resource.id];
				findResource(villager,treeList,'tree');
			}
			else if(villager.state === 'berryBush')
				delete berryBushList[resource.id];
				delete objectList[resource.id];
				findResource(villager,berryBushList,'berryBush');
		}
	}
}

//villager stores all its resources if close enough
function store(villager, depot){
	//if villager close to depot
	if (distanceBetweenEntities(villager, depot) < 5){
		villager.nearest = null;

		//store resources
		depot.wood += villager.wood;
		depot.food += villager.food;
		villager.food = 0;
		villager.wood = 0;

		//return villager their previous state
		villager.state = villager.prevState;
	}
}
