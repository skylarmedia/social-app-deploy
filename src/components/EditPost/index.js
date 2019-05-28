import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";

class EditPost extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>Edit Posts</div>
        )
    }
}

export default EditPost