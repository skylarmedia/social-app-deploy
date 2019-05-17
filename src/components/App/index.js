import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import Navigation from '../Navigation';
import AddNew from '../AddNew';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Clients from '../Clients';
import Dates from '../Dates';
import Calendar from '../Calendar';
import CalendarSingle from '../CalendarSingle';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

// class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       authUser: null
//     }
//   }

//   componentDidMount() {
//     this.listener =  this.props.firebase.auth.onAuthStateChanged(authUser => {
//       authUser
//         ? this.setState({ authUser })
//         : this.setState({ authUser: null });
//     });
//   }

//   componentWillUnmount(){
//     this.listener();
//   }

  // render() {
  //   return (
  //     <AuthUserContext.Provider value={this.state.authUser}>

  const App = () => (
        <Router>
          <div>
            <Navigation />

            <hr />

            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.HOME} component={HomePage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADD_NEW} component={AddNew} />
            <Route path={ROUTES.CLIENTS} component={Clients} />
            <Route path={ROUTES.DATES} component={Dates} />
            <Route calenderHere={true} path={ROUTES.CALENDAR} component={Calendar} />
            <Route exact path={`/calendar-single/:day`} component={CalendarSingle} />
            
          </div>
        </Router>
  )
  //     </AuthUserContext.Provider>
  //   )
  // }


// }




export default withAuthentication(App);