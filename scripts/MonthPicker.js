import React, { Component } from 'react';
import './BenDatepicker.css'

export default class MonthPicker extends Component {

	/**
	* React's constructor method
	*/
	constructor(props){
		super(props);
		this.state = {
			month_selected: props.selected ? props.selected : 12,
			handleChangeCallback: props.onChangeMonth ? props.onChangeMonth : (e) => console.log("no OnChange callback method passed from parent")
		}
		console.log(this.state.handleChange)
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({month_selected: event.target.value});
		this.state.handleChangeCallback(event.target.value);
	}

	/**
	* React's rendering method
	*/
	render(){
		return(
			<select value={this.state.month_selected} onChange={(event) => this.handleChange(event)}>
				  <option value="1">january</option>
					<option value="2">february</option>
				  <option value="3">march</option>
				  <option value="4">april</option>
				  <option value="5">may</option>
				  <option value="6">june</option>
				  <option value="7">july</option>
				  <option value="8">august</option>
				  <option value="9">september</option>
				  <option value="10">october</option>
				  <option value="11">november</option>
				  <option value="12">december</option>

			</select>
			);
	}

}
