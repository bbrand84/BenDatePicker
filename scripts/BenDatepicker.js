import React, { Component } from 'react';
import './BenDatepicker.css'
import './BenDatepicker.css'
import * as moment from 'moment';
import YearPicker from './YearPicker.js'
import MonthPicker from './MonthPicker.js'

export default class BenDatepicker extends MonthPicker {

	constructor(props){
        super(props);
		this.state = {
			showSelector: false,
			locale: props.locale ? props.locale : "en-US",
			day: 1,
			month: 2,
			year: new Date().getFullYear()
		}
		moment.locale(this.state.locale);
		//this.getDayMatrix(2);
		this.getDayMatrix = this.getDayMatrix.bind(this);
		this.getDayHTML = this.getDayHTML.bind(this);
		this.OnDayClick = this.OnDayClick.bind(this);
		this.onYearChange = this.onYearChange.bind(this);
		this.pad = this.pad.bind(this);
	}

  onChangeRaw(){
  		let mydate = moment()
  }

  onClick(){
  		this.setState(
  			{
			showSelector : !this.state.showSelector
		});

  }

  getDatePickerSelectTextClassName(){
  	return "ben-datepicker-select-date " + (this.state.showSelector? 'ben-datepicker-show' : 'ben-datepicker-hide')
  }

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

  OnDayClick(day){
  	this.setState({day: day});
  }

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

  onYearChange(event){
  	this.setState(
  		{year: event.target.value}
  	);
  }

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
	      <MonthPicker /><YearPicker OnChange={e => this.onYearChange(e)} />
	      {this.getDayHTML.bind(this)()}
	      </div>
	    </div>
    );
  }
}