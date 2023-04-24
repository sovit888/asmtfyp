const { check } = require('express-validator');
exports.encryptMessageCheck = [
  check('message').notEmpty().withMessage('Message is required'),
  check('key').notEmpty().withMessage('Key is required'),
];

exports.decryptMessageCheck = [
  check('cipher').notEmpty().withMessage('Cipher is required'),
  check('key').notEmpty().withMessage('Key is required'),
];
