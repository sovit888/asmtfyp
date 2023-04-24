import React, { useState, useContext } from 'react';

//INTERNAL IMPORT
import './Model.css';
import { Loader } from '../../Components/index';
import { ChatContext } from '../../contexts/chatcontext';

const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  //USESTATE
  const [name, setName] = useState('');
  const [userAddress, setUserAddress] = useState(address);

  const { loading } = useContext(ChatContext);
  return (
    <div className={'Model'}>
      <div className={'Model_box'}>
        <div className={'Model_box_left'}>
          <img src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={'Model_box_right'}>
          <h1>
            {title} <span>{head}</span>
          </h1>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={'Model_box_right_name'}>
              <div className={'Model_box_right_name_info'}>
                <img
                  src={'/assets/username.png'}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={'Model_box_right_name_info'}>
                <img
                  src={'/assets/account.png'}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder={address || 'Enter address..'}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              </div>

              <div className={'Model_box_right_name_btn'}>
                <button onClick={() => functionName({ name, userAddress })}>
                  {''}
                  <img
                    src={'/assets/send.png'}
                    alt="send"
                    width={30}
                    height={30}
                  />
                  {''}
                  Submit
                </button>

                <button onClick={() => openBox(false)}>
                  <img
                    src="/assets/close.png"
                    alt="send"
                    width={30}
                    height={30}
                  />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
