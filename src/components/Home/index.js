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
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import 'firebase/storage';



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

  componentDidMount() {
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
        console.log(snapshot, 'snapshot console');
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


  // // Admin functions

  // setAdminEmail = (e) => {
  //   e.preventDefault();

  //   this.setState({
  //     adminEmail: e.target.value
  //   })
  // }

  // submitAdmin = (e) => {
  //   e.preventDefault();
  //   const addAdminRole = this.props.firebase.functions.httpCallable('addAdminRole');
  //   addAdminRole({ email: this.state.adminmail }).then(res => {
  //     console.log(res)
  //   })
  // }




  render() {



    const renderPosts = this.state.users.map(user => (
      <div data-id={user.data().id} className="client-wrapper col-sm-4">
        <img src={user.data().logo} />
        <button onClick={() => this.deleteUser(user.id)}>X</button>
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
        <button onClick={this.toggleAddNew.bind(this)}>Add New</button>
        {this.state.isHidden ?
          <div id="add-new-form-wrapper">
            <button onClick={this.toggleAddNew.bind(this)} id="x-add-new">X</button>
            <form onSubmit={this.onSubmit} id="add-new-form">
              <input
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
              <input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="passwordOne"
                value={this.state.passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <input type="file" onChange={this.addFile} />
              <button disabled={isInvalid} type="submit">
                Sign Up
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