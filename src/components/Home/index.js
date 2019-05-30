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

  }

  // Component lifecycle methods

  componentDidMount() {
    this.props.firebase.getClients().then(snapshot => {
      this.setState({
        data: snapshot.docs
      })
    });
  }

  // componentDidUpdate() {
  //   this.getPosts();
  // }

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

  deletePost = (id) => {
    this.props.firebase.deleteClient(id);
    this.getPosts();
  }

  addClient = e => {
    e.preventDefault();

    this.props.firebase.addClient().add({
      name: this.state.name,
      image: this.state.image
    })
    this.setState({
      name: '',
      image: '',
      data: this.state.data,
      isHidden: !this.state.isHidden
    });
    // this.getPosts()
  };


  render() {

    // const renderPosts = this.state.data.map((item) => (


    // ));

    return (
      <div>
        <div id="client-list" className="row">{this.state.data.map(item => (
          <div data-id={item.id} className="client-wrapper col-sm-4">
            <button onClick={() => this.deletePost(item.id)}>X</button>
            <Link to={`/dates/${item.id}?clientId=${item.id}`}>
              <h2>{item.data().name}</h2>
            </Link>
            <Link to={`/dates/${item.id}?clientId=${item.id}`}>
              <img src={item.data().image} />
            </Link>
          </div>
        ))}</div>
        <button onClick={this.toggleAddNew.bind(this)}>Add New</button>
        {this.state.isHidden ?
          <div id="add-new-form-wrapper">
            <button onClick={this.toggleAddNew.bind(this)} id="x-add-new">X</button>
            <form onSubmit={this.addClient.bind(this)} id="add-new-form">
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