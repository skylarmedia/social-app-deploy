import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class ChatBox extends Component {
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

        let id = this.props.id
        let month = parseInt(this.props.month)
        let day = parseInt(this.props.day)
        let title = this.props.title
        let message = this.state.message

        let date = new Date;
        var messageMonth = date.getMonth();

        this.props.getMessage(id, month, day, title, message)

        this.setState({
            message: ''
        })
    }




    render() {
        return (
            <form onSubmit={this.submitMessage}>
                <textarea onChange={this.setMessage} value={this.state.message} />
                <button onClick={this.submitMessage}>Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onSetMessage: message => dispatch({ type: 'MESSAGE_SENT', message }),
});


export default compose(
    withFirebase,
    connect(
        null,
        mapDispatchToProps
    )
)(ChatBox)