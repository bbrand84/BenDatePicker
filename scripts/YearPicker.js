import React, { Component } from 'react';
import './BenDatepicker.css';
import * as moment from 'moment';

export default class YearPicker extends Component {

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

	render(){

		return(
			<select onChange={(x) => this.OnChange(x)} value={this.state.recentYear}>
				{this.createYearList(3,15).map(x => <option key={x} value={x} >{x}</option>)}
			</select>
			);
	}

}