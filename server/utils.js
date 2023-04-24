const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

class BcryptService {
  constructor(key) {}
  formatKey(key) {
    let temp = crypto
      .createHmac('sha256', 'sovitthapamagar')
      .update(key)
      .digest('hex');

    return Buffer.from(temp.slice(0, 32));
  }

  encryptMessage(message, key, initVector) {
    this.cipher = crypto.createCipheriv(
      algorithm,
      this.formatKey(key),
      initVector
    );
    let encryptedData = this.cipher.update(message, 'utf-8', 'hex');

    encryptedData += this.cipher.final('hex');
    return encryptedData;
  }

  decryptMessage(cipher, key, initVector) {
    this.decipher = crypto.createDecipheriv(
      algorithm,
      this.formatKey(key),
      initVector
    );
    let decryptedData = this.decipher.update(cipher, 'hex', 'utf-8');
    decryptedData += this.decipher.final('utf8');
    return decryptedData;
  }
}

module.exports = BcryptService;
