import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import HiddenCalendarSingle from '../HiddenCalendarSingle';
import './index.css'

class CalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            showCalendarModule: false
        }

        // this.toggleShowCalendarModule = this.toggleShowCalendarModule.bind
    }


    componentDidMount() {

    }


    toggleShowCalendarModule = () => {

        alert('ran');
        // this.setState({
        //     showCalendarModule: !this.state.showCalendarModule
        // })
    }


    toggleShowCalendarModule = () => {
        this.setState({
            showCalendarModule: !this.state.showCalendarModule
        })
    }

    truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;




    render() {

        // const hiddenPost = this.props.posts




        return (
            <div className="calendar-popup-wrapper">
                {this.props.day}<br />
                {this.props.posts.map((item, index) => {
                    if (item.data().month == this.props.month) {
                        if (item.data().day === this.props.day) {
                            return (
                                <div class="hidden-calendar-wrapper">
                                    {
                                        item.data().approved ?
                                            <p>Approved</p>
                                            :
                                            <p>Not approved</p>
                                    }
                                    <HiddenCalendarSingle title={item.data().title} copy={item.data().copy} time={item.data().time} hashtags={item.data().hashtags} links={item.data().links} day={item.data().day} month={item.data().month} itemId={item.id} push={this.props.history} clientId={this.props.clientId} selectedCategory={item.data().selectedCategory} />
                                </div>
                            )
                        }
                    }

                })}

            </div>
        )
    }
}

export default compose(
    withFirebase(CalendarSingle)
);