'use strict';
const fs = require('fs');
const YAML = require('yaml');
const jsdom = require('jsdom');
const logger = require('./logger');
const Utils = require('./utils');

const { JSDOM } = jsdom;

let key = 1;

function extractRow(tr) {
	const result = {
		key,
		name: null,
		type: null,
		slots: [],
	};
	key++;

	// extracts all columns
	try {
		const tds = tr.getElementsByTagName('td');
		for (let j = 0; j < tds.length; j++) {
			const td = tds[j];
			if (j === 0) {
				// extracts name
				result.name = td.textContent.trim();
			}
			else if (j >= 20 && j < 24) {
				// extracts slot 1-4
				const img = td.getElementsByTagName('img')[0];
				if (img) {
					const alt = img.alt;
					if (Utils.checkSlot(alt))
						result.slots.push(alt);
				}
			}
		}
		return result.name !== null ? result : null;
	}
	catch (e) {
		logger.error(e.message);
		logger.error(`${result.name}: has detected error, skip`);
		return null;
	}
}

function extractTable(type, table) {
	const result = [];
	try {
		const trs = table.getElementsByTagName('tr');
		for (let i = 0; i < trs.length; i++) {
			const tr = trs[i];
			const row = extractRow(tr);
			if (row) {
				row.type = type;
				result.push(row);
			}
		}
	}
	catch (e) {
		console.error(e.message);
		console.error(`${type}: has detected error, skip whole`);
	}
	return result;
}

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

async function generate() {
	const url = 'https://agarest.fandom.com/wiki/Weapons';

	try {
		// loads URL
		const dom = await JSDOM.fromURL(url, {});

		// finds the starting point to extract
		const start = dom.window.document.getElementsByClassName('mw-parser-output')[0];
		if (!start)
			throw new Error(`weapons: cannot find start extract point`);

		// finds all look-like table(s)
		const tables = start.getElementsByTagName('table');
		let index = 0;
		for (let i = 0; i < tables.length; i++) {
			const table = tables[i];
			if (checkTable(table)) {
				// extracts table data
				const type = Utils.weaponGroupList[index++];
				const array = extractTable(type, table);
				const result = YAML.stringify(array);

				// saves
				await fs.promises.writeFile(`./out/Weapon ${type} List.yaml`, result);
				if (index >= Utils.weaponGroupList.length)
					break;
			}
		}
		logger.info(`weapon lists is generated`);
	}
	catch (e) {
		console.error(e.message);
		console.error(`url: ${url}`);
	}
}

module.exports = {
	generate,
};
