import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            postTitle: '',
            postCopy: '',
            postHashtags: '',
            postTime: ''
        }

        this.handlePostTitle = this.handlePostTitle.bind(this);
        this.editPostSubmit = this.editPostSubmit.bind(this);
    }


    componentWillMount() {
        this.props.firebase.editPostFirebase(this.props.location.state.clientId, this.props.location.state.postId).then(item => {
            this.setState({
                postTitle: item.data().title,
                postCopy: item.data().copy,
                postHashtags: item.data().hashtags,
                postTime: item.data().time
            })
        });
    }

    handlePostTitle = (e) => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostCopy = (e) => {
        this.setState({
            postCopy: e.target.value
        })
    }

    editPostSubmit = (event) => {
        event.preventDefault();

        this.props.firebase.editPostSubmit(
            this.props.location.state.clientId,
            this.props.location.state.postId,
            this.state.postTitle,
            this.state.postCopy,
            this.state.postHashtags,
            this.state.postTime
        )
    }

    render() {
        console.log(this.state, 'state of edit post')
        return (
            <div>Edit Posts
                {this.props.location.state.postId}
                <form onSubmit={this.editPostSubmit}>
                    Title<input name="title" value={this.state.postTitle} onChange={this.handlePostTitle} /><br />

                    Copy<textarea name="copy" onChange={this.handlePostCopy} value={this.state.postCopy} /><br />
                    Hashtags<input name="hashtags" value={this.state.postHashtags} /><br />
                    <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.postTime}
                    />
                    <input type="submit" value="Submit Edits" />
                </form>
                <button>Delete</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getPost: post => dispatch({
        type: 'GET_POST', post
    })
})

const mapStateToProps = state => (
    console.log(state, 'state in map state to props'), {
        post: state.setEditPostReducer
    })

export default compose(
    withFirebase,
    connect(
        null,
        mapDispatchToProps
    ))
    (EditPost)
