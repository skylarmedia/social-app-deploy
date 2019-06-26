import React, { Component } from 'react';
import AdminChatBox from '../AdminChatBox';
import AdminChatLog from '../AdminChatLog';
import AdminViewPostContent from '../AdminViewPostContent';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class AdminViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            copy: '',
            hashtags: '',
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
            incomingMessage: {}

        }
    }



    componentWillMount() {
        console.log(this.props.match.params.itemId, 'itemId');
        console.log(this.props.match.params.client, 'client');
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
                time: snapshot.data().time
            })
        })
    }

    getMessage = (id, month, day, title, message) => {
        const incomingMessageObj = {}
        incomingMessageObj.id = id
        incomingMessageObj.month = month
        incomingMessageObj.day = day
        incomingMessageObj.title = title
        incomingMessageObj.message = message

        this.setState({
            incomingMessage: incomingMessageObj
        });
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
        console.log(this.state.incomingMessage, 'incoming message');
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
            <div>
                <AdminViewPostContent post={this.state} />
                {media}
                <br />
                <br />
                <hr />
                <AdminChatBox getMessage={this.getMessage} month={this.props.match.params.month} day={this.props.match.params.day} title={this.props.match.params.title} id={this.props.match.params.client} />
                <AdminChatLog incomingMessage={this.state.incomingMessage} />
            </div>
        )
    }
}

export default compose(
    withFirebase(AdminViewPost)
)

