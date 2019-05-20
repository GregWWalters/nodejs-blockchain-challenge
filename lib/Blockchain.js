const Block = require('./Block');

function Blockchain() {
  this.blocks = [new Block('Genesis Block', null, 0)];
}

// Return the latest block in the array
Blockchain.prototype.getLatestBlock = function () {
  return new Promise((resolve) => {
    resolve(this.blocks[this.blocks.length - 1]);
  });
};

// Add a new block to the blockchain
Blockchain.prototype.appendBlock = function (companyName) {
  return new Promise((resolve, reject) => {
    if (!companyName) {
      reject(new Error('No company name provided'));
    }
    const newBlock = new Block(
      companyName,
      this.getLatestBlock().hash,
    );
    this.blocks.push(newBlock);
    resolve(newBlock);
  });
};

// Find the block with the given hash
Blockchain.prototype.findBlock = function (blockHash) {
  return new Promise((reject, resolve) => {
    if (!blockHash) {
      reject(new Error('No block hash provided'));
    }
    resolve(this.blocks.find(block => block.hash === blockHash));
  });
};

module.exports = Blockchain;
