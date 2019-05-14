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

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      addClient = e => {
        e.preventDefault();
        this.setState({
          name: '',
          image: ''
        });
      };

    render(){
        return(
        <div>
            <form onSubmit={this.addClient}>
                <input type="text" name="name" placeholder="Name" onChange={this.updateInput} value={this.state.name}/>
                <input type="text" name="image" placeholder="Image" onChange={this.updateInput} value={this.state.image}/>
                <button type="submit">Submit</button>
            </form>
        </div>
        )
    }

}


export default compose(
    withFirebase(AddNew)
)