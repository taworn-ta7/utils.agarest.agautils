const fs = require('fs');
const YAML = require('yaml');
const jsdom = require('jsdom');
const logger = require('./logger');
const Slot = require('./slot');

const { JSDOM } = jsdom;

/**
 * Extracts row from table.
 * Returns skill name and used slots.
 */
function extractRow(tr) {
	const result = {
		name: null,
		slots: [],
	};

	// extracts all columns
	try {
		// it's arrange with th, th, td, td, td...
		// th[1] is name
		// td[0] column 3rd is combination

		// extracts name
		const th = tr.getElementsByTagName('th')[1];
		result.name = th.textContent.trim();
		//logger.debug(`${result.name}`);

		const tds = tr.getElementsByTagName('td');
		for (let j = 0; j < tds.length; j++) {
			const td = tds[j];
			if (j === 0) {
				// extracts slots used
				const imgs = td.getElementsByTagName('img');
				for (let k = 0; k < imgs.length; k++) {
					const alt = imgs[k].alt;
					if (Slot.checkSlot(alt)) {
						result.slots.push(alt);
					}
				}
			}
		}
		return result.name !== null && result.slots.length > 0 ? result : null;
	}
	catch (e) {
		// errors detected, skip and print log
		logger.error(e.message);
		logger.error(`${result.name}: has detected error, skip this skills`);
		return null;
	}
}

/**
 * Extracts table.
 * Returns combination skill list.
 */
function extractTable(table) {
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
		// errors detected, skip whole list and print log
		console.error(e.message);
		console.error(`combination skills: has detected errors in skills list, skip whole T_T`);
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
			const chk0 = ths[1].textContent.trim().toLowerCase() === "name";
			const chk1 = ths[2].textContent.trim().toLowerCase() === "combination";
			const chk2 = ths[3].textContent.trim().toLowerCase() === "targets";
			return chk0 && chk1 && chk2;
		}
	}
	return false;
}

/**
 * Generates combination skill list.
 */
async function generate() {
	const url = 'https://agarest.fandom.com/wiki/Combination_Attacks';

	try {
		// loads URL
		const dom = await JSDOM.fromURL(url, {});
		//console.log(dom.serialize());

		// finds the starting point to extract
		const start = dom.window.document.getElementsByClassName('mw-parser-output')[0];
		//logger.debug(`start: ${start}`);
		if (!start)
			throw new Error(`skills: cannot find start extract point`);

		// finds all look-like table(s)
		const tables = start.getElementsByTagName('table');
		//logger.debug(`table(s): ${tables.length} element(s)`);
		for (let i = 0; i < tables.length; i++) {
			const table = tables[i];
			if (checkTable(table)) {
				// extracts table data
				const array = extractTable(table);
				const result = YAML.stringify(array);
				//logger.debug(result);

				// saves
				await fs.promises.writeFile(`./out/Combination Skill List.yaml`, result);
				break;
			}
		}
		logger.info(`combination skill list is generated :)`);
	}
	catch (e) {
		console.error(e.message);
		console.error(`url: ${url}`);
	}
}

module.exports = {
	generate,
};
