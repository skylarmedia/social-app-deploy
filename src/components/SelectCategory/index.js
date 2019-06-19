import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import './index.css';


class SelectCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            setCategories: [],
            name: '',
            categoryName: '',
            category: {},
            color: '#EF463B '
        }

        this.removeCategory = this.removeCategory.bind(this);
        this.passCategories = this.passCategories.bind(this)
    }

    submitCategories = (e) => {
        e.preventDefault();
        let categoryObj = {}

        categoryObj.color = this.state.color;
        categoryObj.name = this.state.name;
        this.setState({
            setCategories: [...this.state.setCategories, categoryObj]
        })
    }

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    selectCategory = e => {
        this.setState({
            name: e.target.value
        })
    }

    removeCategory = (event) => {
        let index = event.target.getAttribute('data-index');
        let setCategories = [...this.state.setCategories];
        setCategories.splice(index, 1);
        this.setState({ setCategories });
    }

    passCategories = (e) => {
        e.preventDefault();
        this.props.getCategories(this.state.setCategories)
    }



    render() {
        let categoryList = this.state.setCategories.map((item, i) => {
            let categoryStyle = {
                background: item.color
            }
            return (
                <li key={i}>
                    <button onClick={this.removeCategory} data-index={i}>Remove</button>
                    <div className="hex-color" style={categoryStyle}></div>
                    <div>{item.name}</div>
                </li>
            )

        })
        return (
            <React.Fragment>
                <ul id="selected-categories">
                    {categoryList}
                </ul>
                <form onSubmit={this.passCategories}>
                    <SketchPicker color={this.state.color} onChangeComplete={this.handleChangeComplete.bind(this)} />
                    <input type="text" onChange={this.selectCategory.bind(this)} />
                    <button onClick={this.submitCategories}>Add Categories</button>
                    <button onClick={this.passCategories}>Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default compose(
    withFirebase(SelectCategory)
)