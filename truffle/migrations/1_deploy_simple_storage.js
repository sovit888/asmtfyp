const Chat = artifacts.require('ChatApp');

module.exports = function (deployer) {
  deployer.deploy(Chat);
};
