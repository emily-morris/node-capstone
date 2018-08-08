'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const noteSchema = mongoose.Schema({
	content: {type: String}
});

const queueItemSchema = mongoose.Schema({
	// assume listenNotesId won't change
		listenNotesId: {
			type: String,
			unique: true
		},
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		notes: [noteSchema]
});

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		unique: true
	}
});

const QueueItem = mongoose.model('QueueItem', queueItemSchema);
const User = mongoose.model('User', userSchema);

module.exports = { QueueItem, User };