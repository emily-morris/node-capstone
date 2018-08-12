const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const {User} = require('../models');

passport.use(
	new GoogleStrategy({
	// options for google strategy
	callbackURL: '/auth/google/redirect',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
		// check if user already exists in our db
		User.findOne({googleId: profile.id}).then((currentUser) => {
			if(currentUser) {
				// already have the user
				console.log('user is:', currentUser);
			} else {
				// if not, create user in our db
				new User({
					userName: profile.displayName,
					googleId: profile.id
				}).save().then((newUser) => {
					console.log('new user created:' + newUser);
				});
			}
		});
	})
)