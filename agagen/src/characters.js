'use strict';
const fs = require('fs');
const YAML = require('yaml');
const jsdom = require('jsdom');
const logger = require('./logger');
const Utils = require('./utils');

const { JSDOM } = jsdom;

function extractTable(table, data) {
	const slots = [];
	try {
		// extracts slot(s)
		const imgs = table.getElementsByTagName('img');
		for (let i = 0; i < imgs.length; i++) {
			const img = imgs[i];
			if (Utils.checkSlot(img.alt))
				slots.push(img.alt);
		}

		// slots must be 6 items
		if (slots.length !== 6) {
			return false;
		}
	}
	catch (e) {
		console.error(e.message);
		console.error(`${data.name}: has detected errors, skip`);
	}

	data.slots = slots;
	return data;
}

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

async function generate() {
	const url = 'https://agarest.fandom.com/wiki/';

	for (let index = 0; index < Utils.characterList.length; index++) {
		try {
			// loads URL
			let name = Utils.characterList[index];
			const dom = await JSDOM.fromURL(url + name, {});

			// finds the starting point to extract
			const start = dom.window.document.getElementsByClassName('mw-parser-output')[0];
			if (!start)
				throw new Error(`${name}: cannot find start extract point`);

			// finds all look-like table(s)
			const tables = start.getElementsByTagName('table');
			for (let i = 0; i < tables.length; i++) {
				const table = tables[i];
				if (checkTable(table)) {
					// preload data
					const found = Utils.characterDict.find((e) => e.name === name);
					const data = {
						name,
						weapons: found.weapons,
						slots: null,
					};

					// extracts table data
					extractTable(table, data);
					const result = YAML.stringify(data);

					// saves
					await fs.promises.writeFile(`./out/Character ${name}.yaml`, result);
					break;
				}
			}
			logger.info(`${name} is generated`);
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
