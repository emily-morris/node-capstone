'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index', function() {
	it('should return 200', function() {
		return chai
			.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
			});
	});
});

describe('app', function() {
	it('should return 200', function() {
		return chai
			.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
			});
	});
});