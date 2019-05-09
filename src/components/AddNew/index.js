import React, { Component } from 'react';
import Firebase from '../Firebase';
import withFirebase from '../Firebase';

class AddNew extends Component{
    constructor(props){
        super(props);

        this.state = {
            clientName: '',
            image: ''
        }

       this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        console.log(event);
    }

    render(){
        return(
            <form onSubmit={this.formPost}>
                <input type="text" name="client" onChange={this.onChange}/>
                <input type="submit" value="submit" />
            </form>
        )
    }

}

export default AddNew;