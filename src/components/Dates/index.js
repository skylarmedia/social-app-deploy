import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';


class Dates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            showAddDate: false,
            date: []
        }

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
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
        this.props.firebase.getClients().then(snapshot => {
            const list = snapshot.docs
            list.map(item => {
                if (item.data().date !== undefined) {
                    this.setState({
                        date: item.data().date
                    })
                }
            })
        })
    }

    submitForm = e => {
        e.preventDefault();
        // console.log(e.target.value, 'event');
        // this.props.firebase.getClients().doc(id).set({
        //    date:{

        //    }
        // })
    }

    convert(num) {
        // console.log(num)
        num = num - 1;
        const monthArr = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const month = monthArr[num];
        return month;
    }

    handleMonth = (e) => {
        console.log(e.target, 'event');
    }


    render() {

        // const currentYear = new Date().getFullYear();
        // const nextYear = currentYear + 1;
        // let years = [];
        // years.push(currentYear, nextYear);


        //*****  ADD RENDER YEAR METHOD TO MAKE DYNAMIC  *****//

        // var renderYear = () => {
        //     years.map(item => (
        //         <option>{item}</option>
        //     ))
        // }

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
        ))


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
                        <select onChange={this.handleMonth.bind(this)}>
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

                        <select>
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