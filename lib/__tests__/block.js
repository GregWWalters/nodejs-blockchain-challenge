const Block = require('../Block');

test('Block values are properly set', () => {
  const companyName = 'Company Name',
    previousHash = 'Previous Hash';
  const testBlock = new Block(companyName, previousHash);

  expect(testBlock.companyName).toEqual(companyName);
  expect(testBlock.previousHash).toEqual(previousHash);
  expect(new Date(testBlock.timestamp)).toBeDefined();
  expect(testBlock.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
  expect(testBlock.randString.length).toBeGreaterThanOrEqual(12);
  expect(testBlock.randString.length).toBeLessThanOrEqual(16);
});

test('Block is hashed', () => {
  const companyName = 'Company Name',
    previousHash = 'Previous Hash';
  const testBlock = new Block(companyName, previousHash);

  expect(testBlock.toString()).toBeDefined();
});
