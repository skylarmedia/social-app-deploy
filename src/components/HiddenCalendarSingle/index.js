import React, { Component } from 'react';

class HiddenCalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHiddenCalendar: false
        }

        this.toggleIsHidden = this.toggleIsHidden.bind(this);


    }

    toggleIsHidden = () => {
        this.setState({
            isHiddenCalendar: !this.state.isHiddenCalendar
        })
    }



    render() {
        const truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;
        return (
            <div>
                <button onClick={this.toggleIsHidden}>Click to Toggle</button>
                {this.state.isHiddenCalendar &&
                    this.props.posts.map((item, index) => {
                        console.log(item.data(), 'item in data');
                        if (item.data().day === this.props.day) {
                            return (
                                <div className="calendar-popup" data-index={index}>
                                    <div>{truncate(item.data().copy)}</div>
                                    <div>Time:{item.data().time}</div>
                                    <div>Hashtags:{item.data().hashtags}</div>
                                    <div>Links:{item.data().links}</div>
                                </div>
                            )
                        }
                    })}
                {this.props.day}
            </div>
        )
    }
}



export default HiddenCalendarSingle;