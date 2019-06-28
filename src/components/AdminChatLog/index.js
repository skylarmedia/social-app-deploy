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

    componentDidMount() {
        console.log(this.props.id, 'props in mounted compoennt')

    }



    render() {
        console.log(this.props.id, 'props on id')
        console.log(this.state.messages, 'messages')


        // console.log(this.state.messages.length, 'in message render')
        const logoStyles = {
            width: 100,
            height: 100
        }

        // const renderMessage = 
        return (
            <div>
                {
                    this.props.messages && (
                        this.props.messages.map(item => {
                            // console.log(this.state.messages, 'message length')
                            return (
                                (
                                    <li className="row">
                                        <img src="https://skylarmedia.ca/wp-content/uploads/2018/12/SkylarMG_Icon_RGB-1.svg" />
                                        <p>{item.message}</p>
                                    </li>
                                )
                            )

                        })
                    )
                }

            </div >
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