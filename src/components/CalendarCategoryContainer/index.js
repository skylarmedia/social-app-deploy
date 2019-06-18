import React, { Component } from 'react';
import Calendar from '../Calendar'


class CalendarCategoryContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* <Calendar /> */}
            </React.Fragment>
        )
    }
}

export default CalendarCategoryContainer;

