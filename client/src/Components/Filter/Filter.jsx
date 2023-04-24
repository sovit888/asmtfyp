import React, { useState, useContext } from 'react';
import { Model } from '../index';
import ChatContext from '../../contexts/chatcontext/ChatContext';
import './Filter.css';

const Filter = () => {
  const { addFriends } = useContext(ChatContext);
  //USESTATE
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={'Filter'}>
      <div className={'Filter_box'}>
        <div className={'Filter_box_left'}>
          <div className={'Filter_box_left_search'}>
            <img src="/assets/search.png" alt="img" width={20} height={20} />
            <input type="text" placeholder="search.." />
          </div>
        </div>
        <div className={'Filter_box_right'}>
          <button>
            <img src="/assets/delete.png" alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <img src="/assets/user.png" alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* //MODEL COMPONENT */}
      {addFriend && (
        <div className={'Filter_model'}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Kindley Select Your Friend Name & Address.."
            image={'/assets/img3.gif'}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
