import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styled-components/Theme';
import PreLogin from './components/PreLogin';
import Header from './components/Header';
import AppContainer from './containers/AppContainer';
import AddContainer from './containers/AddContainer';
import PersonPage from './components/PersonPage';
import GroupPage from './components/GroupPage';
import './scss/app.scss';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Router>
          <Switch>
            <Route exact path="/">
              <PreLogin />
            </Route>
            <Route path="/search">
              <AppContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/add">
              <AddContainer />
            </Route>
            <Route path="/artist/:id" render={(props) => <PersonPage id={props.match.params} />} />
            <Route path="/group/:id" render={(props) => <GroupPage id={props.match.params} />} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
