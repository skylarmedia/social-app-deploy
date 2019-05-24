import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import Calendar from '../Calendar'



class Dates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            showAddDate: false,
            date: [],
            month:1,
            year:2019,
            chosenMonth: '',
            chosenYear:'',
            showCalendar: false,
            clientId: '',
            passDates: (month, year) => {
                this.setState({
                    chosenMonth:month,
                    chosenYear:year,
                    showCalendar: true
                })
             }
            
        }

        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.firstRender();
    }

    componentDidMount(){
        var url_string = window.location.href  //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("clientId");
        
        this.setState({
            clientId: c
        })
        console.log(c, 'c');
    }


    toggleAddDate() {
        this.setState({
            showAddDate: !this.state.showAddDate
        });
    }

    firstRender() {

        this.props.firebase.getDates(this.props.match.params.id).then(snapshot => {
            console.log(snapshot.docs)
            const list = snapshot.docs;
            list.map(item => {
                console.log(item.data(), 'item');
                const obj = {};
                const dateArr = this.state.date;
                obj["month"] = item.data().month;
                obj["year"] = item.data().year;

                dateArr.push(obj);

                this.setState({
                    date:dateArr
                });
                console.log(this.state, 'state after render');
                console.log(dateArr, 'date array');
            })
        })

        // this.props.firebase.getClients().then(snapshot => {
        //     const list = snapshot.docs
        //     list.map(item => {
        //         if (item.data().date !== undefined) {
        //             this.setState({
        //                 date: item.data().date
        //             })
        //         }
        //     })
        // })
    }

    submitForm = e => {
        e.preventDefault();
        // const currentDates = this.state.date;
        // const monthSubmission = this.state.month;
        // const yearSubmission = this.state.year;
        // const emptyObj = {}

        // emptyObj["month"] = monthSubmission;
        // emptyObj["year"] = yearSubmission;

        // currentDates.push(emptyObj);
        // // console.log(currentDates);
        this.props.firebase.addDate(this.props.match.params.id, this.state.month, this.state.year);
        this.setState({
            showAddDate:!this.state.showAddDate
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
    }

    handleYear = (e) => {
        console.log(e, 'year event');
        this.setState({
            year: e.target.value
        })
    }

    redirectDate = () => {
        console.log('hello')
    }

    passDates(){
        console.log('clicked');
        console.log(this.props)
    }
    


    render() {

        const renderDates = this.state.date.map(item => (
            <Link to={`/calendar?month=${item.month}&year=${item.year}&clientId=${this.state.clientId}`}>
                {this.convert(item.month)} {item.year}
                <br/>
            </Link>
        ));
        console.log(this.state, 'state in render');
        return (
            <div>
                <Link to='/Home'>Back</Link><br />
                {this.props.match.params.id}<br />
                Dates
                {renderDates}
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
                        <select onChange={this.handleYear.bind(this)}>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                        </select>

                        <input type="submit" value="Submit" />
                    </form>
                    :
                    ''
                }
                {this.state.showCalender ? 
                <Calendar impData={this.state}/>
                : ''
                }
                }
                <button onClick={this.toggleAddDate.bind(this)}>Add New</button>
            </div>
        )
    }
}

export default compose(
    withFirebase(Dates)
)