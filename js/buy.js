/////////////////////////////
//Building and Buying Functions
/////////////////////////////

//pay for a purchase
function pay(placeholder){
	woodCost = placeholder.woodCost;
	foodCost = placeholder.foodCost;
	for (var d in depotList){
		if (woodCost > 0){
			if (depotList[d].wood >= woodCost){
				depotList[d].wood -= woodCost;
				woodCost = 0;
			} else {
				woodCost -= depotList[d].wood;
				depotList[d].wood = 0;
			}
		}
		if (foodCost > 0){
			if (depotList[d].food >= foodCost){
				depotList[d].food -= foodCost;
				foodCost = 0;
			} else {
				foodCost -= depotList[d].food;
				depotList[d].food = 0;
			}
		}
	}
}

//build a structure
function buy(placeholderName){
	var placeholder;
	//find placeholder
	for(var i in placeholderList){
		if (placeholderList[i].name === placeholderName)
			placeholder = placeholderList[i];
	}

	var woodCost = placeholder.woodCost;
	var foodCost = placeholder.foodCost;

	if(totalWood() >= woodCost && totalFood() >= foodCost){
		cursorState = placeholder.name;
	} else {
		alert('not enough materials');
	}
}

//buy a villager
function buyVillager(){
	var woodCost = 0;
	var foodCost = 500;

	if(totalPop() < totalPopCap()){
		if(totalWood() >= woodCost && totalFood() >= foodCost){
			x = WIDTH/2+(Math.random()*50)-25;
			y = HEIGHT/2+(Math.random()*50)-25;
			Baby('baby' + idCounter++,x,y,x,y,'villager');

			//pay for baby
			for (var d in depotList){
				if (woodCost > 0){
					if (depotList[d].wood >= woodCost){
						depotList[d].wood -= woodCost;
						woodCost = 0;
					} else {
						woodCost -= depotList[d].wood;
						depotList[d].wood = 0;
					}
				}
				if (foodCost > 0){
					if (depotList[d].food >= foodCost){
						depotList[d].food -= foodCost;
						foodCost = 0;
					} else {
						foodCost -= depotList[d].food;
						depotList[d].food = 0;
					}
				}
			}
		} else {
			alert('not enough materials');
		}
	} else {
		alert("you've reached your population cap");
	}
}
