import React, {Component } from 'react';
import { withFirebase } from '../Firebase';
import  { FirebaseContext } from '../Firebase';
import { Link } from 'react-router-dom';
import AddNew from '../AddNew';
import { compose } from 'recompose';
import Firebase from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { throwStatement, thisExpression } from '@babel/types';



class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount(){

    this.props.firebase.clients().doc('name');

    console.log(this.props.firebase.clients().doc('name'))
  }


  render(){
    return(
    <div>
      <Link to={ROUTES.ADD_NEW}>Add New</Link>
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
  withFirebase,
)(Home);