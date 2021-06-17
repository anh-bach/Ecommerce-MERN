import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';

const App = () => (
  <Fragment>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  </Fragment>
);

export default App;
