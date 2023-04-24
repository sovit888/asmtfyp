import React, { useState, useContext } from 'react';

//INTERNAL IMPORT
import './Friend.css';
import Card from './Card/Card';
import Chat from './Chat/Chat';
import { ChatContext } from '../../contexts/chatcontext';

const Friend = () => {
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    friendMsg,
    currentUserName,
    currentUserAddress,
    readUser,
  } = useContext(ChatContext);

  return (
    <div className={'Friend'}>
      <div className={'Friend_box'}>
        <div className={'Friend_box_left'}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div className={'Friend_box_right'}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
