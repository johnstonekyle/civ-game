/////////////////////////////
//Object Lists
/////////////////////////////
var villagerList = {};
var treeList = {};
var depotList = {};
var berryBushList = {};
var houseList = {};
var babyList = {};
var farmList = {};
var barracksList = {};
var objectList = {};
var placeholderList = {};

/////////////////////////////
//Objects
/////////////////////////////
function Depot(id,x,y){
	var depot = {
		id:id,
		name:'depot',
		x:x,
		y:y,
		sprite:document.getElementById('depotSprite'),
		size:15,
		wood:0,
		food:0,
		popCap:3,
	}
	depotList[id] = depot;
	objectList[id] = depot;
}

function House(id,x,y){
	var house = {
		id:id,
		name:'house',
		x:x,
		y:y,
		sprite:document.getElementById('houseSprite'),
		size:20,
		popCap:3,
	}
	houseList[id] = house;
	objectList[id] = house;
}

function Barracks(id,x,y){
	var barracks = {
		id:id,
		name:'barracks',
		x:x,
		y:y,
		sprite:document.getElementById('barracksSprite'),
		size:25,
	}
	barracksList[id] = barracks;
	objectList[id] = barracks;
}

function Farm(id,x,y){
	var farm = {
		id:id,
		name:'farm',
		x:x,
		y:y,
		sprite:document.getElementById('farmSprite'),
		size:20,
		timeUntilHarvest:100,
	}
	farmList[id] = farm;
	objectList[id] = farm;
}

function Villager(id,x,y){
	var villager = {
		id:id,
		name:'villager',
		x:x,
		y:y,
		sprite:document.getElementById('villagerSprite'),
		size:7,
		wood:0,
		food:0,
		invCap:100,
		state:'idle',
		prevState: 'idle',
		nearest:null,
	};
	villagerList[id] = villager;
	objectList[id] = villager;
}

function Baby(id,x,y,wanderX,wanderY,occ){
	var baby = {
		id:id,
		name:'baby',
		x:x,
		y:y,
		sprite:document.getElementById('villagerSprite'),
		size:5,
		wanderX:wanderX,
		wanderY:wanderY,
		occ:occ,
		age:0,
		growthAge:100,
	}
	babyList[id] = baby;
	objectList[id] = baby;
}

function Tree(id,x,y){
	var tree = {
		id:id,
		name:'tree',
		x:x,
		y:y,
		sprite:document.getElementById('treeSprite'),
		size:15,
		health:100,
	};
	treeList[id] = tree;
	objectList[id] = tree;
}

function BerryBush(id,x,y){
	var berryBush = {
		id:id,
		name:'berryBush',
		x:x,
		y:y,
		sprite:document.getElementById('berryBushSprite'),
		size:15,
		health:100,
	};
	berryBushList[id] = berryBush;
	objectList[id] = berryBush;
}

/////////////////////////////
//Placeholder Objects
/////////////////////////////
var housePlaceholder = {
	x:-50,
	y:-50,
	name:'house',
	woodCost:1000,
	foodCost:0,
	sprite:document.getElementById('houseSprite'),
	size:20,
	construct: function (id,x,y) {
		House(id,x,y);
	},
};
placeholderList[housePlaceholder.name] = housePlaceholder;

var farmPlaceholder = {
	x:-50,
	y:-50,
	name:'farm',
	woodCost:1000,
	foodCost:2000,
	sprite:document.getElementById('farmSprite'),
	size:20,
	construct: function (id,x,y) {
		Farm(id,x,y);
	},
};
placeholderList[farmPlaceholder.name] = farmPlaceholder;

var barracksPlaceholder = {
	x:-50,
	y:-50,
	name:'barracks',
	woodCost:5000,
	foodCost:1000,
	sprite:document.getElementById('barracksSprite'),
	size:25,
	construct: function (id,x,y) {
		Barracks(id,x,y);
	},
};
placeholderList[barracksPlaceholder.name] = barracksPlaceholder;

var depotPlaceholder = {
	x:-50,
	y:-50,
	name:'depot',
	woodCost:3000,
	foodCost:3000,
	sprite:document.getElementById('depotSprite'),
	size:15,
	construct: function (id,x,y) {
		Depot(id,x,y);
	},
};
placeholderList[depotPlaceholder.name] = depotPlaceholder;
