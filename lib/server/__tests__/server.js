const request = require('supertest');
const { app } = require('../server');

describe('GET /blocks', () => {
  test('Returns latest block', (done) => {
    request(app)
      .get('/blocks')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /blocks', () => {
  test('Appends a block', (done) => {
    request(app)
      .post('/blocks')
      .send({ companyName: 'Company Name' })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  test('Rejects a block without a company name', (done) => {
    request(app)
      .post('/blocks')
      .send({})
      .expect(500, done);
  });
});

describe('GET /blocks/:blockHash', () => {
  test('Finds a block', (done) => {
    request(app)
      .post('/blocks')
      .send({ companyName: 'Company Name' })
      .then((newBlock) => {
        request(app)
          .get(`/blocks/${newBlock.hash}`)
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
  });
});
