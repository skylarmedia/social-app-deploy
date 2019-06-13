import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";

class ClientViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {
        return (
            <div>
                Client View Post
                {this.props.match.params.id}
            </div>
        )
    }
}

export default compose(
    withFirebase(ClientViewPost)
)