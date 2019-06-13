import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';


// Make this a dumb component 

class ClientCalendarSingle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            currentPosts: []
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.posts !== prevState.posts) {
    //         return {
    //             selected: nextProps.posts
    //         }
    //     } else {
    //         console.log('did not receive posts')
    //     }
    // }


    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.posts !== prevState.posts) {
    //         this.setState({
    //             posts: this.props.posts
    //         })
    //     }
    // }



    render() {
        // const filtered = this.state.posts.filter(item => {
        //     return item.data().day == this.props.day
        // });

        const filtered = this.props.posts.filter(item => {
            return item.data().day == this.props.day
        });

        const filteredList = filtered.map(item => {
            let friendlyUrl = item.data().title.toLowerCase().replace(/ /g, '-')
            return (
                <Link to={`/view-post/${friendlyUrl}`}>{item.data().title} < br /></Link >
            )
        }

        )

        return (
            <div>
                {this.props.day}
                {filteredList}
            </div >
        )
    }
}

export default ClientCalendarSingle;