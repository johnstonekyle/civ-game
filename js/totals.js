/////////////////////////////
//Functions That Calculate Totals of Things (wood/food/population)
/////////////////////////////

//calculate total wood
function totalWood() {
	var total = 0;
	for (var d in depotList){
		total += depotList[d].wood;
	}
	return total;
}

//calculate total berries
function totalFood() {
	var total = 0;
	for (var d in depotList){
		total += depotList[d].food;
	}
	return total;
}

//calculate total population
function totalPop() {
	var total = 0;
	for (var v in villagerList){
		total ++;
	}
	for (var v in babyList){
		total ++;
	}
	return total;
}

//calculate total population cap
function totalPopCap(){
	var total = 0;
	for (var d in depotList){
		total += depotList[d].popCap;
	}
	for (var h in houseList){
		total += houseList[h].popCap;
	}
	return total
}
