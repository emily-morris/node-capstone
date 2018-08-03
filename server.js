'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const apiKey = 'FLPn3vd3iImshX0Wz9QLpJuAAYcop1Ml2jVjsnH8QFlK0EEpfK';

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { QueueItem, User } = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

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

app.get('/queueItem', (req, res) => {
	QueueItem.find()
	.then(queueItem => {
		res.json({queueItem});
	})
	.catch(err => {
		console.err(err);
		res.status(500).json({message: 'Something went wrong.'});
	});
});

app.get('/user', (req, res) => {
	User
		.find()
		.then(users => {
			res.json(users.map(user => {
				return {
					id: user._id,
					userName: user.userName
				};
			}));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something went wrong'})
		});
});

app.post('/queueItem', jsonParser, (req, res) => {
	console.log('Adding to queueItem');
	console.log(req.body);
	console.log(req.body.id);
	User
		.findById(req.body.user_id)
		.then(user => {
			if(user) {
				QueueItem
					.create({
						listenNotesId: req.body.id
					})
					.then(item => res.status(201).json({
						id: item.id,
						user: user._id
					}))
					.catch(err => {
						console.error(err);
						res.status(500).json({error: 'Something went wrong'});
					});
			}
			else {
				const message = `User not found`;
				console.error(message);
				return res.status(400).send(message);
			}
		})
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