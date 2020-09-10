import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => {
  return (
    <div className="header">
      <div className="left">Artist / Group Search</div>
      <div className="right">
        <p>Zac Haluza</p>
        <AmplifySignOut />
      </div>
    </div>
  );
};

export default Header;
