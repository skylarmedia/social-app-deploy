import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import MediaWrapper from '../MediaWrapper';
import Hashtags from '../Hashtags';
import ClientChatBox from '../ClientChatBox';
import ClientChatLog from '../ClientChatLog';
import { AuthUserContext } from '../Session'

class ClientViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.userId,
            post: [],
            media: [],
            hashtags: [],
            links: [],
            approved: false,
            postId: '',
            showPopUp: false,
            authUser: null
        }

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.approveFormSubmit = this.approveFormSubmit.bind(this);
    }

    componentWillMount() {
        this.props.firebase.getSinglePost(this.state.userId, parseInt(this.props.match.params.month), parseInt(this.props.match.params.day), this.props.match.params.id).then(snapshot => {
            snapshot.docs.map(item => {
                this.setState({
                    post: item,
                    media: item.data().metaImageFiles,
                    title: item.data().title,
                    copy: item.data().copy,
                    hashtags: item.data().hashtags,
                    links: item.data().links,
                    postId: item.id,
                    approved: item.data().approved
                })
            })
        })
        console.log(this.props.authUser, 'props in ')

    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.authUser != prevState.authUser) {
    //         this.props.firebase.getMessages(this.props.authUser.displayName, parseInt(this.props.match.params.month), parseInt(this.props.match.params.day)).then(snapshot => {
    //             const emptyMessage = []
    //             snapshot.docs.map(item => {
    //                 var emptyMessageObj = {}
    //                 emptyMessageObj.day = item.data().day;
    //                 emptyMessageObj.logo = item.data().logo;
    //                 emptyMessageObj.message = item.data().message;
    //                 emptyMessageObj.month = item.data().month;
    //                 emptyMessageObj.title = item.data().title;

    //                 emptyMessage.push(emptyMessageObj);
    //                 console.log(emptyMessage, 'empty message')
    //             })
    //             // this.setState({
    //             //     messages: emptyMessage
    //             // })
    //         });

    //     } else {
    //         alert('did not received');
    //     }
    // }

    handleCheckbox = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            approved: value
        });
    }

    approveFormSubmit = e => {
        e.preventDefault();

        this.props.firebase.approvePost(this.state.userId, this.state.postId, this.state.approved)
    }

    showPopUp = e => {
        e.preventDefault();

        this.setState({
            showPopUp: !this.state.showPopUp
        })
    }


    render() {
        console.log(this.state.approved, 'approved');
        console.log(this.props, 'props in props')
        const approveStyles = {
            margin: 200,
            width: 300,
            height: 300
        }

        const popUpStyles = {
            width: 500,
            height: 500,
            background: 'red',
            position: 'fixed',
            zIndex: 1
        }

        return (
            <React.Fragment>

                {this.state.showPopUp ? <div style={popUpStyles}>
                    You have changed the approval of this post
                <button onClick={this.showPopUp}>Close</button>
                </div> :
                    ''
                }
                <p>{this.state.title}</p>
                <div className="media-text-wrapper row">
                    <div className="col-sm-6">
                        <MediaWrapper media={this.state.media} />
                    </div>
                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <p>Copy</p>
                            <p>{this.state.copy}</p>
                        </div>
                        <div className="col-sm-12">
                            {
                                this.state.hashtags.map(hash => (
                                    <div>#{hash}</div>
                                ))
                            }
                            <br />

                            {
                                this.state.links.map(link => (
                                    <div>{link}</div>
                                ))
                            }
                        </div>
                    </div><br /><br /><br />
                    <form onSubmit={this.approveFormSubmit} id="approve-form" style={approveStyles}>
                        <label>
                            {
                                this.state.approved ? <p>You have approved this post</p> : <p>You have not approved this post</p>
                            }
                            <input name="approve" type="checkbox" id="approve-checkbox" onChange={this.handleCheckbox} checked={this.state.approved} />
                        </label>
                        <button onClick={this.approveFormSubmit}>Submit</button>
                    </form>
                </div>
                {/* End of media-text-wrapper */}
                <AuthUserContext.Consumer>
                    {authUser => authUser ?
                        <div id="chat-wrapper">
                            <ClientChatBox authUser />
                            <ClientChatLog />
                        </div> :
                        ""
                    }

                </AuthUserContext.Consumer>

            </React.Fragment>
        )
    }
}

export default compose(
    withFirebase(ClientViewPost)
)