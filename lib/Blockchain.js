const Block = require('./Block');

function Blockchain() {
  this.blocks = [ new Block('Genesis Block', null, 0)];
}

Blockchain.prototype.getLatestBlock = function() {
  return this.blocks[this.blocks.length -1];
};

Blockchain.prototype.appendBlock = function(companyName) {
  const newBlock = new Block(
    companyName,
    this.getLatestBlock().hash,
  );
  this.blocks.push(newBlock);
  return newBlock;
};

Blockchain.prototype.findBlock = function(blockHash) {
  return this.blocks.find(block => block.hash === blockHash);
};

module.exports = Blockchain;
