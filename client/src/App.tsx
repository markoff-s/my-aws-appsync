import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styled-components/Theme';
import MainContainer from './components/grow-sprint-2/MainContainer';
import './scss/app.scss';

// TODO: simplify state management across app (probably Redux, for long-term scalability)

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <MainContainer />
      </div>
    </ThemeProvider>
  );
};

export default App;
