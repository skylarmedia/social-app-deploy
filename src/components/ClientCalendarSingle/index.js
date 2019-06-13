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
        return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
     }

    render() {

        let linkMonth = this.getMonthFromString(this.props.month);
        // console.log(this.props.month, 'props in calendar single')
        console.log(linkMonth, 'link month')

        const filtered = this.props.posts.filter(item => {
            return item.data().day == this.props.day
        });

        const filteredList = filtered.map(item => {
            let friendlyUrl = item.data().title.toLowerCase().replace(/ /g, '-');
            return (
                <Link to={`/view-post/${linkMonth}/${this.props.day}/${friendlyUrl}`}>{item.data().title} < br /></Link >
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