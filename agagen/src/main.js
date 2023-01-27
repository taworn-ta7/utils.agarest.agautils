const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function main() {
	const url = 'https://agarest.fandom.com/wiki/Agarest_Wiki';

	try {
		const dom = await JSDOM.fromURL(url, {});
		console.log(dom.serialize());
	}
	catch (e) {
		console.error(e.message);
		console.error(`url: ${url}`);
	}
}

main();
