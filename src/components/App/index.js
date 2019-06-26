import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';


import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AdminPage from '../Admin';
import Clients from '../Clients';
import Dates from '../Dates';
import Calendar from '../Calendar';
import CalendarSingle from '../CalendarSingle';
import AddPost from '../AddPost';
import EditPost from '../EditPost';
import Server from '../ServerFile';
import ClientCalendar from '../ClientCalendar';
import ClientViewPost from '../ClientViewPost';
import HiddenCalendarSingle from '../HiddenCalendarSingle'
import AdminViewPost from '../AdminViewPost';
import * as ROUTES from '../../constants/routes';
import MenuButton from '../MenuButton';
import { withAuthentication } from '../Session';
import CalendarCategoryContainer from '../CalendarCategoryContainer'
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from '../Session';
import './index.css';

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
      <div className="menu-wrapper">
        <MenuButton />
        <Navigation />
        <hr />
      </div>
      <Route exact path="/" component={SignInPage} />
      <Route path={`/add-post/:year/:month/:day/:clientId`} component={AddPost} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path="/social-app-deploy/" component={SignInPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.CLIENTS} component={Clients} />
      <Route path={ROUTES.DATES} component={Dates} />
      <Route path="/edit-post/:month/:day/:postId/:clientId" component={EditPost} />
      <Route exact path={`/calendar-single/:year/:month:day`} component={CalendarSingle} />
      <Route exact path="/server" component={Server} />
      <Route path="/client-calendar/:year/:month" component={ClientCalendar} />
      <Route path="/view-post/:month/:day/:id" component={ClientViewPost} />
      <Route path="/admin-view-post/:month/:day/:title/:client/:itemId" component={AdminViewPost} />
      <Route path="/calendar/:year/:month/:clientId" component={Calendar} />
    </div>
  </Router>
)
//     </AuthUserContext.Provider>
//   )
// }


// }




export default withAuthentication(App);