import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class AdminChatLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }

    }

    componentWillMount() {
        console.log(typeof (this.props.month))
        this.props.firebase.getMessages(this.props.id, parseInt(this.props.month), parseInt(this.props.day)).then(snapshot => {
            this.setState({
                messages: snapshot.docs
            })

            console.log(this.state.messages)
            this.props.firebase.listenChatChanges(this.props.id).collection('messages').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        this.setState({
                            messages: [...this.state.messages, change.doc]
                        })
                        console.log(this.state.messages, 'messages')
                    }
                })
            })
        })
    }

    componentDidMount() {

    }


    render() {

        const logoStyles = {
            width: 100,
            height: 100
        }

        const renderMessage = this.state.messages.map(item => (
            <li className="row">
                <div>
                    <img src={item.data().logo} style={logoStyles} />
                    <p>{item.data().user}</p>
                </div>
                <p>{item.data().message}</p>
            </li>
        ))
        return (
            <div>
                {renderMessage}
            </div>
        )
    }
}

export default compose(
    withFirebase(AdminChatLog)
)