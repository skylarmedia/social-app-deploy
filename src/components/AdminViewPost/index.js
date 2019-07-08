import React, { Component } from 'react';
import ChatBox from '../ChatBox';
import ChatLog from '../ChatLog';
import AdminViewPostContent from '../AdminViewPostContent';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';


class AdminViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            copy: '',
            hashtags: [],
            time: '',
            month: '',
            day: '',
            links: [],
            values: [],
            firestorageRef: this.props.firebase.storage,
            metaImageFiles: [],
            categories: [],
            approved: false,
            selectedCategory: '',
            incomingMessage: {},
            clientRead: null

        }
    }



    componentWillMount() {
        this.props.firebase.getAdminPost(this.props.match.params.client, this.props.match.params.itemId).then(snapshot => {

            this.setState({
                title: snapshot.data().title,
                copy: snapshot.data().copy,
                hashtags: snapshot.data().hashtags,
                links: snapshot.data().links,
                metaImageFiles: snapshot.data().metaImageFiles,
                month: snapshot.data().month,
                day: snapshot.data().day,
                selectedCategory: snapshot.data().selectedCategory,
                time: snapshot.data().time,
                messages: [],
                adminRead: snapshot.data().adminRead,
                postId: snapshot.id
            }, () => {
                if (this.state.adminRead == false) {
                    this.props.firebase.editReadAdmin(this.props.match.params.client, this.state.postId, true);
                }
            })
        })


        this.props.firebase.getMessages(this.props.match.params.client, parseInt(this.props.match.params.month), parseInt(this.props.match.params.day)).then(snapshot => {

            const emptyMessage = []
            snapshot.docs.map(item => {
                var emptyMessageObj = {}
                emptyMessageObj.day = item.data().day;
                emptyMessageObj.logo = item.data().logo;
                emptyMessageObj.message = item.data().message;
                emptyMessageObj.month = item.data().month;
                emptyMessageObj.title = item.data().title;
                emptyMessageObj.time = item.data().time;

                emptyMessage.push(emptyMessageObj);
            })

            emptyMessage.sort((a, b) => (a.time < b.time) ? 1 : -1)

            console.log(emptyMessage, 'sorterd');


            this.setState({
                messages: emptyMessage
            })
        });
    }

    getMessage = (id, month, day, title, message, logo) => {
        const incomingMessageObj = {}
        incomingMessageObj.id = id
        incomingMessageObj.logo = logo
        incomingMessageObj.month = month
        incomingMessageObj.day = day
        incomingMessageObj.title = title
        incomingMessageObj.message = message

        this.setState({
            messages: [...this.state.messages, incomingMessageObj],
            clientRead: false
        });

        this.props.firebase.adminSendMessage(id, month, day, title, message, 'https://skylarmedia.ca/wp-content/uploads/2018/12/SkylarMG_Icon_RGB-1.svg');
    }

    componentWillUnmount() {
        this.props.firebase.editReadClient(this.props.match.params.client, this.state.postId, this.state.clientRead)
    }

    getType = (url) => {
        if (url !== 'No Files') {
            var checkUrl = new URL(url)

            var query_string = checkUrl.search;

            var search_params = new URLSearchParams(query_string);

            var type = search_params.get('type');

            return type
        }
    }


    render() {
        console.log(this.state.messages, 'incoming message view post');
        const media = this.state.metaImageFiles.map((item) => {
            if (this.getType(item) == 'video') {
                return (
                    <video height="200" width="200" controls>
                        <source src={item} />
                    </video>
                )
            } else if (this.getType(item) == 'image') {
                return (
                    <img src={item} onError="this.style.display='none'" />
                )
            } else {
                return (
                    <div>There is no media</div>
                )
            }
        }
        )
        return (

            <AuthUserContext.Consumer>
                {authUser => (
                    <div className="container">
                        <AdminViewPostContent post={this.state} hashtags={this.state.hashtags} />
                        {media}
                        <br />
                        <br />
                        <hr />
                        <ChatBox getMessage={this.getMessage} month={this.props.match.params.month} day={this.props.match.params.day} title={this.props.match.params.title} id={this.props.match.params.client} authUser={authUser} />
                        <ChatLog incomingMessage={this.state.incomingMessage} id={this.props.match.params.client} month={this.props.match.params.month} day={this.props.match.params.day} messages={this.state.messages} />
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

export default compose(
    withFirebase(AdminViewPost)
)

