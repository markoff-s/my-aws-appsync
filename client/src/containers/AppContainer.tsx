import React, { Fragment } from 'react';

import OktaLogin from '../components/OktaLogin';
import MainContainer from './MainContainer';
import Header from '../components/Header';

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContainer: React.FC<Props> = ({ isLoggedIn, setIsLoggedIn }) => {
  return !isLoggedIn ? <OktaLogin setIsLoggedIn={setIsLoggedIn} /> : <MainContainer />;
};

export default AppContainer;
