const Blockchain = require('../Blockchain');
const blockchain = new Blockchain();

function getLatestBlock(req, res, next) {
  blockchain.getLatestBlock()
    .then(latestBlock => res.status(200).json({ body: latestBlock }))
    .catch(err => next(err));
}

function findBlockByHash(req, res, next) {
  blockchain.findBlock(req.params.blockHash)
    .then(foundBlock => res.status(200).json({ body: foundBlock }))
    .catch(err => next(err));
}

function appendBlock(req, res, next) {
  if (!req.body || !req.body.companyName) {
    return next(new Error('No company name provided'));
  }
  blockchain.appendBlock(req.body.companyName)
    .then(newBlock => res.status(200).json({ body: newBlock }))
    .catch(err => next(err));
}

module.exports = {
  getLatestBlock,
  findBlockByHash,
  appendBlock,
};
