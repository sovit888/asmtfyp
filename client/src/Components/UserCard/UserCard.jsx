import React, { useContext } from 'react';
import { ChatContext } from '../../contexts/chatcontext';

//INTERNAL IMPORT
import './UserCar.css';
const UserCard = ({ el, i, addFriends }) => {
  const { account } = useContext(ChatContext);

  return (
    <div className={'UserCard'}>
      <div className={'UserCard_box'}>
        <img
          className={''}
          src={`/assets/img${(i + 1) % 10}.gif`}
          alt="user"
          width={100}
          height={100}
        />

        <div className={'UserCard_box_info'}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0, 25)}..</p>
          {account.toString().toLowerCase() !=
          el[1].toString().toLowerCase() ? (
            <button
              onClick={() => addFriends({ name: el[0], accountAddress: el[1] })}
            >
              Add Friend
            </button>
          ) : (
            <button>You</button>
          )}
        </div>
      </div>

      <small className={'number'}>{i + 1}</small>
    </div>
  );
};

export default UserCard;
