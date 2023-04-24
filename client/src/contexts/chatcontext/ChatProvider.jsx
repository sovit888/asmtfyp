import React, { useState, useEffect } from 'react';
//INTERNAL IMPORT
import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from '../../utils/apiFeature';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChatContext } from './index';

const ChatAppProvider = ({ children }) => {
  //USESTATE
  const [account, setAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState('');

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserAddress, setCurrentUserAddress] = useState('');

  //FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.methods
        .getUsername(connectAccount)
        .call();
      setUserName(userName);
      //GET MY FRIEND LIST
      const friendLists = await contract.methods.getMyFriendList().call();
      console.log(friendLists, 'haha');
      setFriendLists(friendLists);
      //GET ALL APP USER LIST
      const userList = await contract.methods.getAllAppUser().call();
      setUserLists(userList);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.methods.readMessage(friendAddress).call();
      setFriendMsg(read);
    } catch (error) {
      toast.error('Currently You Have no Message');
    }
  };

  //CREATE ACCOUNT
  const createAccount = async ({ name }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Name And AccountAddress, cannot be emty");
      let account = await ChechIfWalletConnected();
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.methods.createAccount(name).send({
        from: account,
      });
      setLoading(true);
      //await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      toast.error('Error while creating your account.');
    }
  };

  //ADD YOUR FRIENDS
  const addFriends = async ({ name, accountAddress }) => {
    try {
      const contract = await connectingWithContract();
      const addMyFriend = await contract.methods
        .addFriend(accountAddress, name)
        .send({
          from: account,
        });
      setLoading(true);
      console.log(addMyFriend);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('error in adding friends');
    }
  };

  //SEND MESSAGE TO YOUR FRIEND

  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("Please Type your Message");

      const contract = await connectingWithContract();
      const addMessage = await contract.methods
        .sendMessage(address, msg)
        .send({ from: account });

      setLoading(true);
      //await addMessage.wait();
      setLoading(false);
      console.log(addMessage);
      // window.location.reload();
    } catch (error) {
      toast.error('Error in sending message');
    }
  };

  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.methods.getUsername(userAddress).call();
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        ChechIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatAppProvider;
