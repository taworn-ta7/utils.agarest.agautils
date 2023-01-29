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

export default {
	characterList,
	weaponGroupList,
	slotList,
	checkSlot,
};
