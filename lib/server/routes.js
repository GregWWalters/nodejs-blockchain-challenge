const ctrl = require('./ctrl');

module.exports = (app) => {
  // Get latest block
  app.get('/blocks', ctrl.getLatestBlock);

  // Find block by hash
  app.get('/blocks/:blockHash', ctrl.findBlockByHash);

  // Append a block to the blockchain
  app.post('/blocks', ctrl.appendBlock);
};
