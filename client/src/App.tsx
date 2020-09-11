import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styled-components/Theme';
import PreLogin from './components/PreLogin';
import MainContainer from './containers/MainContainer';
import Header from './components/Header';

import './scss/app.scss';

// TODO: simplify state management across app (probably Redux, for long-term scalability)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn ? <MainContainer /> : <PreLogin setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
