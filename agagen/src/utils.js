'use strict';

const characterList = [
	"Leonhardt",
	"Fyuria",
	"Luana",
	"Elaine",
	"Dyshana",
	"Ellis",
	"Borgnine",
	"Vira-Lorr",
	"Zerva",
	"Winfield",

	//"Ladius",
	"Valeria",
	"Yayoi",
	"Sherufanir",
	"Vashtor",
	"Arbol",
	"Sharona",

	//"Thoma",
	"Lavinia",
	"Faina",
	"Noah",
	"Plum",
	"Ganz",
	"Alberti",

	//"Duran",
	"Hildegard",
	"Silvi",
	"Ryuryu",
	"Qua",
	"Fer",
	"Reverie",

	//"Rex",
	"Beatrice",
	"Murmina",
];

const characterDict = [
	{ name: "Leonhardt", weapons: ['Sword', 'Large Sword'] },
	{ name: "Fyuria", weapons: ['Dagger'] },
	{ name: "Luana", weapons: ['Breaker'] },
	{ name: "Elaine", weapons: ['Spear'] },
	{ name: "Dyshana", weapons: ['Scythe'] },
	{ name: "Ellis", weapons: ['Rod', 'Sword'] },
	{ name: "Borgnine", weapons: ['Knuckle'] },
	{ name: "Vira-Lorr", weapons: ['Rod', 'Sword'] },
	{ name: "Zerva", weapons: ['Scythe'] },
	{ name: "Winfield", weapons: ['Gun'] },

	//{ name: "Ladius", weapons: [''] },
	{ name: "Valeria", weapons: ['Spear'] },
	{ name: "Yayoi", weapons: ['Rod'] },
	{ name: "Sherufanir", weapons: ['Dagger'] },
	{ name: "Vashtor", weapons: ['Sword', 'Large Sword'] },
	{ name: "Arbol", weapons: ['Rod'] },
	{ name: "Sharona", weapons: ['Breaker'] },

	//{ name: "Thoma", weapons: [''] },
	{ name: "Lavinia", weapons: ['Sword'] },
	{ name: "Faina", weapons: ['Rod'] },
	{ name: "Noah", weapons: ['Knuckle'] },
	{ name: "Plum", weapons: ['Rod'] },
	{ name: "Ganz", weapons: ['Spear'] },
	{ name: "Alberti", weapons: ['Dagger'] },

	//{ name: "Duran", weapons: [''] },
	{ name: "Hildegard", weapons: ['Gun'] },
	{ name: "Silvi", weapons: ['Sword'] },
	{ name: "Ryuryu", weapons: ['Scythe'] },
	{ name: "Qua", weapons: ['Knuckle'] },
	{ name: "Fer", weapons: ['Breaker'] },
	{ name: "Reverie", weapons: ['Spear'] },

	//{ name: "Rex", weapons: [''] },
	{ name: "Beatrice", weapons: ['Sword', 'Dagger'] },
	{ name: "Murmina", weapons: ['Gun'] },
];

const weaponGroupList = [
	"Sword",
	"Large Sword",
	"Dagger",
	"Spear",
	"Rod",
	"Knuckle",
	"Breaker",
	"Gun",
	"Scythe",
];

const slotList = [
	"Fire",
	"Water",
	"Thunder",
	"Wind",
	"Earth",
	"Dark",
	"Light",
	"Extra",
	"General",
	"Power",
	"Combo",
	"Special",
];

function checkSlot(slot) {
	return slotList.includes(slot);
}

module.exports = {
	characterList,
	characterDict,
	weaponGroupList,
	slotList,
	checkSlot,
};
