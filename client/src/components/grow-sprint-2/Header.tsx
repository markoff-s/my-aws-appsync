import React from 'react';
import WarnerLogo from '../../assets/warnerlogo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="left">
        <img className="warner-logo" src={WarnerLogo} alt="Warner Music Group logo" />
        Grow / Party
      </div>
      <div className="right">Zac Haluza</div>
    </div>
  );
};

export default Header;
