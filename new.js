'use strict';

const HTTPS = require('https');
const BotId = process.env.BOT_ID;

class CoachBot {
	constructor() {
		console.log('new coah bot called');
		this.tests = [
			{
				textTest : /quickie|quick/gi,
				response : {
					text : '',
					attachments : [
						{
							'type' : 'image',
							'url' : 'https://s-media-cache-ak0.pinimg.com/736x/ac/7f/67/ac7f672d9c2c8f88c53459478e0d3a65.jpg'
						}
					]
				}
			},
			{
				textTest : /sharks/gi,
				response : {
					text : '',
					attachments : [
						{
							'type' : 'image',
							'url' : 'http://www.letsgokings.com/gallery/files/1/971371_684843004887650_7226444408218914847_n.jpg'
						}
					]
				}
			},
			{
				textTest : /kings/gi,
				response : {
					text : 'go kings go',
					attachments : []
				}
			}
		];
	}

	respond() {
		var request = JSON.parse(this.req.chunks[0]);
		console.log(request);
		if (request.text) {
			this.res.writeHead(200);
			this._checkText(request.text);
			this.res.end();
		} else {
			console.log("don't care");
			this.res.writeHead(200);
			this.res.end();

		}
	}

	_checkText(text) {
		let matchFound;

		this.tests.forEach((item, idx) => {
			console.log(item.textTest.test(text));
			if (item.textTest.test(text)) {
				matchFound = item.response;
			}
		});

		if (matchFound) {
			this._postMessage(matchFound);
		}
	}

	_postMessage(msg) {
		let options,
			body,
			botReq;

		options = {
			hostname : 'api.groupme.com',
			path : '/v3/bots/post',
			method : 'POST'
		};

		body = {
			'bot_id' : botID,
			'text' : msg.text,
			'attachments' : msg.attachments
		};

		console.log('sending' , body);

		botReq = HTTPS.request(options, function (res) {
			if (res.statusCode == 202) {
				//neat
			} else {
				console.log('rejecting bad status code ' + res.statusCode);
			}
		});

		botReq.on('error', (err) => {
			console.log('error posting message ' + JSON.stringify(err));
		});

		botReq.on('timeout', (err) => {
			console.log('timeout posting message ' + JSON.stringify(err));
		});

		botReq.end(JSON.stringify(body));
	}

}

module.exports = CoachBot;