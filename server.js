'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const apiKey = 'FLPn3vd3iImshX0Wz9QLpJuAAYcop1Ml2jVjsnH8QFlK0EEpfK';
const unirest = require('unirest');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Queue } = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

function getPodcasts(query, res) {
	unirest.get('https://listennotes.p.mashape.com/api/v1/search?language=English&q='+ query +'&type=podcast')
		.header('X-Mashape-Key', apiKey)
		.header('Accept', 'application/json')
		.end(result => {
		  res.send(result.body);
	});
}

// enable CORS
app.use((req, res, next) => {
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
	Queue.find()
	.then(queue => {
		res.json({queue});
	})
	.catch(err => {
		console.err(err);
		res.status(500).json({message: 'Something went wrong.'});
	});
});

app.post('/queue', jsonParser, (req, res) => {
	console.log('Adding to queue');
	console.log(req.body);
	Queue
		.create({
				id: req.body.id, 
				title: req.body.title, 
				publisher: req.body.publisher, 
				description: req.body.description, 
				website: req.body.website
		})
		.then(item => res.status(201).json())
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something went wrong'});
		});
});

// use if client makes request to non-existent endpoint
app.use('*', (req, res) => {
	res.status(404).json({message: 'Not found'});
});

let server;

function runServer(databaseURL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(
			databaseURL,
			err => {
				if (err) {
					return reject(err);
				}
				server = app
					.listen(port, () => {
						console.log(`Your app is listening on port ${port}`);
						resolve();
				})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
			}
		);
	});
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };