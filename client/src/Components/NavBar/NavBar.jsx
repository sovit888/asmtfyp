import React, { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import ChatContext from '../../contexts/chatcontext/ChatContext';
import './NavBar.css';
import CreateModel from '../Model/CreateModel';

const NavBar = () => {
  const menuItems = [
    {
      menu: 'Contact',
      link: '/',
    },
    {
      menu: 'Setting',
      link: '/',
    },
  ];

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } =
    useContext(ChatContext);
  return (
    <div className={'NavBar'}>
      <div className={'NavBar_box'}>
        <div className={'NavBar_box_left'}></div>
        <div className={'NavBar_box_right'}>
          {/* //DESKTOP */}
          <div className={'NavBar_box_right_menu'}>
            <div>
              <Link className={'NavBar_box_right_menu_items_link'} to="/">
                Home
              </Link>
            </div>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${'NavBar_box_right_menu_items'} ${
                  active === i + 1 ? 'active_btn' : ''
                }`}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={'NavBar_box_right_menu_items_link'}
                  href={el.link}
                >
                  {el.menu}
                </a>
              </div>
            ))}
            <div>
              <Link
                className={'NavBar_box_right_menu_items_link'}
                to="/allusers"
              >
                All Users
              </Link>
            </div>
          </div>

          {/* //MOBILE */}
          {open && (
            <div className={'mobile_menu'}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${'mobile_menu_items'} ${
                    active == i + 1 ? 'active_btn' : ''
                  }`}
                >
                  <Link className={'mobile_menu_items_link'} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}

              <p className={'mobile_menu_btn'}>
                <img
                  src={'/assets/close.png'}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* CONNECT WALLET */}
          <div className={'NavBar_box_right_connect'}>
            {account == '' ? (
              <button onClick={() => connectWallet()}>
                <span>Connect Wallet</span>
              </button>
            ) : userName ? (
              <button>
                <img
                  src={'/assets/account.png'}
                  alt="Account img"
                  width={20}
                  height={20}
                />

                <small>{userName}</small>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                <img
                  src={'/assets/create2.png'}
                  alt="Account img"
                  width={20}
                  height={20}
                />

                <small>{'Create Account'}</small>
              </button>
            )}
          </div>

          <div
            className={'NavBar_box_right_open'}
            onClick={() => setOpen(true)}
          >
            <img src={''} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={'modelBox'}>
          <CreateModel
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate maxime assumenda exercitationem voluptatibus, vero aliquid in tempore aut, impedit dolores voluptate recusandae nulla fuga? Praesentium iusto mollitia sint fugit! Placeat?"
            smallInfo="Kindley seclet your name..."
            img={''}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
