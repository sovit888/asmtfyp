const express = require('express');
const app = express();
const cors = require('cors');
const crypto = require('crypto');
const middleware = require('./middleware');

const { encryptMessageCheck, decryptMessageCheck } = require('./validation');
const BcryptService = require('./utils');
const initVector = Buffer.from('asmtfinalyearproject')
  .toString('hex')
  .slice(0, 16);

app.use(express.json());
app.use(cors());

app.post('/encrypt', encryptMessageCheck, middleware, (req, res) => {
  const { message, key } = req.body;
  let bcryptService = new BcryptService(key);
  let encrypted = bcryptService.encryptMessage(message, key, initVector);

  return res.json({ encrypted });
});

app.post('/decrypt', decryptMessageCheck, middleware, (req, res) => {
  const { cipher, key } = req.body;
  let bcryptService = new BcryptService();
  let message = bcryptService.decryptMessage(cipher, key, initVector);
  return res.json({ message });
});

app.listen(3400, () => {
  console.log('running 3400');
});
