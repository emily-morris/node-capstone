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
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


describe('API resource', () => {
	before(() => {
		return runServer(TEST_DATABASE_URL);
	});

	after(() => {
		return closeServer();
	});

	describe('GET endpoint', () => {
		it('should list podcasts on GET', () => {
			return chai.request(app)
				.get('/podcasts')
				.then((res) => {
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