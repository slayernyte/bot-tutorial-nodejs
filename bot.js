'use strict';

const HTTPS = require('https');
const BotId = process.env.BOT_ID;

class CoachBot {
	constructor() {
		console.log('new coah bot called', console.log(arguments));
	}

	respond() {
		var request = JSON.parse(this.req.chunks[0]);
		console.log(request);
		this.res.writeHead(200);
		// postMessage();
		this.res.end();
	}
}

module.exports = CoachBot;