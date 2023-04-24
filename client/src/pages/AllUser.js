import React, { useContext } from 'react';
import { UserCard } from '../Components';
import { ChatContext } from '../contexts/chatcontext';
import './alluser.css';

const AllUser = () => {
  const { userLists, addFriends, account } = useContext(ChatContext);
  return (
    <>
      <div>
        <div className={'alluser_info'}>
          <h1>Find Your Friends </h1>
        </div>
        <div className={'alluser'}>
          {userLists.map((el, i) => (
            <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUser;
