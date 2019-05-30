import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;



    render() {
        const friendlyUrlTitle = this.props.title.replace(/\s+/g, '-') + '-' + this.props.month + '-' + this.props.day
        const hiddenPost = () => (
            <div>
                <p>{this.truncate(this.props.copy)}</p>
                <p>{this.props.time}</p>
                <Link to={{
                    pathname: '/edit-post/',
                    state: {
                        clientId: friendlyUrlTitle
                    }
                }}>Edit Post</Link>
            </div>
        )
        return (
            <div>
                <button onClick={this.toggleIsHidden}>{this.props.title}</button>
                {this.state.isHiddenCalendar &&
                    hiddenPost()
                }

            </div>
        )
    }
}



export default HiddenCalendarSingle;