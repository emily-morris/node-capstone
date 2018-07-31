'use strict';

const mongoose = require('mongoose');

const queueSchema = mongoose.Schema({
		id: String,
		title: String,
		publisher: String,
		description: String,
		website: String,
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		unique: true
	}
});

const Queue = mongoose.model('Queue', queueSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Queue, User };