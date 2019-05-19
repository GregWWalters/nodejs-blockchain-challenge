const Blockchain = require('../Blockchain');

test('Instantiates a new blockchain', () => {
  const blockchain = new Blockchain();

  expect(blockchain.blocks).toBeDefined();
  expect(blockchain.blocks.length).toBe(1);

  // Check values of genesis block
  expect(blockchain.blocks[0].companyName).toMatch('Genesis Block');
});

test('Get latest block in blockchain', () => {
  const blockchain = new Blockchain();
  const latestBlock = blockchain.getLatestBlock();

  expect(latestBlock).toBeDefined();
  expect(latestBlock.companyName).toMatch('Genesis Block');
});

test('Append a block to blockchain', () => {
  const blockchain = new Blockchain();
  const previousHash = blockchain.getLatestBlock().hash;
  const newBlock = blockchain.appendBlock('Company Name');

  expect(newBlock).toBeDefined();
  expect(newBlock.previousHash).toMatch(previousHash);
  expect(blockchain.getLatestBlock()).toEqual(newBlock);
});

test('Find a block by hash', () => {
  const blockchain = new Blockchain();
  const hashes = [blockchain.getLatestBlock().hash];
  for (let i = 0; i < 5; ++i) {
    const newBlock = blockchain.appendBlock(`Test Block ${i+1}`, hashes[i]);
    hashes.push(newBlock.hash);
  }

  // search for the block with the 4th hash after the genesis block
  const foundBlock = blockchain.findBlock(hashes[4]);
  expect(foundBlock).toBeDefined();
  expect(foundBlock.hash).toMatch(hashes[4]);
});
