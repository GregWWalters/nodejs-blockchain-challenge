const ctrl = require('./ctrl');

module.exports = (app) => {

  // Find block by hash
  app.get('/blocks', ctrl.findBlockByHash);

  // Get latest block
  app.get('/blocks/latest', ctrl.getLatestBlock);

  // Append a block to the blockchain
  app.post('/blocks', ctrl.appendBlock);
};
