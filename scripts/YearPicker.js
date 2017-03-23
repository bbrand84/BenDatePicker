import React, { Component } from 'react';
import './BenDatepicker.css';

export default class YearPicker extends Component {

	/**
	* React's constructor method
	*/
	constructor(props){
		super(props);
		this.state = {
		}

		if(props.OnChange){ //} && getClass.call(props.OnChange) == '[object Function]'){
			this.OnChange = props.OnChange;
		}else{
			this.OnChange = (x) => console.log("No date change function assigned!" + x);
		}

		if(props.selectedValue){ //} && getClass.call(props.OnChange) == '[object Function]'){
			this.state.recentYear = props.selectedValue;
		}else{
			this.state.recentYear = new Date().getFullYear();
		}
	}

	/**
	* Creates a list of year 'surrounding' the recent year.
	* Returns array of *numBefore* years before recent year + recent year + *numAfter* recent year.
	* param: numBefore: number of years to display before recent year
  * param: numAfter: number of years to display after recent year
	*/
	createYearList(numBefore, numAfter){
		let result = [];
		let last_index = 0;
		for(let before = this.state.recentYear - numBefore; before < this.state.recentYear; before++){
			result[last_index] = before;
			last_index++;
		}
		for(let after = this.state.recentYear; after <= this.state.recentYear + numAfter; after++){
			result[last_index] = after;
			last_index++;
		}
		return result;

	}

	/**
	* React's rendering method
	*/
	render(){
		return(
			<select onChange={(x) => this.OnChange(x)} value={this.state.recentYear}>
				{this.createYearList(3,15).map(x => <option key={x} value={x} >{x}</option>)}
			</select>
			);
	}

}
