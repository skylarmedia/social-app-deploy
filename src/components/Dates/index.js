import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dates extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Link to='/Home'>Back</Link>
                Dates
            </div>
        )
    }
}

export default Dates;