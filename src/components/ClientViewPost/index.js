import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import MediaWrapper from '../MediaWrapper';
import Hashtags from '../Hashtags';

class ClientViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.userId,
            post: [],
            media: []
        }
        this.renderHashtags = this.renderHashtags.bind(this)
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


    render() {

        const renderHashtags = ({ hashtags }) => {
            const hashes = hashtags.split(' ')
            hashes.map(hash => (
                <div>TEST</div>
            ))
        }

        return (
            <div>
                <p>{this.state.title}</p>
                <div class="media-text-wrapper" className="row">
                    <div className="col-sm-6">
                        <MediaWrapper media={this.state.media} />
                    </div>
                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <p>Copy</p>
                            <p>{this.state.copy}</p>
                        </div>
                        <div className="col-sm-12">
                            {renderHashTags(this.state.hashtags)}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default compose(
    withFirebase(ClientViewPost)
)