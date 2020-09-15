import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styled-components/Theme';
import PreLogin from './components/PreLogin';
import Header from './components/Header';
import AppContainer from './containers/AppContainer';
import AddContainer from './containers/AddContainer';
import './scss/app.scss';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <PreLogin />
            </Route>
            <Route path="/search">
              <AppContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/add">
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <AddContainer />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
