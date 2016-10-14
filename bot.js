'use strict';

const HTTPS = require('https');
const BotID = process.env.BOT_ID;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


const tests = [
	{
		textTest : new RegExp(/quickie|quick/, 'gi'),
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
		textTest : new RegExp(/sharks/, 'gi'),
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
		textTest : new RegExp(/teddy|purcell/, 'gi'),
		response : {
			text : '',
			attachments : [
				{
					'type' : 'image',
					'url' : 'https://cdn.meme.am/instances/500x/41325779.jpg'
				}
			]
		}
	},
	{
		textTest : new RegExp(/ducks/, 'gi'),
		response : {
			text : '',
			attachments : [
				{
					'type' : 'image',
					'url' : 'https://s-media-cache-ak0.pinimg.com/236x/d8/0c/a8/d80ca843b6a52f2a2cde10a5a71f4090.jpg'
				}
			]
		}
	},
	{
		textTest : new RegExp(/getzlaf/, 'gi'),
		response : {
			text : '',
			attachments : [
				{
					'type' : 'image',
					'url' : 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13754381_1164387860249406_921839340831606062_n.jpg?oh=ffe9f3e05516c13ac4132affa3fc879c&oe=58A96F33'
				}
			]
		}
	},
	{
		textTest : new RegExp(/carter/, 'gi'),
		response : {
			text : 'Laaaaaaazzzzyyyy',
			attachments : []
		}
	},
	{
		textTest : new RegExp(/series|playoffs/, 'gi'),
		response : {
			text : 'The team that wins 4 games is going to win the series',
			attachments : []
		}
	},
	{
		textTest : new RegExp(/kings/, 'gi'),
		response : {
			text : 'go kings go',
			attachments : []
		}
	}/*,
	{
		textTest : new RegExp(/amber/, 'gi'),
		response : {
			text : [
				'1',
				'2',
				'3'
			],
			attachments : []
		}
	}*/
];
//http://theroyalhalf.com/wp-content/uploads/2013/09/Darryl-Sutter-Fist-Pump-LA-Kings.gif
// The team that wins 4 games is going to win the series
//http://l2.yimg.com/bt/api/res/1.2/miYbeafoL3L2LHQIgvb1qw--/YXBwaWQ9eW5ld3NfbGVnbztpbD1wbGFuZTtxPTc1O3c9NjAw/http://media.zenfs.com/en/person/Ysports/teddy-purcell-hockey-headshot-photo.jpg


function respond() {
	// console.log(this);
		var request = JSON.parse(this.req.chunks[0]);
		if (request.text) {
			this.res.writeHead(200);
			_checkText(request.text);
			this.res.end();
		} else {
			console.log("don't care");
			this.res.writeHead(200);
			this.res.end();

		}
	}
	
	function _checkText(text) {
		let matchFound;
		
		tests.forEach((item, idx) => {
			// console.log(item.textTest.test(text));
			if (item.textTest.test(text)) {
				matchFound = item.response;
			}
		});
		
		if (matchFound) {
			_postMessage(matchFound);
		}
	}
	
	function _postMessage(msg) {
		let options,
			body,
			botReq;

		options = {
			hostname : 'api.groupme.com', 
			path : '/v3/bots/post', 
			method : 'POST'
		};

		body = {
			'bot_id' : BotID,
			'text' : typeof(msg.text) === 'string' ? msg.text : msg.text[getRandomInt(0, msg.text.length)],
			'attachments' : msg.attachments
		};

		// console.log('sending' , body);

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


exports.respond = respond;