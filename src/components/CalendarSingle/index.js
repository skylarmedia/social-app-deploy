import React, { Component } from 'react';
import withFirebase from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';


class CalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.props !== nextProps.posts) {
    //         nextProps.posts.map(item => {
    //             console.log(item.data(), 'item in single calendar');
    //         })
    //     }
    // }

    render() {
        const postsArr = this.props.posts.map(item => {
           if(item.data().day === this.props.day){
               return (
                   <div>{item.data().title}</div>
               )
           }
        })

        return (
            <div>
                {this.props.day}
                {postsArr}
                {console.log(this.props, 'current month and day')}
                <Link to="/test">TEST</Link>
            </div>
        )
    }
}

export default CalendarSingle;