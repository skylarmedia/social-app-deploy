import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { FirebaseContext } from '../Firebase';
import { Link } from 'react-router-dom';
import AddNew from '../AddNew';
import { compose } from 'recompose';
import Firebase from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { throwStatement, thisExpression, tsExpressionWithTypeArguments } from '@babel/types';
import { connect } from 'react-redux';
import { notStrictEqual } from 'assert';
import FileUploader from "react-firebase-file-uploader";



class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isHidden: false,
      name: '',
      image: '',
      data: [],
      file: null,
    }

    this.baseState = this.state

    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
  }

  getPosts() {

  }

  // Component lifecycle methods

  componentDidMount() {
    this.props.firebase.getClients().then(snapshot => {
      this.props.getAllClients(snapshot.docs)
    });
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

  deletePost = (id) => {
    this.props.firebase.deleteClient(id);

    this.props.firebase.getClients().then(snapshot => {
      this.props.getAllClients(snapshot.docs)
    });
  }

  addClient = (e) => {
    e.preventDefault();

    console.log(this.state.file, ' file add client')

    // //Add Client

    this.props.firebase.addClient().add({
      name: this.state.name,
      image: this.state.image
    });

    //Add Logo

    const firestorageRef = this.props.firebase.storage;
    console.log(firestorageRef, 'firestorage ref');


    this.setState({
      name: '',
      image: '',
      data: this.state.data,
      isHidden: !this.state.isHidden
    });

    this.props.firebase.getClients().then(snapshot => {
      this.props.getAllClients(snapshot.docs)
    });
  };

  handleLogoUpload = (event) => {
    const file = Array.from(event.target.files);

    this.setState({
      file: file[0]
    });
  }






  render() {


    return (
      <div>
        <div id="client-list" className="row">


          {this.props.data.data.length !== 0 && (
            this.props.data.data.map(item => (
              <div data-id={item.id} className="client-wrapper col-sm-4">
                <button onClick={() => this.deletePost(item.id)}>X</button>
                <Link to={`/dates/${item.id}?clientId=${item.id}`}>
                  <h2>{item.data().name}</h2>
                </Link>
                <Link to={`/dates/${item.id}?clientId=${item.id}`}>
                  <img src={item.data().image} />
                </Link>
              </div>
            ))
          )}


        </div>
        <button onClick={this.toggleAddNew.bind(this)}>Add New</button>
        {this.state.isHidden ?
          <div id="add-new-form-wrapper">
            <button onClick={this.toggleAddNew.bind(this)} id="x-add-new">X</button>
            <form onSubmit={this.addClient.bind(this)} id="add-new-form">
              <input type="text" name="name" placeholder="Name" onChange={this.updateInput} value={this.state.name} />
              <input type="file" onChange={this.addFile} />

              <button type="submit">Submit</button>
            </form>
          </div> :
          ''}
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => ({
  getAllClients: clients => dispatch({
    type: 'GET_ALL_CLIENTS', clients
  })
})

const mapStateToProps = state => (
  console.log(state, 'state in map state to props'), {
    data: state.setClientsReducer
  })


export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);