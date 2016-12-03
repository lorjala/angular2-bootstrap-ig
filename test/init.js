'use strict';

var request = require('supertest');

describe('init server', function () {
  var server;
  before(function () {
    server = require('./../server');
  });
  after(function (done) {
    server.close(done);
  });
  it('OK to home route', function (done) {
    request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 to other', function (done) {
    request(server)
    .get('/foo/bar')
    .expect(404, done);
  });
});
