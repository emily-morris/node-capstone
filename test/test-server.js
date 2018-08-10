'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// make expect syntax available
// const expect = chai.expect;

// make should syntax available
const should = chai.should();

const {QueueItem, User} = require('../models');
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);


describe('API resource', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	describe('GET endpoint', function() {
		it('should get podcast search results', function() {
			return chai.request(app)
				.get('/podcasts')
				.then(function(res) {
					res.should.have.status(200);
				})
		});

		it('should get queue items', function() {
			return chai.request(app)
				.get('/queueItem')
				.then(function(res) {
					res.should.have.status(200);
				})
		});

		it('should get user info', function() {
			return chai.request(app)
				.get('/user')
				.then(function(res) {
					res.should.have.status(200);
				})
		});
	})

	// it('should exist', function() {
	// 	let res;
	// 	return chai.request(app)
	// 		.get('/')
	// 		.then(function(_res) {
	// 			res = _res;
	// 			expect(res).to.have.status(200);
	// 		});
	// });
});

// describe('app', function() {
// 	it('should return 200', function() {
// 		return chai
// 			.request(app)
// 			.get('/')
// 			.then(function(res) {
// 				expect(res).to.have.status(200);
// 			});
// 	});
// });