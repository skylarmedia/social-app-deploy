import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { FirebaseContext } from '../Firebase';
import { Link } from 'react-router-dom';
import AddNew from '../AddNew';
import { compose } from 'recompose';
import Firebase from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { throwStatement, thisExpression, tsExpressionWithTypeArguments } from '@babel/types';



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isHidden: false,
      name: '',
      image: '',
      data: []
    }
    
    this.baseState = this.state 

    this.toggleAddNew = this.toggleAddNew.bind(this);
  }

  getPosts() {
    this.props.firebase.getClients().then(snapshot => {
    this.setState({
      data:snapshot.docs
    })
      // snapshot.docs.forEach(doc => {
      //   const clientList = document.getElementById('client-list');

      //   let li = document.createElement('li');
      //   li.setAttribute('data-id', doc.id);

      //   let h2 = document.createElement('h2');
      //   let image = document.createElement('img');
      //   let button = document.createElement('div');

      //   button.textContent = 'x';
      //   h2.textContent = doc.data().name;
      //   image.setAttribute('src', doc.data().image);

      //   li.appendChild(h2);
      //   li.appendChild(image);
      //   li.appendChild(button);


      //   // Delete Method

      //   button.addEventListener('click', event => {
      //     event.stopPropagation();
          
      //     let id = event.target.parentElement.getAttribute('data-id');
      //     this.props.firebase.deleteClient(id);
      //     this.forceUpdate();
      //   })

      //   clientList.appendChild(li)
      // })
    });
  }

  // Component lifecycle methods

  componentWillMount(){
    this.getPosts()
  }

  toggleAddNew() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  deletePost = (id) => {
    this.props.firebase.deleteClient(id);
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
    this.resetForm();
  };


  render() {

    const renderPosts = this.state.data.map((item) => (
        <Link to={`/dates/${item.id}`}>
          <li data-id={item.id}>
            <button onClick={() => this.deletePost(item.id)}>X</button>
            <h2>{item.data().name}</h2>
            <img src={item.data().image}/>
          </li>
        </Link>
    ));

    return (
      <div>
        <ul id="client-list">{renderPosts}</ul>
        <button onClick={this.toggleAddNew.bind(this)}>Add New</button>
        {this.state.isHidden ? <div id="add-new-form-wrapper">
          <button onClick={this.toggleAddNew.bind(this)} id="x-add-new">X</button>
          <form onSubmit={this.addClient} id="add-new-form">
            <input type="text" name="name" placeholder="Name" onChange={this.updateInput} value={this.state.name} />
            <input type="text" name="image" placeholder="Image" onChange={this.updateInput} value={this.state.image} />
            <button type="submit">Submit</button>
          </form>
        </div> :
          ''}
      </div>
    )
  }


}

export default compose(
  withFirebase,
)(Home);