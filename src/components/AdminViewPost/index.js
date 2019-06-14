import React, { Component } from 'react';
import AdminChatBox from '../AdminChatBox';

class AdminViewPost extends Component {
    constructor(props) {
        super(props);
    }

    getMessage = (e) => {
        alert(e)
    }


    render() {
        return (
            <div>

                <AdminChatBox getMessage={this.getMessage} />
            </div>
        )
    }
}

export default AdminViewPost

