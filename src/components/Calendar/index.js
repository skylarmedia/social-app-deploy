import React from "react";
import moment from "moment";
import { Link } from 'react-router-dom';
import "./calendar.css";
import CalendarSingle from '../CalendarSingle';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import SelectCategory from '../SelectCategory'
import CategoryList from '../CategoryList';

const parts = window.location.search.substr(1).split("&");

const $_GET = {};
for (var i = 0; i < parts.length; i++) {
  var temp = parts[i].split("=");
  $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

const year = $_GET['year'];
const month = $_GET['month'];

class Calendar extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      showCalendarTable: true,
      showMonthTable: false,
      dateObject: moment(`${this.props.match.params.year}-${this.props.match.params.month}`),
      allmonths: moment.months(),
      showYearNav: false,
      selectedDay: null,
      clientId: '',
      currentMonth: 0,
      currentYear: 0,
      posts: [],
      showCat: false,
      categories: []
    };

    this.onDoubleClick = this.handleDoubleClickItem.bind(this)
    this.showCategories = this.showCategories.bind(this);

  }

  weekdayshort = moment.weekdaysShort();

  componentWillMount() {

    if (this.props.match.params.clientId) {
      this.props.firebase.getSocialPosts(this.props.match.params.clientId).then(snapshot => {
        this.setState({
          posts: snapshot.docs
        });
      })

      this.props.firebase.getUserCategories(this.props.match.params.clientId).then(snapshot => {
        this.setState({
          categories: snapshot.docs
        })
      })
    }
  }



  handleDoubleClickItem(event) {
    alert('I got double-clicked!');
  }

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    });
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    });
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearEditor = () => {
    this.setState({
      showYearNav: true,
      showCalendarTable: !this.state.showCalendarTable
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showMonthTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });

    this.props.history.push(`/calendar/2019/${parseInt(this.props.match.params.month) - 1}/${this.props.match.params.clientId}`);
  };
  onNext = () => {
    let curr = "";
    if (this.state.showMonthTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    // <Route path="/calendar/:year/:month/:clientId" component={Calendar} />
    this.props.history.push(`/calendar/2019/${parseInt(this.props.match.params.month) + 1}/${this.props.match.params.clientId}`);
    this.props.firebase.getSocialPosts(this.props.match.params.clientId, this.props.match.params.month).then(snapshot => {
      this.setState({
        posts: snapshot.docs
      });
    })
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearNav: !this.state.showYearNav,
      showMonthTable: !this.state.showMonthTable
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Yeah</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };


  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
      }
    );
  };

  getClientId = () => {
    var url_string = window.location.href  //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("clientId");

    return c
  }

  showCategories = e => {
    e.preventDefault();

    this.setState({
      showCat: !this.state.showCat
    })
  }

  sendCategories = arr => {
    this.props.firebase.sendCategories(this.props.match.params.userId, arr).then(() => {
      alert('sent')
    })
  }


  render() {


    let catList = this.state.categories.map(item => {
      return item.data().categories.map(innerItem => (
        <div>{innerItem.name}TEST</div>
      ))
    })

    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={`calendar-day TEST ${currentDay}`}>
          <CalendarSingle day={d} posts={this.state.posts} month={this.props.match.params.month} clientId={this.props.match.params.clientId} history={this.props.history} />
          <Link to={`/add-post/2019/${this.props.match.params.month}/${d}/${this.props.match.params.clientId}`}>+</Link>
        </td>

      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <div>
        <button onClick={this.showCategories}>Add Categories</button>
        {
          this.state.showCat && (
            <SelectCategory className="selected-categoryComponent" userId={this.props.match.params.clientId} getCategories={this.sendCategories} />
          )
        }
        <CategoryList colors={this.state.categories} />
        <div className="tail-datetime-calendar">

          <div className="calendar-navi">
            <span
              onClick={e => {
                this.onPrev();
              }}
              class="calendar-button button-prev"
            />
            {!this.state.showMonthTable && !this.state.showYearEditor && (
              <span
                onClick={e => {
                  this.showMonth();
                }}
                class="calendar-label"
              >
                {this.month()},
            </span>
            )}
            <span
              className="calendar-label"
              onClick={e => {
                this.showYearEditor();
              }}
            >
              {this.year()}
            </span>

            <span
              onClick={e => {
                this.onNext();
              }}
              className="calendar-button button-next"
            />
          </div>
          <div className="calendar-date">
            {this.state.showYearNav && <this.YearTable props={this.year()} />}
            {this.state.showMonthTable && (
              <this.MonthList data={moment.months()} />
            )}
          </div>

          {this.state.showCalendarTable && (
            <div className="calendar-date">
              <table className="calendar-day">
                <thead>
                  <tr>{weekdayshortname}</tr>
                </thead>
                <tbody>{daysinmonth}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  withFirebase(Calendar)
)