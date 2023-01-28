const fs = require('fs');
const YAML = require('yaml');
const jsdom = require('jsdom');
const logger = require('./logger');

const { JSDOM } = jsdom;

/**
 * Extracts row from table.
 * Returns weapon name and slots.
 */
function extractRow(tr) {
	const result = {
		name: null,
		slots: [],
	};

	// extracts all columns
	try {
		const tds = tr.getElementsByTagName('td');
		for (let j = 0; j < tds.length; j++) {
			const td = tds[j];

			if (j === 0) {
				// extracts name
				result.name = td.textContent.trim();
				//logger.debug(`${result.name}`);
			}

			else if (j >= 20 && j < 24) {
				// extracts slot 1-4
				const img = td.getElementsByTagName('img')[0];
				if (img) {
					const alt = img.alt;
					result.slots.push(alt);
				}
			}
		}
		return result.name !== null ? result : null;
	}
	catch (e) {
		// errors detected, skip and print log
		logger.error(e.message);
		logger.error(`${result.name}: has detected error, skip this weapon`);
		return null;
	}
}

/**
 * Extracts table.
 * Returns one weapon list.
 */
function extractTable(type, table) {
	const result = [];
	try {
		const trs = table.getElementsByTagName('tr');
		for (let i = 0; i < trs.length; i++) {
			const tr = trs[i];
			const row = extractRow(tr);
			if (row) {
				result.push(row);
			}
		}
	}
	catch (e) {
		// errors detected, skip whole weapon type and print log
		console.error(e.message);
		console.error(`${type}: has detected error in weapon list, skip whole T_T`);
	}
	return result;
}

/**
 * Checks if a table has desire format.
 */
function checkTable(table) {
	const tr = table.getElementsByTagName('tr')[0];
	if (tr) {
		const ths = tr.getElementsByTagName('th');
		if (ths.length >= 4) {
			const chk0 = ths[0].textContent.trim() === "";
			const chk1 = ths[1].textContent.trim().toLowerCase() === "abilities";
			const chk2 = ths[2].textContent.trim().toLowerCase() === "attributes";
			const chk3 = ths[3].textContent.trim().toLowerCase() === "slots";
			return chk0 && chk1 && chk2 && chk3;
		}
	}
	return false;
}

/**
 * Generates all weapon lists.
 */
async function generate() {
	const url = 'https://agarest.fandom.com/wiki/Weapons';

	try {
		// loads URL
		const dom = await JSDOM.fromURL(url, {});
		//console.log(dom.serialize());

		// finds the starting point to extract
		const start = dom.window.document.getElementsByClassName('mw-parser-output')[0];
		//logger.debug(`start: ${start}`);
		if (!start)
			throw new Error(`cannot find start extract point`);

		// weapon lists
		const typeList = [
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
		let typeIndex = 0;

		// finds all look-like table(s)
		const tables = start.getElementsByTagName('table');
		//logger.debug(`table(s): ${tables.length} element(s)`);
		for (let i = 0; i < tables.length; i++) {
			const table = tables[i];
			if (checkTable(table)) {
				// extracts table data
				const type = typeList[typeIndex++];
				const array = extractTable(type, table);
				const result = YAML.stringify(array);
				//logger.debug(result);

				// saves
				await fs.promises.writeFile(`./out/Weapon ${type} List.yaml`, result);
				if (typeIndex >= typeList.length)
					break;
			}
		}
		logger.info(`weapon lists is generated :)`);
	}
	catch (e) {
		console.error(e.message);
		console.error(`url: ${url}`);
	}
}

module.exports = {
	generate,
}
