const CryptoJs = require('crypto-js');
const md5 = require('crypto-js/md5');

// Return a 12-16 length string of random characters
function randString() {
  // Pick a random string length between 12 and 16
  const stringLength = 12 + Math.round(Math.random()*4);

  const characterArray = [];
  for (let i = 0; i < stringLength; ++i) {
    // Add a character to the random string
    // Printable characters ASCII 32-126
    const charCode = Math.random() * 96 + 36;
    characterArray.push(String.fromCharCode(charCode));
  }
  return characterArray.join('');
}


// Block constructor
function Block(companyName, previousHash) {
  this.companyName = companyName;
  this.previousHash = previousHash;
  this.timestamp = (new Date()).toISOString();
  this.randString = randString();
}

// Return the hashed block
Block.prototype.toString = function() {
  const jsonString = JSON.stringify({
    randString: this.randString,
    timestamp: this.timestamp,
    companyName: this.companyName,
    previousHash: this.previousHash,
  });

  // Hash to string and return
  return md5(jsonString).toString(CryptoJs.enc.Base64);
};

module.exports = Block;
