'use strict';

var HTTPS = require('https');
var BotId = process.env.BOT_ID;

class CoachBot {
	constructor() {
		console.log('new coah bot called', console.log(arguments));
	}

	respond() {
		console.log(this);
		console.log(arguments);
	}
}

module.exports = CoachBot;