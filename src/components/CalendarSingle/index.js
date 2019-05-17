import React, { Component } from 'react';
import withFirebase from '../Firebase';
import { compose } from 'recompose';


class CalendarSingle extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props, 'props')
    }

    



    render(){
        return(
            <div>
                {this.props.day}
            </div>
        )
    }
}

export default CalendarSingle;