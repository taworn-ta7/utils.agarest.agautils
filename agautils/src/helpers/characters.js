const fs = require('fs');
const os = require('os');

function loadCharacters() {
	console.log(`I'm here :)`);

	console.log('You are running on ', os.platform());

	fs.readdir('.', (err, files) => {
		files.forEach(file => {
			console.log(file);
		});
	});
}

export default {
	loadCharacters,
}
