'use strict';

const mongoose = require('mongoose');

const queueItemSchema = mongoose.Schema({
	// assume listenNotesId won't change
		listenNotesId: {
			type: String,
			unique: true
		},
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		unique: true
	}
});

// queueItemSchema.pre('find', next => {
// 	this.populate('user');
// 	next();
// });

// queueItemSchema.virtual('userName').get(() => {
// 	return `${this.user.userName}`.trim();
// });

const QueueItem = mongoose.model('QueueItem', queueItemSchema);
const User = mongoose.model('User', userSchema);

module.exports = { QueueItem, User };