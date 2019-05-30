import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    componentDidMount() {
        console.log(this.props.match.params, 'props in the componentDidMount');
    }

    render() {
        return (
            <div>Edit Posts</div>
        )
    }
}

export default compose(
    withFirebase(EditPost)
)