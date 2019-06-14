import React, { Component } from 'react';

class AdminChatBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }

        this.setMessage = this.setMessage.bind(this);
    }

    setMessage = e => {
        e.preventDefault();

        this.setState({
            message: e.target.value
        })
    }

    submitMessage = e => {
        e.preventDefault();

        this.props.getMessage(this.state.message)
    }



    render() {
        return (
            <form onSubmit={this.submitMessage}>
                <textarea onChange={this.setMessage} value={this.state.message} />
                <button onClick={this.submitMessage}>Submitr</button>
            </form>
        )
    }
}

export default AdminChatBox;