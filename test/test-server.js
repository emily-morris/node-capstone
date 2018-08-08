'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index', () => {
	it('should return 200', () => {
		return chai
			.request(app)
			.get('/')
			.then((res) => {
				expect(res).to.have.status(200);
			});
	});
});

describe('app', () => {
	it('should return 200', () => {
		return chai
			.request(app)
			.get('/')
			.then((res) => {
				expect(res).to.have.status(200);
			});
	});
});