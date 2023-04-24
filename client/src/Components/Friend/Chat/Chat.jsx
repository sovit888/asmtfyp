import React, { useEffect, useState } from 'react';

import { converTime } from '../../../utils/apiFeature';
import { Loader } from '../../index';
import './Chat.css';

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  //USTE STATE
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({
    name: '',
    address: '',
  });

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   setChatData(router.query);
  // }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, []);

  // console.log(chatData.address, chatData.name);
  return (
    <div className={'Chat'}>
      {currentUserName && currentUserAddress ? (
        <div className={'Chat_user_info'}>
          <img
            src={'/assets/acountName.png'}
            alt="img"
            width={70}
            height={70}
          />
          <div className={'Chat_user_info_box'}>
            <h4>{currentUserName}</h4>
            <p className={'show'}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className={'Chat_box_box'}>
        <div className={'Chat_box'}>
          <div className={'Chat_box_left'}>
            {friendMsg.map((el, i) => (
              <div>
                {el.sender == chatData.address ? (
                  <div className={'Chat_box_left_title'}>
                    <img
                      src={'/assets/file.png'}
                      alt="img"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} {''}
                      <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={'Chat_box_left_title'}>
                    <img
                      src={'/assets/smile.png'}
                      alt="img"
                      width={50}
                      height={50}
                    />
                    <span>
                      {userName} {''}
                      <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msg}
                  {''}
                  {''}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div className={'Chat_box_send'}>
            <div className={'Chat_box_send_img'}>
              <img
                src={'/assets/smile.png'}
                alt="smile"
                width={50}
                height={50}
              />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <img src={''} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <img
                  src={'/assets/file.png'}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={() =>
                    functionName({ msg: message, address: chatData.address })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Chat;
