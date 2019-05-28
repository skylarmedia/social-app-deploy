import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class CalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            showCalendarModule: false
        }
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.props !== nextProps.posts) {
    //         nextProps.posts.map(item => {
    //             console.log(item.data(), 'item in single calendar');
    //         })
    //     }
    // }

    toggleShowCalendarModule = () => {
        this.setState({
            showCalendarModule: !this.state.showCalendarModule
        })
    }

    componentDidMount(){
        console.log(this.props.posts)
    }

    

    render() {

        const truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;

        const postsArr = this.props.posts.map((item, index) => {
           if(item.data().day === this.props.day){
               return (
                   <div>{item.data().title}<strong>{index}</strong></div>
               )
           }
        });

        const hiddenPost = this.props.posts.map((item, index) => {
            console.log(item.data(), 'item in data');
            if(item.data().day === this.props.day){
                return (
                    <div className="calendar-popup">
                        <div>{item.data().title}<strong>{index}</strong></div>
                        <div>{truncate(item.data().copy)}</div>
                        <div>Time:{item.data().time}</div>
                        <div>Hashtags:{item.data().hashtags}</div>
                        <div>Links:{item.data().links}</div>
                  
                        <Link to={ROUTES.EDIT_POST}>Edit Post</Link>
                     
                    </div>
                )
            }
        })
        

        

        return (
            <div className="calendar-popup-wrapper">
                {this.props.day}<br />
                {postsArr}
                <button onClick={this.toggleShowCalendarModule}>
                    
                </button>
                {this.state.showCalendarModule && 
                hiddenPost
                }
            </div>
        )
    }
}

export default compose(
    withFirebase(CalendarSingle)
);