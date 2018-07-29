'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
	userId: { type: String, required: true },
	podcasts: {
		id: String,
		website: String,
		title: String,
		publisher: String,
		description: String
	}
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };