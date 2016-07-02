var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond () {
	var request = JSON.parse(this.req.chunks[0]), botRegex = /^\/cool guy$/;

	if (request.text && (botRegex.test(request.text) ||quick(request.text)) ) {
		this.res.writeHead(200);
		postMessage();
		this.res.end();
	} else {
		console.log("don't care");
		this.res.writeHead(200);
		this.res.end();
	}
}

function getImage () {
	return [{
		"type" : "image", "url" : "http://www.quickmeme.com/img/ce/cef9621297cfc2ca2af91e452d0b86d5e9fee60cd151615cfc5fa074185006f9.jpg"
	}]
}

function quick(text) {
	var quickReg = /quick|quickie/gi;
	if (quickReg.test(text)) {
		return {
			text : '',
			attachments : [{
				"type" : "image",
				"url" : "https://s-media-cache-ak0.pinimg.com/736x/ac/7f/67/ac7f672d9c2c8f88c53459478e0d3a65.jpg"
			}]
		}
	} else {
		return false;
	}
}

function postMessage () {
	var botResponse, options, body, botReq;

	botResponse = cool();

	options = {
		hostname : 'api.groupme.com', path : '/v3/bots/post', method : 'POST'
	};

	body = {
		"bot_id" : botID, "text" : botResponse, "attachments" : getImage()
	};

	console.log('sending ' + botResponse + ' to ' + botID);

	botReq = HTTPS.request(options, function (res) {
		if (res.statusCode == 202) {
			//neat
		} else {
			console.log('rejecting bad status code ' + res.statusCode);
		}
	});

	botReq.on('error', function (err) {
		console.log('error posting message ' + JSON.stringify(err));
	});
	botReq.on('timeout', function (err) {
		console.log('timeout posting message ' + JSON.stringify(err));
	});
	botReq.end(JSON.stringify(body));
}

exports.respond = respond;