import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styled-components/Theme';
import PreLogin from './components/grow-sprint-2/PreLogin';
import MainContainer from './components/grow-sprint-2/MainContainer';
import Header from './components/grow-sprint-2/Header';

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
