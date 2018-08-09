'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index', () => {
	it('should return 200', () => {
		return chai
			.request('http://localhost:8080')
			.get('/')
			.then((res) => {
				expect(res).to.have.status(200);
			});
	});
});

describe('app', () => {
	it('should return 200', () => {
		return chai
			.request('http://localhost:8080')
			.get('/')
			.then((res) => {
				expect(res).to.have.status(200);
			});
	});
});