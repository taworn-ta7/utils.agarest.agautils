const fs = require('fs');
const YAML = require('yaml');
const jsdom = require('jsdom');
const logger = require('./logger');
const Slot = require('./slot');

const { JSDOM } = jsdom;

/**
 * Extracts table.
 * Returns character's available slots.
 */
function extractTable(table, name) {
	const slots = [];
	try {
		const imgs = table.getElementsByTagName('img');
		for (let i = 0; i < imgs.length; i++) {
			const img = imgs[i];
			if (Slot.checkSlot(img.alt)) {
				slots.push(img.alt);
			}
		}

		// slots must be 6 items
		if (slots.length !== 6) {
			return false;
		}
	}
	catch (e) {
		// errors detected, skip whole and print log
		console.error(e.message);
		console.error(`character: has detected errors, skip whole T_T`);
	}

	const result = {
		name,
		slots: [
			slots[0],
			slots[1],
			slots[2],
			slots[3],
		],
		povSlots: [
			slots[4],
			slots[5],
		],
	};
	return result;
}

/**
 * Checks if a table has desire format.
 */
function checkTable(table) {
	const tr = table.getElementsByTagName('tr')[0];
	if (tr) {
		const td = tr.getElementsByTagName('td')[0];
		if (td) {
			const chk0 = td.textContent.trim().toLowerCase() === "statistics";
			return chk0;
		}
	}
	return false;
}

/**
 * Generates character list.
 */
async function generate() {
	const url = 'https://agarest.fandom.com/wiki/';

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

	for (let index = 0; index < characterList.length; index++) {
		try {
			// loads URL
			let name = characterList[index];
			const dom = await JSDOM.fromURL(url + name, {});
			//console.log(dom.serialize());

			// finds the starting point to extract
			const start = dom.window.document.getElementsByClassName('mw-parser-output')[0];
			//logger.debug(`start: ${start}`);
			if (!start)
				throw new Error(`${name}: cannot find start extract point`);

			// finds all look-like table(s)
			const tables = start.getElementsByTagName('table');
			//logger.debug(`table(s): ${tables.length} element(s)`);
			for (let i = 0; i < tables.length; i++) {
				const table = tables[i];
				if (checkTable(table)) {
					// extracts table data
					const array = extractTable(table, name);
					const result = YAML.stringify(array);
					//logger.debug(result);

					// saves
					await fs.promises.writeFile(`./out/Character ${name}.yaml`, result);
					break;
				}
			}
			logger.info(`${name} is generated :)`);
		}
		catch (e) {
			console.error(e.message);
			console.error(`url: ${url}`);
		}
	}
}

module.exports = {
	generate,
};
