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
      loading: false,
      isHidden: true,
      name: '',
      image: ''
    }

    this.toggleAddNew = this.toggleAddNew.bind(this);
  }

  componentWillMount(){
    this.props.firebase.getClients().then(snapshot => {
      snapshot.docs.forEach(doc => {

        const clientList = document.getElementById('client-list');


        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        let image = document.createElement('img');
        image.setAttribute('src', doc.data().image);

        h2.textContent = doc.data().name;

        li.appendChild(h2);
        li.appendChild(image);

        clientList.appendChild(li)
      })
    })

  }

  toggleAddNew(){
    this.setState({
      isHidden: !this.state.isHidden
    })
  }


  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addClient = e => {
    e.preventDefault();

    this.props.firebase.addClient().add({
      name: this.state.name,
      image: this.state.image
    })
    this.setState({
      name: '',
      image: ''
    });
  };


  render(){
    return(
    <div>
      <ul id="client-list"></ul>
      <button onClick={this.toggleAddNew.bind(this)}>Add New</button>
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