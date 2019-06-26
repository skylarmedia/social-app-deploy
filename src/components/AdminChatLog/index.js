import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { connect } from 'react-redux';

class AdminChatLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            message: {}
        }

    }

    componentWillMount() {
        console.log(this.props, 'props in mounted compoennt')
        this.props.firebase.getMessages(this.props.id, parseInt(this.props.month), parseInt(this.props.day)).then(snapshot => {
            this.setState({
                messages: snapshot.docs
            })
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.incomingMessage !== prevState.message) {

            return {
                messages: [...prevState.messages, nextProps.incomingMessage]
            }

        }
        else {
            alert('old props')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(snapshot, 'snapshot before update');
        console.log(this.state, 'state after update')

    }

    componentWillMount() {
        console.log(this.props.incomingMessage);
        console.log(this.state, 'state in will mount method ')
    }


    componentDidMount() {

    }



    componentWillUnmount() {

    }



    render() {

        console.log(this.props.id, 'props on id')
        console.log(this.state.messages, 'messages')


        console.log(this.state, 'in message render')
        const logoStyles = {
            width: 100,
            height: 100
        }

        const renderMessage = this.state.messages.map(item => {
            return (
                (
                    <li className="row">
                        <img src="https://skylarmedia.ca/wp-content/uploads/2018/12/SkylarMG_Icon_RGB-1.svg" />
                        <p>{item.message}</p>
                    </li>
                )
            )

        })
        return (
            <div>
                {renderMessage}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onSetMessages: messages =>
        dispatch({ type: 'MESSAGES_SET', messages }),
    onSetMessagesLimit: limit =>
        dispatch({ type: 'MESSAGES_LIMIT_SET', limit }),
});

export default compose(
    withFirebase,
    connect(
        null,
        mapDispatchToProps
    ),
)(AdminChatLog)