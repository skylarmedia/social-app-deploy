import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class EditCategoryForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentWillMount() {
        this.props.firebase.getUserCategories(this.props.clientId).then(item => {
            this.setState({
                categories: item.docs
            })
        })

    }

    render() {

        const options = this.state.categories.map(item => {

            return item.data().categories.map(innerItem => {
                return (

                    <option value={innerItem.name} selected>{innerItem.name}</option>

                )
            })
        })

        console.log(this.state.categories, 'categories')
        return (
            <React.Fragment>
                <form>
                    <select name="options" multiple>
                        {options}
                    </select>
                </form>

            </React.Fragment>
        )
    }
}

export default compose(
    withFirebase(EditCategoryForm)
);