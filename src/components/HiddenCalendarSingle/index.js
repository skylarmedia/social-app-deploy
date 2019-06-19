import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

let timer = 0;
let delay = 100;
let prevent = false;

class HiddenCalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHiddenCalendar: false,
            clientId: '',
            image: ''
        }

        this.toggleIsHidden = this.toggleIsHidden.bind(this);
        this.handleDoubleClickItem = this.handleDoubleClickItem.bind(this);
    }

    componentWillMount() {
        var url_string = window.location.href  //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("clientId");

        this.setState({
            clientId: c
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps, 'prev props');
    }

    toggleIsHidden = () => {
        let me = this;
        timer = setTimeout(function () {
            if (!prevent) {
                me.doClickAction();
            }
            prevent = false;
        }, delay);
    }

    doClickAction() {
        this.setState({
            isHiddenCalendar: !this.state.isHiddenCalendar
        })
    }

    doDoubleClickAction() {
        let friendlyUrl = this.props.title.replace(/ /g, '-').toLowerCase();
        this.props.push.push(`/admin-view-post/${this.props.month}/${this.props.day}/${friendlyUrl}/${this.props.clientId}`);
    }

    handleDoubleClick() {
        clearTimeout(timer);
        prevent = true;
        this.doDoubleClickAction();
    }

    truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;

    handleDoubleClickItem = (e) => {
        e.preventDefault();
    }

    handleColor = (string) => {
        if (string !== undefined) {
            return string.split('|||')[1]
        }
    }




    render() {
        const friendlyUrlTitle = this.props.title.replace(/\s+/g, '-') + '-' + this.props.month + '-' + this.props.day
        const hiddenPost = () => (
            <div>
                <p>{this.props.title}</p>
                <p>{this.truncate(this.props.copy)}</p>
                <p>{this.props.time}</p>
                {this.props.hashtags &&
                    <p>{this.props.hashtags}</p>
                }
                {this.props.itemId}

                <Link to={`/edit-post/${this.props.month}/${this.props.day}/${this.props.itemId}/${this.props.clientId}`}>Edit Post</Link>


                {/* <Link to={{
                    pathname: '/edit-post/',
                    state: {
                        postId: this.props.itemId,
                        clientId: this.state.clientId,
                        day: this.props.day,
                        month: this.props.month
                    }
                }}>Edit Post</Link> */}

            </div >
        )

        const buttonStyle = {
            background: this.handleColor(this.props.selectedCategory)
        }
        return (
            <React.Fragment>
                <button onClick={this.toggleIsHidden} onDoubleClick={this.handleDoubleClick.bind(this)} style={buttonStyle}>{this.props.title}</button>
                {this.state.isHiddenCalendar &&
                    hiddenPost()
                }
            </React.Fragment>
        )
    }


}

export default compose(
    withFirebase(HiddenCalendarSingle)
)