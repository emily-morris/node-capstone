'use strict';

const express = require('express');
const morgan = require('morgan');
const apiKey = 'FLPn3vd3iImshX0Wz9QLpJuAAYcop1Ml2jVjsnH8QFlK0EEpfK';
const unirest = require('unirest');

const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

function getPodcasts(query, res) {
	unirest.get('https://listennotes.p.mashape.com/api/v1/search?language=English&q='+ query +'&type=podcast')
		.header('X-Mashape-Key', apiKey)
		.header('Accept', 'application/json')
		.end(function (result) {
		  res.send(result.body);
	});
}

// enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/podcasts', (req, res) => {
	console.log(req.query);
	getPodcasts(req.query.q, res);
});

app.get('/queue', (req, res) => {

});

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;