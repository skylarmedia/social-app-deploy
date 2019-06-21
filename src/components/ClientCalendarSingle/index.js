import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';


// Make this a dumb component 

class ClientCalendarSingle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            currentPosts: []
        }
    }

    getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }

    render() {

        let linkMonth = this.getMonthFromString(this.props.month);

        const filtered = this.props.posts.filter(item => {
            return item.data().day == this.props.day
        });
        console.log(this.props.posts, 'flitered')

        const filteredList = filtered.map(item => {
            const color = item.data().selectedCategory.split('|||')[1]

            let friendlyUrl = item.data().title.toLowerCase().replace(/ /g, '-');
            let itemId = item.id;
            const clientButtonStyle = {
                background: color
            }
            return (
                <div>
                    <Link style={clientButtonStyle} to={`/view-post/${linkMonth}/${this.props.day}/${friendlyUrl}`}>{item.data().title} < br /></Link >
                    {
                        item.data().approved ? "checked" : 'Not checked'
                    }
                </div>
            )
        }

        )

        return (
            <div>
                {this.props.day}
                {filteredList}
            </div >
        )
    }
}

export default ClientCalendarSingle;