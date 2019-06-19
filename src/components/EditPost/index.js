import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';
import EditCategoryForm from '../EditCategoryForm';
import * as ROUTES from '../../constants/routes';

// function getType(url) {
//     if (url !== 'No Files') {
//         var checkUrl = new URL(url)

//         var query_string = checkUrl.search;

//         var search_params = new URLSearchParams(query_string);

//         var type = search_params.get('type');

//         return type
//     }

// }


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
            metaImageFiles: [],
            categories: [],
            selectedCategory: ''
        }

        this.handlePostTitle = this.handlePostTitle.bind(this);
        this.editPostSubmit = this.editPostSubmit.bind(this);
        this.getSelectedCategory = this.getSelectedCategory.bind(this);
    }


    componentWillMount() {
        this.props.firebase.editPostFirebase(this.props.match.params.clientId, this.props.match.params.postId).then(item => {
            this.setState({
                postTitle: item.data().title,
                postCopy: item.data().copy,
                postHashtags: item.data().hashtags,
                postTime: item.data().time,
                values: item.data().links,
                metaImageFiles: item.data().metaImageFiles,
                selectedCategory: item.data().selectedCategory
            })
        });
    }


    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
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
            this.props.match.params.clientId,
            this.props.match.params.postId,
            this.state.postTitle,
            this.state.postCopy,
            this.state.postHashtags,
            this.state.postTime,
            this.state.values,
            this.state.selectedCategory
        )

        this.props.history.push(`/calendar/2019/${this.props.match.params.month}/${this.props.match.params.clientId}`);
    }


    deletePost = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.firebase.deletePost(this.props.match.params.clientId, this.props.match.params.postId)
            this.props.history.push(`/calendar/2019/${this.props.match.params.month}/${this.props.match.params.clientId}`);
        }
        return false
    }

    getSelectedCategory = (event) => {
        this.setState({
            selectedCategory: event.target.value
        })
    }



    render() {
        console.log(this.state.selectedCategory, 'selected category');
        console.log(this.props.category, 'props category');
        const media = this.state.metaImageFiles.map((item) => {
            if (this.getType(item) == 'video') {
                return (
                    <video height="200" width="200" controls>
                        <source src={item} />
                    </video>
                )
            } else {
                return (
                    <img src={item} onError="this.style.display='none'" />
                )
            }
        }
        )
        return (
            <div> Edit Posts
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
                <EditCategoryForm clientId={this.props.match.params.clientId} getSelectedCategory={this.getSelectedCategory} category={this.state.selectedCategory} />
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
