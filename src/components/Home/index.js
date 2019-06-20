import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { FirebaseContext } from '../Firebase';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Firebase from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { throwStatement, thisExpression, tsExpressionWithTypeArguments } from '@babel/types';
import { connect } from 'react-redux';
import { notStrictEqual } from 'assert';
import FileUploader from "react-firebase-file-uploader";
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import 'firebase/storage';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isHidden: false,
      name: '',
      image: '',
      users: [],
      file: null,
      username: '',
      email: '',
      passwordOne: '',
      error: null,
      firestorageRef: this.props.firebase.storage,
      adminEmail: ''
    }

    this.baseState = this.state
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
    this.addFile = this.addFile.bind(this);
  }


  getPosts() {

  }


  // Component lifecycle methods

  componentWillMount() {
    this.props.firebase.getClients().then(snapshot => {
      this.setState({
        users: snapshot.docs
      })
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

  deleteUser = (id) => {
    this.props.firebase.deleteClient(id);

    this.props.firebase.getClients().then(snapshot => {
      this.setState({
        users: snapshot.docs
      })
    });
  }

  addClient = (e) => {
    e.preventDefault();

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

  retrieveUsers = () => {
    this.props.firebase.getClients().then(snapshot => {
      this.setState({
        users: snapshot.docs
      })
    });
  }

  handleLogoUpload = (event) => {
    const file = Array.from(event.target.files);

    this.setState({
      file: file[0]
    });
  }

  addFile = event => {

    console.log(event.target.files[0], 'target');
    this.setState({
      file: event.target.files[0]
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.state.firestorageRef.ref().child(`${this.state.username}/logo/`)
      .put(this.state.file).then(snapshot => {
        const encodedUrl = `https://firebasestorage.googleapis.com/v0/b/skylar-social-17190.appspot.com/o/${encodeURIComponent(snapshot.metadata.fullPath)}?alt=media`;
        this.props.firebase.addUser(this.state.email, this.state.passwordOne, this.state.username, encodedUrl);
        this.setState({
          isHidden: !this.state.isHidden
        })
      });

    this.props.firebase.getClients().then(snapshot => {
      this.setState({
        users: snapshot.docs
      })
    });
  };


  render() {

    const styleDelete = {
      background: "transparent",
      border: "none"
    }

    const renderPosts = this.state.users.map(user => (
      <div data-id={user.data().id} className="client-wrapper col-sm-4">
        <img src={user.data().logo} />
        <button onClick={() => this.deleteUser(user.id)} style={styleDelete}>
          <Fab disabled aria-label="Delete">
            <DeleteIcon />
          </Fab></button>
        <Link to={`/dates/${user.id}?clientId=${user.id}`}>
          {user.data().name}
        </Link>
      </div >
    ))

    const isInvalid =
      this.state.passwordOne === '' ||
      this.state.email === '' ||
      this.state.username === '';



    return (
      <div>
        <div id="client-list" className="row">
          {renderPosts}
        </div>
        <Fab color="secondary" aria-label="Add" onClick={this.toggleAddNew.bind(this)}>
          <AddIcon />
        </Fab>
        {this.state.isHidden ?
          <div id="add-new-form-wrapper">
            <button onClick={this.toggleAddNew.bind(this)} id="x-add-new">X</button>
            <form onSubmit={this.onSubmit} id="add-new-form">
              <TextField
                margin="normal"
                variant="outlined"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                type="text"
                label="Name"
              />
              <TextField
                margin="normal"
                variant="outlined"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                label="Email"
              />
              <TextField
                margin="normal"
                variant="outlined"
                name="passwordOne"
                value={this.state.passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                label="Password"
              />
              <CloudUploadIcon />
              <input type="file" onChange={this.addFile} />
              <button disabled={isInvalid} type="submit">
                Create User
            </button>

              {this.state.error && <p>{this.state.error.message}</p>}
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