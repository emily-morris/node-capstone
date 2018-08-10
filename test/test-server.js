'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// make expect syntax available
const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

describe('index page', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer();
	});

	it('should exist', function() {
		let res;
		return chai.request(app)
			.get('/')
			.then(function(_res) {
				res = _res;
				expect(res).to.have.status(200);
			});
	});
});