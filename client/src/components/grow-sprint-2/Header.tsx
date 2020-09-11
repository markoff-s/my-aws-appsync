import React, { useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <div className="header">
      <div className="header__left">Artist / Group Search</div>
      <div className="header__right">
        <div
          className="header__right-top"
          onClick={() => setToggleDropDown((prevState) => !prevState)}
        >
          <p>Zac Haluza</p>
          <i className="fas fa-chevron-down"></i>
        </div>
        {toggleDropDown && (
          <div className="header__right-bottom">
            <AmplifySignOut />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
