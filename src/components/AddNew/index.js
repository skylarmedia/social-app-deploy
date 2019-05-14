import React, { Component } from 'react';
import { compose }  from 'recompose';
import withFirebase from '../Firebase';

import * as ROUTES from '../../constants/routes';
import { format } from 'util';

class AddNew extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            image: ''
        }

    }

    componentDidMount(){
        console.log(this.props)
    }

    

    render(){
        return(
        <div>
           
        </div>
        )
    }

}


export default AddNew;