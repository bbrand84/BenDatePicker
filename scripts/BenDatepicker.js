import React, { Component } from 'react';
import './BenDatepicker.css'
import './BenDatepicker.css'
import YearPicker from './YearPicker.js'
import MonthPicker from './MonthPicker.js'

export default class BenDatepicker extends MonthPicker {

	/**
	* React's constructor method
	*/
	constructor(props){
        super(props);
		this.state = {
			showSelector: false,
			locale: props.locale ? props.locale : "en-US",
			day: new Date().getDate(),
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear()
		}
		//this.getDayMatrix(2);
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
  onChangeRaw(){
  		//TODO
  }

  /**
	* Click on Text field, opens datepicker widget
	*/
  onClick(){
  		this.setState(
  			{
			showSelector : !this.state.showSelector
		});

  }

	/**
	* returns class name for date picker field, with purpose of hiding it
	*/
  getDatePickerSelectTextClassName(){
  	return "ben-datepicker-select-date " + (this.state.showSelector? 'ben-datepicker-show' : 'ben-datepicker-hide')
  }

	/**
	* Returns 2 dim array containing days
	* param start_weekday: weekday of the first of the month (0..6, 0=monday)
	*/
  getDayMatrix(start_weekday=1){
  	let my_start_weekday = start_weekday
  	let days = [];
  	const days_in_month = 28;
  	const days_in_previous_month = 30;
	  let days_written = 1;
	  let week_num = 1;
	  let days_for_next_month = 0;
	    while(days_written < days_in_month){
	    	days[week_num-1] = [];
	      	for (let i=0; i < 7; i++) {
	      		let my_day = days_written;
	      		my_day = days_written;
		      	//let recent_day_obj = {dayNum: my_day}
		      	if (days_written <= days_in_month){
		      		let is_recent_month
		      		if(my_start_weekday > 0){ //last Month
						my_start_weekday--;
						my_day = days_in_previous_month - (my_start_weekday)
						is_recent_month
						is_recent_month = "last";
			     	}else{			 //this month
			     		days_written++;
			     		is_recent_month = "recent";
			    	}
			    	//console.log(my_day + " " + my_start_weekday + " " +my_day)
			    	days[week_num-1][i] = {dayNum: my_day, isRecentMonth: is_recent_month, weekNum: week_num};
		      	}else{ //next month
		      		days_for_next_month++;
		      		days[week_num-1][i] = {dayNum: days_for_next_month, isRecentMonth: "next", weekNum: week_num}; //recent_day_obj
		      	}

	      	}
	      	week_num++;
	      }

	      return days

  }

  /**
	* Click on single day in in datepicker matrix
	*/
  OnDayClick(day){
  	this.setState({day: day});
  }

  /**
	* Returns HTML table containing days
	*/
  getDayHTML(){
  	return (
  		<table className="ben-datepicker-calendar-table">
  		<tbody>
  			{ this.getDayMatrix(2).map(x => <tr key={"week-"+x[0].weekNum}>{x.map(y =>
  				<td key={"day-"+y.weekNum+"-"+y.dayNum}
  				onClick={() => this.OnDayClick(y.dayNum)}
  				className={y.isRecentMonth + "Month"}
  				>{y.dayNum}</td>)}</tr>)}
  		</tbody>
  		</table>
  	)
  }

  //add leading zeros
  pad(num, size){
    var s = num+"";
    while (s.length < size) {
    	s = "0" + s;
    }
    return s;
  }

	/**
	* On changing year selection drop down
	*/
  onYearChange(year){
  	this.setState(
  		{year: year}
  	);
  }

	/**
	* On changing month selection drop down
	*/
	onMonthChange(month){
		this.setState(
			{month: month}
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
	      	value={this.pad(this.state.day,2)+"."+this.pad(this.state.month,2)+"."+this.state.year}
	      />
	      <div className={this.getDatePickerSelectTextClassName.bind(this)()}>
	      <MonthPicker selected={this.state.month} onChangeMonth={this.onMonthChange} /><YearPicker onChangeYear={this.onYearChange} />
	      {this.getDayHTML.bind(this)()}
	      </div>
	    </div>
    );
  }
}
