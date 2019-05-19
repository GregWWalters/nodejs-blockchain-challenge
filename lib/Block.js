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
  this.hash = this.toHash();
}

// Return the hashed block
Block.prototype.toHash = function() {
  // Hash to string and return
  return md5(
    this.randString
    + this.timestamp
    + this.companyName
    + this.previousHash
  ).toString(CryptoJs.enc.Base64);
};

module.exports = Block;
