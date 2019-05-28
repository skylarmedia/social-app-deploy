import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import HiddenCalendarSingle from '../HiddenCalendarSingle';

class CalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            showCalendarModule: false
        }

        this.toggleShowCalendarModule = this.toggleShowCalendarModule.bind(this);
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.props !== nextProps.posts) {
    //         nextProps.posts.map(item => {
    //             console.log(item.data(), 'item in single calendar');
    //         })
    //     }
    // }



    componentDidMount() {
        console.log(this.props.posts)
    }


    toggleShowCalendarModule = () => {

        alert('ran');
        // this.setState({
        //     showCalendarModule: !this.state.showCalendarModule
        // })
    }


    toggleShowCalendarModule = () => {
        alert('clicked');
        this.setState({
            showCalendarModule: !this.state.showCalendarModule
        })
    }






    render() {



        // const hiddenPost = this.props.posts




        return (
            <div className="calendar-popup-wrapper">
                {this.props.day}<br />



                {this.props.posts.map((item, index) => {
                    if (item.data().day === this.props.day) {
                        return (
                            <button onClick={this.toggleShowCalendarModule}>{item.data().title}<strong>{index}</strong></button>
                        )
                    }
                })}




                <HiddenCalendarSingle posts={this.props.posts} day={this.props.day} toggle={this.toggleShowCalendarModule} showCalendarModule={this.state.showCalendarModule} />

            </div>
        )
    }
}

export default compose(
    withFirebase(CalendarSingle)
);