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
import { withAuthorization } from '../Session';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';



class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
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
      adminEmail: '',
      backgroundUrl: ''
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
      const opened = snapshot.docs;

      const setArr = [...this.state.users]

      opened.map(item => {
        setArr.push(item.data())
      })
      this.setState({
        users: setArr,
        isLoading: !this.state.isLoading
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

  deleteUser = (id, index) => {
    this.props.firebase.deleteClient(id);

    this.setState({
      users: this.state.users.filter((_, i) => i !== index)
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
    this.setState({
      file: event.target.files[0]
    });


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
        const userObj = {}
        userObj.logo = encodedUrl;
        userObj.name = this.state.username;
        userObj.urlName = this.state.username.toLowerCase().replace(/ /g, '-')
        this.setState({
          users: [...this.state.users, userObj],
          isHidden: !this.state.isHidden,
          backgroundUrl: encodedUrl
        })
      })


  };


  render() {

    const backgroundUrlStyle = {
      backgroundImage: `url(${this.state.backgroundUrl})`,
      backgroundSize: "cover"
    }

    console.log(this.state.users, 'users')

    // const renderPosts = 

    const isInvalid =
      this.state.passwordOne === '' ||
      this.state.email === '' ||
      this.state.username === '';


    console.log(this.props, 'props in home');

    return (

      <div>
        {
          this.state.isLoading && this.state.users.length > 0 ?
            <div>
              <div id="client-list" className="row">
                {
                  this.state.users.map((user, index) => {
                    return (
                      <div data-id={user.userId} className="client-wrapper flex-column d-flex col-sm-4" key={index}>
                        <button className="delete-button" onClick={() => this.deleteUser(user.urlName, index)}>
                          <Fab disabled aria-label="Delete">
                            <DeleteIcon />
                          </Fab>
                        </button>
                        <Link to={`/dates/${user.urlName}`}>
                          {user.name}
                        </Link>
                        <Link to={`/dates/${user.urlName}`}>
                          <img src={user.logo} className="user-background" />
                        </Link>
                      </div >
                    )
                  })
                }
              </div>
              <Fab color="secondary" aria-label="Add" onClick={this.toggleAddNew.bind(this)}>
                <AddIcon />
              </Fab>
            </div>
            :
            (this.state.isLoading && this.state.users.length == 0 ?
              <div>
                <div className="container empty-state">
                  <h2 className="text-center">Welcome Home</h2>
                  <div className="container row">
                    <div className="dashed col-md-3">

                    </div>

                    <div className="dashed col-md-3">
                    </div>

                    <div className="dashed col-md-3">
                    </div>

                    <div className="dashed col-md-3">
                    </div>
                  </div>

                </div>
                <Fab color="secondary" aria-label="Add" onClick={this.toggleAddNew.bind(this)}>
                  <AddIcon />
                </Fab>
              </div>
              : < CircularProgress />)
        }


        {this.state.isHidden ?
          <div id="add-new-form-wrapper">
            <button onClick={this.toggleAddNew.bind(this)} id="x-add-new">X</button>
            <form onSubmit={this.onSubmit} id="add-new-form">
              <div id="avatar-upload" className="d-flex align-items-end justify-content-center" style={backgroundUrlStyle}>
                <input type="file" onChange={this.addFile} />
              </div>
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

const authCondition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);