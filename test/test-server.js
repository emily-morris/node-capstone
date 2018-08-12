'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// make should syntax available
const should = chai.should();

const {QueueItem, User} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

describe('podcasts API resource', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer();
	});

	describe('GET endpoint', function() {
		it('should get list of podcasts', function() {
			let res;
			return chai.request(app)
				.get('/podcasts?q=meditation')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
				})
		});

		it('should get podcasts with the right fields', function() {
			// get podcasts and ensure they have expected keys
			return chai.request(app)
				.get('/podcasts?q=meditation')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.results.should.be.a('array');
					res.body.results.forEach(function(result) {
						result.should.be.a('object');
						result.should.include.keys('id', 'title_original', 'thumbnail', 'description_original', 'listennotes_url');
					});
				})
		});

		it('should get user queue', function() {
			return chai.request(app)
				.get('/queue')
				.then(function(res) {
					res.should.have.status(200);
				});
		});

		it('should get queue items', function() {
			return chai.request(app)
				.get('/queueItem')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.queueItem.should.be.a('array');
				});
		});

		it('should get user data', function() {
			return chai.request(app)
				.get('/user')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.forEach(function(data) {
						data.should.be.a('object');
						data.should.include.keys('id', 'userName');
					})
				});
		});
	})

	describe('POST endpoint', function() {
		it('should add a new item to queue', function() {
			
		});
	})

	describe('DELETE endpoint', function() {
		it('should delete a queue item by id', function() {
			let queueItem;

			return QueueItem
				.findOne()
				.then(_queueItem => {
					queueItem = _queueItem ;
					return chai.request(app).delete(`/queueItem/${queueItem.id}`);
				})
		});
	})
})