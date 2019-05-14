import React, {Component } from 'react';
import { withFirebase } from '../Firebase';
import  { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import Firebase from '../Firebase';

// const Home = () => (
//   <FirebaseContext.Consumer>
//   {firebase => {
//     console.log(firebase)
//     return <div>TEST</div>;
//   }}
// </FirebaseContext.Consumer>
// );


class Home extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){


  }

  render(){
    return(
    <div>Test</div>
    )
  }


}



export default compose(
  withFirebase,
)(Home);