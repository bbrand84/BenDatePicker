/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable keyword-spacing */
/* eslint-disable linebreak-style */
import React from 'react';
import './BenDatepicker.css';
import YearPicker from './YearPicker.js';
import MonthPicker from './MonthPicker.js';


export default class BenDatepicker extends MonthPicker {

  /**
  * React's constructor method
  */
  constructor(props) {
    super(props);
    this.state = {
      showSelector: false,
      locale: props.locale ? props.locale : 'en-US',
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      last_clicked_day_html: null,
      month_relative: 0
    };
    // this.getDayMatrix(2);
    this.getDayMatrix = this.getDayMatrix.bind(this);
    this.getDayHTML = this.getDayHTML.bind(this);
    this.OnDayClick = this.OnDayClick.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.pad = this.pad.bind(this);
  }

  /**
  * when typing in text field
  */
  onChangeRaw() {
      // TODO
  }

  /**
  * Click on Text field, opens datepicker widget
  */
  onClick() {
    this.setState(
        {
          showSelector: !this.state.showSelector
        });
  }

  /**
  * returns class name for date picker field, with purpose of hiding it
  */
  getDatePickerSelectTextClassName() {
    return `ben-datepicker-select-date ${this.state.showSelector ? 'ben-datepicker-show' : 'ben-datepicker-hide'}`;
  }

  /**
  * Returns 2 dim array containing days
  * param start_weekday: weekday of the first of the month (0..6, 0=monday)
  */
  getDayMatrix(date) {
    const days = [];
    const month = date.getMonth(); // 0..11
    const year = date.getYear() + 1900;
    let start_weekday = new Date(year, month, 1).getDay(); // 0..6, sun(0) - sat(6)
    const days_in_month = new Date(0, month + 1, 0).getDate();
    const days_in_previous_month = new Date(0, (month == 0 ? 12 : month), 0).getDate();
    let days_written = 1;
    let week_num = 1;
    let days_for_next_month = 0;
    while (days_written < days_in_month) {
        days[week_num - 1] = [];
        for (let i = 0; i < 7; i++) {
            let my_day = days_written;
            my_day = days_written;
            let my_month;
            // let recent_day_obj = {dayNum: my_day}
            if (days_written <= days_in_month) {
              let is_recent_month;
              if (start_weekday > 0) { // last Month
                start_weekday--;
                my_day = days_in_previous_month - (start_weekday);
                is_recent_month = 'last';
                my_month = (month == 0 ? 11 : month - 1);
              }else {       // this month
                my_month = month;
                days_written++;
                is_recent_month = 'recent';
              }
              // console.log(my_day + " " + start_weekday + " " +my_day)
              // console.log({month: my_month+1, year: year, dayNum: my_day, isRecentMonth: is_recent_month, weekNum: week_num});
              days[week_num - 1][i] = { month: my_month + 1, year, dayNum: my_day, isRecentMonth: is_recent_month, weekNum: week_num };
            }else { // next month
              days_for_next_month++;
              days[week_num - 1][i] = { month: (month == 0 ? 11 : month - 1) + 1, year, dayNum: days_for_next_month, isRecentMonth: 'next', weekNum: week_num }; // recent_day_obj
            }
          }
        week_num++;
      }
        // days = [['Mo','Di','Mi','Do','Fr','Sa','So']].concat(days);
    return days;
  }


  /**
  * Click on single day in in datepicker matrix
  */
  OnDayClick(day, event) {
    const last_month_css_class = 'lastMonth';
    const next_month_css_class = 'nextMonth';
    const this_month_css_class = 'recentMonth';
    const selected_day_css_class = 'recent-day';
    this.state.last_clicked_day_html && this.state.last_clicked_day_html.classList.remove(selected_day_css_class);
    event.target.classList.add(selected_day_css_class);
    this.setState({ day, last_clicked_day_html: event.target });
    event.target.classList.contains(last_month_css_class) && this.setState({ month_relative: -1 });
    event.target.classList.contains(next_month_css_class) && this.setState({ month_relative: 1 });
    event.target.classList.contains(this_month_css_class) && this.setState({ month_relative: 0 });
  }

  /**
  * Returns HTML table containing days
  * new Date().toLocaleString('en-us', {  weekday: 'long' })
  */
  getDayHTML() {
    return (
      <table className="ben-datepicker-calendar-table">
        <thead><tr>
          { this.getDayMatrix(new Date(this.state.year, this.state.month - 1, this.state.day))[0].map(x =>
            <td
              key={`dayname-${x.weekNum}-${x.dayNum}`}
              className={`dayname-${x.dayNum}-${x.month}-${x.year}`}
            >{new Date(x.year, x.month - 1, x.dayNum).toLocaleString(this.state.locale, { weekday: 'short' }).substring(0, 2)}</td>)
      }
        </tr></thead>
        <tbody>
          { this.getDayMatrix(new Date(this.state.year, this.state.month - 1, this.state.day)).map(x => <tr key={`week-${x[0].weekNum}`}>{x.map(y =>
            <td
              key={`day-${y.weekNum}-${y.dayNum}`}
              onClick={(event) => this.OnDayClick(y.dayNum, event)}
              className={`${y.isRecentMonth}Month`}
            >{y.dayNum}</td>)}</tr>)}
        </tbody>
      </table>
    );
  }

  // add leading zeros
  pad(num, size) {
    let s = `${num}`;
    while (s.length < size) {
      s = `0${s}`;
    }
    return s;
  }

  /**
  * On changing year selection drop down
  */
  onYearChange(year) {
    this.setState(
      { year }
    );
  }

  /**
  * On changing month selection drop down
  */
  onMonthChange(month) {
    this.setState(
      {
        month: Number(month),
        month_relative: 0
      }
    );
  }

  /**
  * React's rendering method
  */
  render() {
    return (
      <div className="ben-datepicker-container">
        <input
          type="text"
          onChange={this.onChangeRaw.bind(this)}
          onClick={this.onClick.bind(this)}
          value={`${this.pad(this.state.day, 2)}.${this.pad((this.state.month + this.state.month_relative), 2)}.${this.state.year}`}
        />
        <div className={this.getDatePickerSelectTextClassName.bind(this)()}>
          <MonthPicker selected={this.state.month} onChangeMonth={this.onMonthChange} locale={this.state.locale} /><YearPicker onChangeYear={this.onYearChange} />
          {this.getDayHTML.bind(this)()}
        </div>
      </div>
    );
  }
}
