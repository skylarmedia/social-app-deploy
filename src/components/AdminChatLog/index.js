import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { connect } from 'react-redux';

class AdminChatLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
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


    componentDidMount() {
    }

    componentWillUnmount() {
        this.setState({
            messages: []
        })
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        console.log(this.props, ' props in admin view post')

        var unsubscribe = this.props.firebase.listenChatChanges(this.props.id)
            .onSnapshot(function () {
                // Respond to data
                // ...
            });

        unsubscribe();
    }



    render() {

        console.log(this.props.id, 'props on id')
        console.log(this.state.messages, 'messages')
        const logoStyles = {
            width: 100,
            height: 100
        }

        const renderMessage = this.state.messages.map(item => {
            return (
                (
                    <li className="row">
                        <div>
                            <img src={item.data().logo} style={logoStyles} />
                            <p>{item.data().user}</p>
                        </div>
                        <p>{item.data().message}</p>
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