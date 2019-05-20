const { Blockchain } = require('../../../blockchain-challenge');

test('Instantiates a new blockchain', () => {
  const blockchain = new Blockchain();

  expect(blockchain.blocks).toBeDefined();
  expect(blockchain.blocks.length).toBe(1);

  // Check values of genesis block
  expect(blockchain.blocks[0].companyName).toMatch('Genesis Block');
});

test('Get latest block in blockchain', () => {
  const blockchain = new Blockchain();
  blockchain.getLatestBlock()
    .then((latestBlock) => {
      expect(latestBlock).toBeDefined();
      expect(latestBlock.companyName).toMatch('Genesis Block');
    });
});

test('Append a block to blockchain', () => {
  const blockchain = new Blockchain();
  blockchain.getLatestBlock()
    .then(latestBlock => latestBlock.hash)
    .then(hash => blockchain.appendBlock('Company Name'))
    .then((newBlock) => {
      expect(newBlock).toBeDefined();
      expect(newBlock.previousHash).toMatch(previousHash);
      expect(blockchain.getLatestBlock()).toEqual(newBlock);
    });
});

test('Reject new block without company name', () => {
  const blockchain = new Blockchain();
  const appendPromise = blockchain.getLatestBlock()
    .then(latestBlock => latestBlock.hash)
    .then(hash => blockchain.appendBlock(null));
  expect(appendPromise).rejects.toMatch('No company name provided');
});

test('Find a block by hash', async () => {
  const blockchain = new Blockchain();
  const hashes = [blockchain.getLatestBlock().hash];
  // Add 5 new blocks
  for (let i = 0; i < 5; ++i) {
    // Await the new block to make sure these go in 1 by 1
    const newBlock = await blockchain.appendBlock(
      `Test Block ${i + 1}`,
      hashes[i],
    );
    hashes.push(newBlock.hash);
  }

  // search for the block with the 4th hash after the genesis block
  blockchain.findBlock(hashes[4])
    .then((foundBlock) => {
      expect(foundBlock).toBeDefined();
      expect(foundBlock.hash).toMatch(hashes[4]);
    });
});

test('Reject block search without hash', async () => {
  const blockchain = new Blockchain();
  const hashes = [blockchain.getLatestBlock().hash];
  // Add 5 new blocks
  for (let i = 0; i < 5; ++i) {
    // Await the new block to make sure these go in 1 by 1
    const newBlock = await blockchain.appendBlock(
      `Test Block ${i + 1}`,
      hashes[i],
    );
    hashes.push(newBlock.hash);
  }

  // search for the block with the 4th hash after the genesis block
  expect(blockchain.findBlock(null))
    .rejects.toMatch('No block hash provided');
});
