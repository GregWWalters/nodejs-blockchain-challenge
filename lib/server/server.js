const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const PORT = process.env.port || 3030;
const HOST = '0.0.0.0';
// Start the server
const app = require('./app');
const server = app.listen(PORT, HOST);

// Store open connections to be closed when shutting down
const openConnections = [];
server.on('connection', (connection) => {
  openConnections.push(connection);
  connection.on('close', () => {
    const index = openConnections.findIndex(element => element === connection);
    openConnections.splice(index, 1);
  });
});

// Handle graceful shutdown on kill signal
function shutDown() {
  console.log('Received kill signal; closing remaining connections'
  + ' and shutting down server...');

  // If all connections successfully close, exit successfully
  server.close(() => {
    console.log('Remaining connections closed');
    process.exit(0);
  });

  // After 10 seconds, shut down despite open connections
  setTimeout(() => {
    console.error('Could not close remaining connections.'
    + ' Forcefully shutting down');
    process.exit(1);
  }, 10000);

  // Loop through open connections and request disconnect
  // If no disconnect after 5 seconds, force disconnect
  openConnections.forEach(connection => connection.end());
  setTimeout(() => openConnections.forEach(connection => connection.destroy()),
    5000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
