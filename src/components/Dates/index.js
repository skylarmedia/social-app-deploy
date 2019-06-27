import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import Calendar from '../Calendar'
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';




class Dates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            showAddDate: false,
            date: [],
            month: 1,
            year: 2019,
            chosenMonth: '',
            chosenYear: '',
            showCalendar: false,
            clientId: '',
            isLoading: false,
            passDates: (month, year) => {
                this.setState({
                    chosenMonth: month,
                    chosenYear: year,
                    showCalendar: true
                })
            },

        }
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.props.firebase.getUID(this.props.match.params.id).then(snapshot => {
            snapshot.docs.map(item => {
                this.setState({
                    clientId: item.data().userId,
                    isLoading: !this.state.isLoading
                })
            })
        })

        this.props.firebase.getDates(this.props.match.params.id).then(snapshot => {
            const list = snapshot.docs;
            list.map(item => {
                const obj = {};
                const dateArr = this.state.date;
                obj["month"] = item.data().month;
                obj["year"] = item.data().year;
                obj["id"] = item.id

                dateArr.push(obj);
                this.setState({
                    date: dateArr
                });
            })
        })

        // Get UID


    }

    componentDidMount() {

    }


    toggleAddDate() {
        this.setState({
            showAddDate: !this.state.showAddDate
        });
    }


    submitForm = e => {
        e.preventDefault();
        let tempDateObj = {};
        tempDateObj.month = this.state.month
        tempDateObj.year = this.state.year

        if (this.state.date.filter(e => e.month === tempDateObj.month).length > 0) {
            alert('Sorry that month is already in use, please select again')
        } else {
            this.props.firebase.addDate(this.props.match.params.id, this.state.month, this.state.year);
            this.setState({
                showAddDate: !this.state.showAddDate,
                date: [...this.state.date, tempDateObj]
            });
        }
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

    passDates() {
        console.log('clicked');
        console.log(this.props)
    }

    deleteDate = (id, index) => {
        this.props.firebase.deleteDate(this.props.match.params.id, id);

        this.setState({
            date: this.state.date.filter((_, i) => i !== index)
        });
    }



    render() {


        const renderDates = this.state.date.map((item, index) => (
            <div className="single-calendar-wrapper d-flex align-items-center justify-content-center" index={index} key={item.id}>
                <button onClick={() => this.deleteDate(item.id, index)}>DELETE</button>
                <Link to={`/calendar/${item.year}/${item.month}/${this.props.match.params.id}`}>
                    {this.convert(item.month)} {item.year}
                    <br />
                </Link>
            </div>
        ));

        const selectStyles = {
            backgroundColor: "#fff"
        }

        const formControlStyles = {
            margin: "20px",
            minWidth: 120,
        }

        const inputStyles = {
            color: "#fff"
        }
        return (
            this.state.isLoading && this.state.date.length > 0 ?
                <div>
                    <Link to='/Home'>Back</Link><br />
                    {this.props.match.params.id}<br />
                    Dates
            {renderDates}
                    {this.state.showAddDate ?
                        <form className="add-date-form" onSubmit={this.submitForm.bind(this)}>
                            <button onClick={this.toggleAddDate.bind(this)} className="toggle-close">Close</button>
                            <FormControl style={formControlStyles}>
                                <InputLabel htmlFor="month-helper">Month</InputLabel>

                                <Select onChange={this.handleMonth.bind(this)} className="select-date" value={this.state.month} style={selectStyles} id="month-helper">
                                    <MenuItem value="1">January</MenuItem>
                                    <MenuItem value="2">February</MenuItem>
                                    <MenuItem value="3">March</MenuItem>
                                    <MenuItem value="4">April</MenuItem>
                                    <MenuItem value="5">May</MenuItem>
                                    <MenuItem value="6">June</MenuItem>
                                    <MenuItem value="7">July</MenuItem>
                                    <MenuItem value="8">August</MenuItem>
                                    <MenuItem value="9">September</MenuItem>
                                    <MenuItem value="10">October</MenuItem>
                                    <MenuItem value="11">November</MenuItem>
                                    <MenuItem value="12">December</MenuItem>
                                </Select>
                            </FormControl>
                            <Select onChange={this.handleYear.bind(this)} style={selectStyles} class="select-date">
                                <MenuItem value="2019">2019</MenuItem>
                                <MenuItem value="2020">2020</MenuItem>
                            </Select>
                            <input type="submit" value="Submit" className="add-date-btn" />
                        </form>
                        :
                        ''
                    }
                    {this.state.showCalender ?
                        <Calendar impData={this.state} />
                        : ''
                    }
                    <button onClick={this.toggleAddDate.bind(this)} className="add-date-btn">Add New</button>
                </div>
                : (this.state.isLoading && this.state.date.length == 0 ?
                    <div className="container">
                        {this.state.showAddDate ?
                            <form className="add-date-form" onSubmit={this.submitForm.bind(this)}>
                                <button onClick={this.toggleAddDate.bind(this)} className="toggle-close">Close</button>

                                <Select onChange={this.handleMonth.bind(this)} value={this.state.month} style={selectStyles}>
                                    <MenuItem value="1">January</MenuItem>
                                    <MenuItem value="2">February</MenuItem>
                                    <MenuItem value="3">March</MenuItem>
                                    <MenuItem value="4">April</MenuItem>
                                    <MenuItem value="5">May</MenuItem>
                                    <MenuItem value="6">June</MenuItem>
                                    <MenuItem value="7">July</MenuItem>
                                    <MenuItem value="8">August</MenuItem>
                                    <MenuItem value="9">September</MenuItem>
                                    <MenuItem value="10">October</MenuItem>
                                    <MenuItem value="11">November</MenuItem>
                                    <MenuItem value="12">December</MenuItem>
                                </Select>
                                <Select onChange={this.handleYear.bind(this)}>
                                    Placeholder
                                    <MenuItem value="2019">2019</MenuItem>
                                    <MenuItem value="2020">2020</MenuItem>
                                </Select>
                                <input type="submit" value="Submit" />
                            </form>
                            :
                            ''
                        }
                        <h2 className="text-center" id="client-heading">Client A-Game’s Calendars</h2>
                        <img src={require('../assets/repeat-grid.svg')} id="no-date-calendar" />
                        <p className="text-center client-text">You don’t seem to have any calendars set up yet. Click below to add one and get started!</p>
                        <div className="text-center arrow-wrapper">
                            <button onClick={this.toggleAddDate.bind(this)} className="add-date-btn">Add New</button>
                            <img src={require('../assets/arrow.svg')} />
                        </div>
                    </div>
                    :
                    <CircularProgress />)


        )
    }
}

export default compose(
    withFirebase(Dates)
)