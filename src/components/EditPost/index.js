import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';
import * as ROUTES from '../../constants/routes';

function getType(url) {
    var checkUrl = new URL(url)

    var query_string = checkUrl.search;

    var search_params = new URLSearchParams(query_string);

    var type = search_params.get('type');

    return type
}


class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            postTitle: '',
            postCopy: '',
            postHashtags: '',
            postTime: '',
            values: [],
            firestorageRef: this.props.firebase.storage,
            metaImageFiles: []
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
                postTime: item.data().time,
                values: item.data().links,
                metaImageFiles: item.data().metaImageFiles
            })
        });

        console.log(this.state, 'state after mount')
    }

    componentDidMount() {


    }


    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    createUI() {
        return this.state.values.map((el, i) =>
            <div key={i}>
                <input type="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
            </div>
        )
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
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
            this.state.postTime,
            this.state.values
        )

        this.props.history.push(`${ROUTES.CALENDAR}/?month=${this.props.location.state.month}&year=2019&clientId=${this.props.location.state.clientId}`);
    }


    deletePost = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.firebase.deletePost(this.props.location.state.clientId, this.props.location.state.postId)
            this.props.history.push(`${ROUTES.CALENDAR}/?month=${this.props.location.state.month}&year=2019&clientId=${this.props.location.state.clientId}`);
        }
        return false
    }

    render() {
        const media = this.state.metaImageFiles.map((item) => {
            if (getType(item) == 'video') {
                return (
                    <video height="200" width="200" controls>
                        <source src={item} />
                    </video>
                )
            } else {
                return (
                    <img src={item} />
                )

            }
        }


        )
        return (
            <div> Edit Posts
{this.props.location.state.postId}
                <form onSubmit={this.editPostSubmit}>
                    Title<input name="title" value={this.state.postTitle} onChange={this.handlePostTitle} /><br />

                    Copy<textarea name="copy" onChange={this.handlePostCopy} value={this.state.postCopy} /><br />
                    Hashtags<input name="hashtags" value={this.state.postHashtags} /><br />
                    <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.postTime}
                    />
                    {this.state.values && (
                        this.createUI()
                    )
                    }
                    <input type="submit" value="Submit Edits" />
                </form>
                <button onClick={this.deletePost}>Delete</button>
                {media}
            </div >
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
