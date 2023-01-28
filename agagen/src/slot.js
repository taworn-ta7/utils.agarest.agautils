const availableSlots = [
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
	return availableSlots.includes(slot);
}

module.exports = {
	availableSlots,
	checkSlot,
};
