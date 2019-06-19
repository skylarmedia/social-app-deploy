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
        });
    }

    handleText = (string) => {
        if (string !== undefined) {
            return string.split('|||')[0]
        }
    }


    render() {
        const options = this.state.categories.map(item => {
            return item.data().categories.map(innerItem => {
                if (this.handleText(this.props.category) == innerItem.name) {
                    return (
                        <option value={`${innerItem.name}|||${innerItem.color}`} selected>{innerItem.name}</option>
                    )
                } else {
                    return (
                        <option value={`${innerItem.name}|||${innerItem.color}`}>{innerItem.name}</option>
                    )
                }

            })
        })

        return (
            <React.Fragment>
                <form>
                    <select name="options" onChange={this.props.getSelectedCategory}>
                        {options}
                    </select>
                </form>

            </React.Fragment >
        )
    }
}

export default compose(
    withFirebase(EditCategoryForm)
);