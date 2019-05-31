import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HiddenCalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHiddenCalendar: false,
            clientId: ''
        }

        this.toggleIsHidden = this.toggleIsHidden.bind(this);
    }

    componentWillMount() {
        var url_string = window.location.href  //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("clientId");

        this.setState({
            clientId: c
        })
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
                        postId: this.props.itemId,
                        clientId: this.state.clientId,
                        day: this.props.day,
                        month: this.props.month
                    }
                }}>Edit Post</Link>
            </div >
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