import React from 'react';
import WarnerLogo from '../../assets/warnerlogo.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => {
  return (
    <div className="header">
      <div className="left">
        <img className="warner-logo" src={WarnerLogo} alt="Warner Music Group logo" />
        Grow / Party
      </div>
      <div className="right">
        <p>Zac Haluza</p>
        <AmplifySignOut />
      </div>
    </div>
  );
};

export default Header;
