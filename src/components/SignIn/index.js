import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false
};

const currentClientMonth = new Date().getMonth()
const currentClientYear = new Date().getFullYear();

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      month: currentClientMonth,
      year: currentClientYear
    };
  }


  onSubmit = event => {
    this.setState({
      loading: !this.state.loading
    })
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password).then(value => {
        if (value.data().admin == 1) {
          alert('admin');
          this.props.history.push({
            pathname: `/home`,
            state: {
              userId: value.data().userId
            }
          })
        } else {
          localStorage.setItem('userId', value.data().userId)
          this.props.onSetUserId(value.data().userId)
          this.props.history.push({
            pathname: `/client-calendar/${this.state.year}/${this.state.month}`,
            state: {
              userId: value.data().userId
            }
          })

        }
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {

    console.log(this.props, 'props for settings user')
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>
        {
          this.state.loading && (
            <h1>Loading</h1>
          )
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSetUserId: authUser =>
    dispatch({ type: 'SET_USER_ID', authUser }),
});

const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(
    null,
    mapDispatchToProps
  ),
)(SignInFormBase);

export default SignInPage;

export { SignInForm };