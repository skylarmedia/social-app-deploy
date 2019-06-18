import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import './index.css';
// import CategoryList from '../CategoryList';

class SelectCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            name: '',
            categoryName: '',
            category: {},
            color: '#EF463B '
        }

        this.removeCategory = this.removeCategory.bind(this);
        this.sendCategories = this.sendCategories.bind(this);
    }

    submitCategories = (e) => {
        e.preventDefault();
        let categoryObj = {}

        categoryObj.color = this.state.color;
        categoryObj.name = this.state.name;

        console.log(categoryObj, 'category Obj');
        this.setState({
            categories: [...this.state.categories, categoryObj]
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
        let categories = [...this.state.categories];
        categories.splice(index, 1);
        this.setState({ categories });
    }

    sendCategories = e => {
        e.preventDefault();

        // this.props
    }

    render() {
        let categoryList = this.state.categories.map((item, i) => {
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
                <form onSubmit={this.submitCategories}>
                    <SketchPicker color={this.state.color} onChangeComplete={this.handleChangeComplete.bind(this)} />
                    <input type="text" onChange={this.selectCategory.bind(this)} />
                    <button onClick={this.submitCategories}>Add Categories</button>
                    <button onClick={this.sendCategories}>Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default compose(
    withFirebase(SelectCategory)
)