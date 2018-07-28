'use strict';

const express = require('express');
const morgan = require('morgan');
const apiKey = 'FLPn3vd3iImshX0Wz9QLpJuAAYcop1Ml2jVjsnH8QFlK0EEpfK';
const unirest = require('unirest');

const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

function searchPodcasts(query, res) {
	unirest.get("https://listennotes.p.mashape.com/api/v1/search?language=English&q="+ query +"&type=podcast")
		.header("X-Mashape-Key", "FLPn3vd3iImshX0Wz9QLpJuAAYcop1Ml2jVjsnH8QFlK0EEpfK")
		.header("Accept", "application/json")
		.end(function (result) {
		  res.send(result.body);
	});
}


app.get('/podcasts', (req, res) => {
	console.log(req.query);
	searchPodcasts(req.query.q, res);
});


if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;