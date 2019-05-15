import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import AddNew from '../AddNew';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Clients from '../Clients';
import Dates from '../Dates';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.HOME} component={HomePage} props="prop1"/>
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADD_NEW} component={AddNew} />
      <Route path={ROUTES.CLIENTS} component={Clients} />
      <Route path={ROUTES.DATES} component={Dates} />
    </div>
  </Router>
  
);


export default App;