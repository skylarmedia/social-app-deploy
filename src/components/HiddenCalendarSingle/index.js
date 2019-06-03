import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'firebase';
import { compose } from 'recompose';

class HiddenCalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHiddenCalendar: false,
            clientId: '',
            image: ''
        }

        this.toggleIsHidden = this.toggleIsHidden.bind(this);
        this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
    }

    componentWillMount() {
        var url_string = window.location.href  //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("clientId");

        this.setState({
            clientId: c
        })

        // Fetch image path

        // ``
        // const imagePath = this.props.storagePath.ref();

        // imagePath.child(`${this.state.clientId}/${this.props.month}/${this.props.day}`).getDownloadURL.then(url => {
        //     console.log(url);
        // })



    }

    toggleIsHidden = () => {
        this.setState({
            isHiddenCalendar: !this.state.isHiddenCalendar
        })
    }

    truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;

    _handleDoubleClickItem = (e) => {
        e.preventDefault();

        alert('double clicked');
    }




    render() {
        const friendlyUrlTitle = this.props.title.replace(/\s+/g, '-') + '-' + this.props.month + '-' + this.props.day
        const hiddenPost = () => (
            <div>
                <p>{this.truncate(this.props.copy)}</p>
                \
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
                <button onClick={this.toggleIsHidden} onDoubleClick={this._handleDoubleClickItem}>{this.props.title}</button>
                {this.state.isHiddenCalendar &&
                    hiddenPost()
                }
            </div>
        )
    }


}

export default withFirebase(HiddenCalendarSingle)