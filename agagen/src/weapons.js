const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const logger = require('./logger');

async function generate() {
	const url = 'https://agarest.fandom.com/wiki/Weapons';

	try {
		const dom = await JSDOM.fromURL(url, {});
		//console.log(dom.serialize());

		const starts = dom.window.document.getElementsByClassName('mw-parser-output');
		logger.debug(`start(s): ${starts.length}`);
		const start = starts[0];
		logger.debug(`start: ${start}`);

		const headers = start.querySelectorAll('h3 span.mw-headline');
		logger.debug(`header(s): ${headers.length}`);
		const header = headers[0];
		logger.debug(`header: ${header} [${header.textContent.trim()}]`);

		const tables = start.getElementsByTagName('table');
		logger.debug(`table(s): ${tables.length}`);
		const table = tables[0];
		logger.debug(`table: ${table}`);

		const tbody = table.getElementsByTagName('tbody')[0];
		logger.debug(`tbody: ${tbody}`);
		const trs = table.getElementsByTagName('tr');
		logger.debug(`tr(s): ${trs.length}`);
		for (var i = 0; i < trs.length; i++) {
			const tr = trs[i];
			const tds = tr.getElementsByTagName('td');
			for (var j = 0; j < tds.length; j++) {
				const td = tds[j];
				if (j === 0) {
					logger.debug(`${td.textContent.trim()}`);
				}
				else if (j >= 20 && j < 24) {
					const imgs = td.getElementsByTagName('img');
					if (imgs.length > 0) {
						const img = imgs[0];
						const alt = img.alt;
						logger.debug(`<IMG ${alt}>`);
					}
				}
			}
		}
	}
	catch (e) {
		console.error(e.message);
		console.error(`url: ${url}`);
	}
}

module.exports = {
	generate,
}
