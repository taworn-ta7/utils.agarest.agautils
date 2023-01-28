const logger = require('./logger');
const weapons = require('./weapons');
const skills = require('./skills');

async function main() {
	logger.info(`Agarest Generator, v0.1`);
	logger.info(`output files will be generated in ./out directory!`);
	logger.info();

	await weapons.generate();
	await skills.generate();
}
main();
