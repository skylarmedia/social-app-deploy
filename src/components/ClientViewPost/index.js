import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import MediaWrapper from '../MediaWrapper';

class ClientViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.userId,
            post: [],
            media: []
        }
    }

    componentWillMount() {
        this.props.firebase.getSinglePost(this.state.userId, parseInt(this.props.match.params.month), parseInt(this.props.match.params.day), this.props.match.params.id).then(snapshot => {
            snapshot.docs.map(item => {
                this.setState({
                    post: item,
                    media: item.data().metaImageFiles,
                    title: item.data().title,
                    copy: item.data().copy,
                    hashtags: item.data().hashtags
                })
            })
        })
    }

    componentDidMount() {

    }


    // checkType = (url) => {
    //     if (url !== 'No Files') {
    //         var checkUrl = new URL(url)

    //         var query_string = checkUrl.search;

    //         var search_params = new URLSearchParams(query_string);

    //         var type = search_params.get('type');

    //         return type
    //     }
    // }

    // renderMedia = (items) => {
    //     items.map(item => {
    //         if (this.checkType(item) == 'video') {
    //             return (
    //                 <p>This is a video</p>
    //             )
    //         }
    //     })
    // }

    render() {
        console.log(this.state.media)
        // console.log(this.state.post, 'post state ');

        // const singlePost = this.state.post.map(item =>
        //     <div className="post-wrapper">
        //         {item.data().title}
        //         <div className="post-media-text-wrapper">
        //             <div className="media-wrapper">
        //                 {this.renderMedia(item.data().metaImageFiles)}
        //             </div>
        //             <div className="text-wrapper">
        //                 Copy:{item.data().copy}<br /><br />
        //                 Hashtags:{hashtagSplit(item.data().hashtags)}
        //             </div>
        //         </div>
        //     </div>
        // )

        // const hashtagSplit = (hashtags) => {
        //     const hashArr = hashtags.split(' ');

        //     hashArr.map(hashtag =>
        //         <p>
        //             {hashtag}
        //         </p>
        //     )
        // }


        // console.log(this.state.post, 'post after render');
        return (
            <div>
                <MediaWrapper media={this.state.media} />
            </div>
        )
    }
}

export default compose(
    withFirebase(ClientViewPost)
)