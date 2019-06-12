import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

class ClientCalendarSingle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            currentPosts: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.posts !== prevState.posts) {
            return {
                selected: nextProps.posts
            }
        } else {
            console.log('did not receive posts')
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.posts !== prevState.posts) {
            this.setState({
                posts: this.props.posts
            })
        }
        const filtered = this.state.posts.filter(item => {
            return item.data().day == this.props.day
        })
    }



    render() {



        return (
            <div>
                {this.props.day}
                {this.state.currentPosts}
            </div>
        )
    }
}

export default ClientCalendarSingle;