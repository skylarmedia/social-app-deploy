
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorizationAdmin = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            authUser => {
                authUser.email == 'sky5@hotmail.com'
                    ? alert('ADMIN')
                    : alert('NOT ADMIN')
            },
                console.log(this.props, 'props in auth')
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorizationAdmin);
};

export default withAuthorizationAdmin;
