import React from 'react';
//INTERNAL IMPORT
import Style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <img src={''} alt="loader" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loader;
