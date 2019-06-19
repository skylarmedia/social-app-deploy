import React, { Component } from 'react';
import AdminChatBox from '../AdminChatBox';
import AdminChatLog from '../AdminChatLog';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class AdminViewPost extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props, ' props in admin view post')
        this.props.firebase.editPostFirebase(this.props.match.params.clientId, this.props.match.params.postId)
    }

    getMessage = (e) => {

    }


    render() {
        return (
            <div>
                <AdminChatBox getMessage={this.getMessage} month={this.props.match.params.month} day={this.props.match.params.day} title={this.props.match.params.title} id={this.props.match.params.client} />
                <AdminChatLog month={this.props.match.params.month} day={this.props.match.params.day} title={this.props.match.params.title} id={this.props.match.params.client} />
            </div>
        )
    }
}

export default compose(
    withFirebase(AdminViewPost)
)

