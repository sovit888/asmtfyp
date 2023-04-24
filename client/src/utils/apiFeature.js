import { ethers } from 'ethers';
import Web3 from 'web3';

import { ChatAppAddress, ChatAppABI } from '../contexts/constants';

export const ChechIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log('Install MateMask');

    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log('Install MetaMask');

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const firstAccount = accounts[0];
    console.log(accounts);
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectingWithContract = async () => {
  try {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
    let contract = new web3.eth.Contract(ChatAppABI, ChatAppAddress);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    '/' +
    newTime.getMinutes() +
    '/' +
    newTime.getSeconds() +
    '  Date:' +
    newTime.getDate() +
    '/' +
    (newTime.getMonth() + 1) +
    '/' +
    newTime.getFullYear();

  return realTime;
};
