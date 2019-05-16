import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import * as admin from 'firebase-admin';
import { relativeTimeThreshold } from 'moment';


class Dates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            showAddDate: false,
            date: [],
            currentList: [],
            month:1,
            year: 2019,
            dateObj: {}
        }

        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        // const { id } = this.props.match.params;
        // console.log(this.props, 'props')
        this.firstRender();
    }


    toggleAddDate() {
        this.setState({
            showAddDate: !this.state.showAddDate
        })
    }

    firstRender() {
        this.props.firebase.getDates(this.props.match.params.id).then(snapshot => {
            const list = snapshot.docs;
            console.log(snapshot.docs, 'list')

            // list.map(item => {
            //     if (item.data().date !== undefined) {
            //         this.setState({
            //             date: item.data().date
            //         })
            //     }
            // })
        })
        console.log(this.state, 'date state');
    }

    submitForm = e => {
        e.preventDefault();
        console.log(e, 'form event');
        console.log(this.state, 'form event of state');

        this.state.dateObj['month'] = this.state.month;
        this.state.dateObj['year'] = this.state.year;

        console.log(this.state.date)
        this.props.firebase.updateDate(this.props.match.params.id).set({
            date:{
                month:2,
                year: 2020
            }
        })

        this.setState({
            showAddDate: !this.state.showAddDate
        })
    }

    convert(num) {
        num = num - 1;
        const monthArr = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const month = monthArr[num];
        return month;
    }

    handleMonth = (e) => {
        console.log(e.target.value, 'month event');
        this.setState({
            month: e.target.value
        })
        console.log(this.state, 'state after month render');
    }

    handleYear = (e) => {
        console.log(e.target.value, 'year event');
        this.setState({
            year: e.target.value
        })
    }

    render() {

        const renderDates = this.state.date.map(item => (
            <li>
                <Link to={{
                    pathname:ROUTES.CALENDAR,
                    state:{
                        date:this.date
                    }
                }}>
                    {this.convert(item.month)} {item.year}
                </Link>
            </li>
        ));


        return (
            <div>
                <Link to='/Home'>Back</Link><br />
                {this.props.match.params.id}<br />
                Dates
                {renderDates}
                {/* <Link to={`/add-new/${this.props.match.params.id}`}>Add New</Link> */}
                {this.state.showAddDate ?
                    <form className="add-date-form" onSubmit={this.submitForm.bind(this)}>
                        <button onClick={this.toggleAddDate.bind(this)} className="toggle-close">Close</button>
                        <select onChange={this.handleMonth.bind(this)} value={this.state.value}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>

                        <select onChange={this.handleYear.bind(this)} value={this.state.value}>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                        </select>

                        <input type="submit" value="Submit" />
                    </form>
                    :
                    ''
                }
                <button onClick={this.toggleAddDate.bind(this)}>Add New</button>
            </div>
        )
    }
}

export default compose(
    withFirebase(Dates)
)