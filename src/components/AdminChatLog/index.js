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
        console.log(this.props, 'props in mounted compoennt')
        this.props.firebase.getMessages(this.props.id, parseInt(this.props.month), parseInt(this.props.day)).then(snapshot => {
            snapshot.docs.map(item => {
                console.log(item.data())
            })
            this.setState({
                messages: snapshot.docs
            })
        })
    }

    componentDidMount() {
        console.log(typeof (this.props.day), 'day');
        console.log(this.props.month, 'month')
        this.props.firebase.listenChatChanges(this.props.id).collection('messages').where('month', '==', parseInt(this.props.month)).where('day', '==', parseInt(this.props.day)).onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    console.log(change.doc, 'doc');
                    this.setState({
                        messages: [...this.state.messages, change.doc]
                    })
                }
            })
        })
    }

    componentWillUnmount() {
        this.setState({
            messsage: []
        })
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