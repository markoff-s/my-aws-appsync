import React, { useState, Fragment } from 'react';
import Button from '../../styled-components/Button';

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <div className="header">
      <div className="header__left">
        <p>Artist / Group Search</p>
      </div>
      <div className="header__right">
        {isLoggedIn && (
          <Fragment>
            <div
              className="header__right-top"
              onClick={() => setToggleDropDown((prevState) => !prevState)}
            >
              <p>Zac Haluza</p>
              <i className="fas fa-chevron-down"></i>
            </div>
            {toggleDropDown && (
              <div className="header__right-bottom">
                <Button onClick={() => setIsLoggedIn(false)}>SIGN OUT</Button>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
