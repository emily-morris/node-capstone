'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
	reference: { type: String, required: true },
	rating: Boolean
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };